import React, {useState} from 'react';
import "./AddModifyProgram.css";
import {
    DescriptionTemplate,
    ProgramTargetApplicantMajorChoices,
    ProgramRegionChoices
} from "../../../Data/Schemas";
import MarkDownEditor from "./MarkDownEditor/MarkDownEditor";
import {useLoaderData, useNavigate, redirect, Form} from "react-router-dom";
import {setProgramContent} from "../../../Data/ProgramData";

export async function action({request, params}) {
    const formData = await request.formData();
    const ProgramID = params.programId;
    const University = formData.get('University');
    const Program = formData.get('Program');
    const targetApplicantMajor = formData.getAll('TargetApplicantMajor');
    const Region = formData.getAll('Region');
    const Degree = formData.get('Degree');
    const Description = formData.get('Description');
    // console.log(Description);
    const requestBody = {
        'newProgram': false,
        'content': {
            'ProgramID': ProgramID,
            'University': University,
            'Program': Program,
            'Region': Region,
            'Degree': Degree,
            'TargetApplicantMajor': targetApplicantMajor,
            'Description': Description,
        }
    };
    await setProgramContent(requestBody)
    return redirect(`/programs/${ProgramID}`)
}

function getListChoices(choices) {
    return Array.from(choices).map(
        (choice) => {
            if (choice.checked) {
                return choice.value;
            }
        }
    ).filter((choice) => choice !== undefined);
}

function AddModifyProgram() {
    const navigate = useNavigate();
    const {programContent} = useLoaderData();
    const OriginDesc = programContent === null ? DescriptionTemplate : programContent.description;
    const [Description, setDescription] = useState(OriginDesc);
    const mode = programContent === null ? 'Add' : 'Modify';

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const University = event.target.University.value;
    //     const Program = event.target.Program.value;
    //     const targetApplicantMajor = getListChoices(event.target.TargetApplicantMajor);
    //     const Region = getListChoices(event.target.Region);
    //     const Description = event.target.Description.value;
    //
    //     const requestBody = {
    //         'newProgram': false,
    //         'content': {
    //             'ProgramID': `${Program}@${University}`,
    //             'University': University,
    //             'Program': Program,
    //             'Region': Region,
    //             'Degree': event.target.Degree.value,
    //             'TargetApplicantMajor': targetApplicantMajor,
    //             'Description': Description,
    //         }
    //     };
    //
    //     await setProgramContent(requestBody)
    // }

    return (
        <div className='ProgramContent'>
            <Form method="post" className='ProgramForm'>
                <h1 id="Title">{`${mode} Program`}</h1>

                <h4 className='Subtitle'>University Name</h4>
                <input type="text" id="University" name="University"
                       defaultValue={programContent === null ? '' : programContent.University}
                       placeholder="University Name" required
                       className={programContent !== null ? 'disabled' : ''}
                       // disabled={programContent !== null}
                />

                <h4 className='Subtitle'>Program Name</h4>
                <input type="text" id="Program" name="Program"
                       defaultValue={programContent === null ? '' : programContent.Program}
                       placeholder="Program Name" required
                          className={programContent !== null ? 'disabled' : ''}
                       // disabled={programContent !== null}
                />

                <h4 className='Subtitle'>Program Degree</h4>
                <SingleChoice
                    choices={['Master', 'PhD']}
                    defaultValue={programContent === null ? 'Master' : programContent.Degree}
                    name='Degree'
                />

                <h4 className='Subtitle'>Target Applicant Major (Multi-choices)</h4>
                <MultiChoice
                    choices={ProgramTargetApplicantMajorChoices}
                    defaultValue={programContent === null ? [] : programContent.TargetApplicantMajor}
                    name="TargetApplicantMajor"
                />

                <h4 className='Subtitle'>Program Region (Multi-choices)</h4>
                <MultiChoice
                    choices={ProgramRegionChoices}
                    defaultValue={programContent === null ? [] : programContent.Region}
                    name="Region"
                />

                <h4 className='Subtitle'>Program Description (The editor supports MarkDown syntax)</h4>
                <MarkDownEditor OriginDesc={OriginDesc} Description={Description} setDescription={setDescription}/>
                <textarea id='Description' name='Description' hidden={true} value={Description} readOnly/>
                <div id='SaveCancelButtonGroup'>
                    <button type="submit" className='Button'>Save</button>
                    <button onClick={() => {
                        navigate(-1)
                    }} className='Button'>Cancel
                    </button>
                </div>
            </Form>
        </div>
    )
}


