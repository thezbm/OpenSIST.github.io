import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Form, NavLink, useLoaderData, useNavigate, useNavigation} from "react-router-dom";
import "./SideBar.css";
import SearchBar from "./SearchBar/SearchBar";
import {ResponsiveButton, useHidden} from "../common";

export default function SideBar({twoLevelList}) {
    const SideBarHidden = useHidden();
    const [SideBarOpen, setSideBarOpen] = useState(false);
    return (
        <div style={{display: "flex"}}>
            <div className={'SideBar ' + (SideBarHidden ? 'hidden ' : '') + (SideBarOpen ? 'open' : '')}>
                <SearchBar/>
                <div className='AddRefreshButtonGroup'>
                    <Form action='/programs/new'>
                        <button className='Button'>
                            <FontAwesomeIcon icon={solid('plus')}/>
                        </button>
                    </Form>
                    <Form method='post'>
                        <ResponsiveButton/>
                    </Form>
                </div>
                <ul className='FirstLevelList'>
                    {
                        Object.entries(twoLevelList).map(([firstLevel, secondLevelList]) => (
                            <React.Fragment key={firstLevel}>
                                <FirstLevelItem
                                    firstLevel={firstLevel}
                                    secondLevelList={secondLevelList}
                                />
                            </React.Fragment>
                        ))
                    }
                </ul>
            </div>
            <button
                className={'Button ' + (SideBarHidden ? 'hidden ' : '') + (SideBarOpen ? 'open ' : '')}
                hidden={!SideBarHidden}
                onClick={() => setSideBarOpen(!SideBarOpen)}
            >
                <FontAwesomeIcon icon={solid('bars')}/>
            </button>
        </div>
    )
}

function FirstLevelItem({firstLevel, secondLevelList}) {
    const [isFolded, setIsFolded] = React.useState(false);
    return (
        <>
            <li
                className='FirstLevelItem'
                onClick={() => setIsFolded(!isFolded)}
            >
                {firstLevel}
                <FontAwesomeIcon
                    icon={solid('caret-right')}
                    rotation={isFolded ? 90 : 0}
                />
            </li>
            {isFolded ? secondLevelList.map((secondLevel) => (
                <React.Fragment key={secondLevel.ProgramID}>
                    <SecondLevelItem secondLevel={secondLevel}/>
                </React.Fragment>
            )) : null}
        </>
    )
}

function SecondLevelItem({secondLevel}) {
    return (
        <>
            <li className='SecondLevelItem'>
                <NavLink
                    to={`/programs/${secondLevel.ProgramID}`}
                    className={(({isActive, isPending}) =>
                        isActive ? "active" : isPending ? "pending" : "")}
                >
                    {secondLevel.Program}
                </NavLink>
            </li>
        </>
    )
}