// function AddModifyProgram({isShow, setIsShow, setIsForceFetch, originData = null}) {
//     const OriginDesc = originData === null ? DescriptionTemplate : originData.Description;
//     const [Description, setDescription] = useState(OriginDesc);
//
//     const mode = originData === null ? 'Add' : 'Modify';
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const University = event.target.University.value;
//         const Program = event.target.Program.value;
//         const targetApplicantMajor = getListChoices(event.target.TargetApplicantMajor);
//         const Region = getListChoices(event.target.Region);
//
//         const data = {
//             'newProgram': false,
//             'content': {
//                 'ProgramID': `${Program}@${University}`,
//                 'University': University,
//                 'Program': Program,
//                 'Region': Region,
//                 'Degree': event.target.Degree.value,
//                 'TargetApplicantMajor': targetApplicantMajor,
//                 'Description': Description,
//                 'Applicants': []
//             }
//         };
//         try {
//             const response = await addModifyProgram(data);
//             if (response.status === 200) {
//                 alert(`Program ${mode} Successfully!`);
//                 setIsForceFetch(true);
//                 setIsShow(false);
//             } else {
//                 const content = await response.json();
//                 alert(`${content.error}, Error code: ${response.status}`);
//             }
//         } catch (e) {
//             alert(e)
//         }
//     }
//     //
//     // if (!isShow) {
//     //     return null;
//     // }
//
//     return (
//         <div className='ProgramContent'>
//             <form onSubmit={handleSubmit} className='ProgramForm'>
//                 <h1 id="Title">{`${mode} Program`}</h1>
//
//                 <h4 className='Subtitle'>University Name</h4>
//                 <input type="text" id="University" name="University"
//                        defaultValue={originData === null ? '' : originData.University}
//                        placeholder="University Name" required
//                        disabled={originData !== null}
//                 />
//
//                 <h4 className='Subtitle'>Program Name</h4>
//                 <input type="text" id="Program" name="Program"
//                        defaultValue={originData === null ? '' : originData.Program}
//                        placeholder="Program Name" required
//                        disabled={originData !== null}
//                 />
//
//                 <h4 className='Subtitle'>Program Degree</h4>
//                 <SingleChoice
//                     choices={['Master', 'PhD']}
//                     defaultValue={originData === null ? 'Master' : originData.Degree}
//                     name={'Degree'}
//                 />
//
//                 <h4 className='Subtitle'>Target Applicant Major (Multi-choices)</h4>
//                 <MultiChoice
//                     choices={ProgramTargetApplicantMajorChoices}
//                     defaultValue={originData === null ? [] : originData.TargetApplicantMajor}
//                     name="TargetApplicantMajor"
//                 />
//
//                 <h4 className='Subtitle'>Program Region (Multi-choices)</h4>
//                 <MultiChoice
//                     choices={ProgramRegionChoices}
//                     defaultValue={originData === null ? [] : originData.Region}
//                     name="Region"
//                 />
//
//                 <h4 className='Subtitle'>Program Description (The editor supports MarkDown syntax)</h4>
//                 <MarkDownEditor OriginDesc={OriginDesc} Description={Description} setDescription={setDescription}/>
//
//                 <div id='SaveCancelButtonGroup'>
//                     <button type="submit" className='Button'>Save</button>
//                     <button onClick={() => {
//                         setDescription(DescriptionTemplate)
//                         setIsShow(false)
//                     }} className='Button'>Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

function SingleChoice({choices, defaultValue, name}) {
    return (
        <select defaultValue={defaultValue} name={name}>
            {choices.map((choice) => (
                <option value={choice} key={choice}>{choice}</option>
            ))}
        </select>
    )
}

function MultiChoice({choices, defaultValue, name}) {
    return (
        <div className="MultiChoice">
            {choices.map((choice) => (
                <div className="MultiChoiceOption" key={choice}>
                    <input type="checkbox" id={choice} name={name} value={choice}
                           defaultChecked={defaultValue.includes(choice)}/>
                    <label htmlFor={choice}>{choice}</label>
                </div>
            ))}
        </div>
    )
}

export default AddModifyProgram;