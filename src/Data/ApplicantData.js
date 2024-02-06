import localforage from "localforage";
import {ADD_MODIFY_APPLICANT, REMOVE_APPLICANT, APPLICANT_LIST, GET_APPLICANT_BY_USER} from "../APIs/APIs";
import {handleErrors, headerGenerator} from "./Common";
import {getPrograms, setPrograms} from "./ProgramData";
import {json} from "react-router-dom";

const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 min

export async function getApplicants(isRefresh = false, query = {}) {
    /*
    * Get the list of applicants from the server or local storage
    * @param isRefresh [Boolean]: whether to refresh the data
    * @param query [Object]: {
    *
    * }
    * @return: list of applicants
    */
    const userId = query?.userId;
    // await localforage.removeItem('applicants')  //TODO: remove this line
    let applicants = await localforage.getItem('applicants');

    if (isRefresh || applicants === null || (Date.now() - applicants.Date) > CACHE_EXPIRATION) {
        const response = await fetch(APPLICANT_LIST, {
            method: 'POST',
            credentials: 'include',
            headers: await headerGenerator(true),
        });
        await handleErrors(response)
        applicants = (await response.json());
        await setApplicants(applicants['data']);
    }
    // if (userId) {
    //     applicants = applicants['data'].filter(applicant => applicant.ApplicantID.split('@')[0] === userId);
    // } else {
    //     applicants = applicants['data'];
    // }
    return applicants['data'];
}

export async function getApplicantByUser(userId, isRefresh = false) {
    /*
    * Get the list of applicants from the server or local storage by userId
    * @param userId [String]: userId
    * @return: list of applicants
    */
    await localforage.removeItem(`${userId}-applicants`)  //TODO: remove this line
    let applicants = await localforage.getItem(`${userId}-applicants`);
    if (isRefresh || applicants === null || (Date.now() - applicants.Date) > CACHE_EXPIRATION) {
        const response = await fetch(GET_APPLICANT_BY_USER, {
            method: 'POST',
            credentials: 'include',
            headers: await headerGenerator(true),
            body: JSON.stringify({display_name: userId})
        });
        await handleErrors(response)
        applicants = (await response.json());
        await setApplicantByUser(userId, applicants['result']);
    }
    return applicants['result'];
}

export async function setApplicantByUser(userId, applicants) {
    /*
    * Set the list of applicants to the local storage (i.e. localforage.getItem('applicants'))
    * @param userId [String]: userId
    * @param applicants [Array]: list of applicants
    */
    applicants = {'result': applicants, 'Date': Date.now()}
    await localforage.setItem(`${userId}-applicants`, applicants);
}

export async function getApplicant(applicantID, isRefresh = false) {
    /*
    * Get the applicant from the server or local storage by applicantID
    * @param applicantID [String]: applicantID
    * @param isRefresh [Boolean]: whether to refresh the data
    * @return: applicant
    */
    const applicants = await getApplicants(isRefresh);
    return applicants.find(applicant => applicant.ApplicantID === applicantID);
}

export async function setApplicants(applicants) {
    /*
    * Set the list of applicants to the local storage (i.e. localforage.getItem('applicants'))
    * @param applicants [Array]: list of applicants
    */
    applicants = {'data': applicants, 'Date': Date.now()}
    await localforage.setItem('applicants', applicants);
}


export async function setApplicant(applicant) {
    /*
    * Set the applicant to the local storage (i.e. localforage.getItem('applicants'))
    * @param applicant [Object]: applicant
    */
    const applicants = await getApplicants();
    if (applicants.find(p => p.ApplicantID === applicant.ApplicantID) !== undefined) {
        applicants[applicants.indexOf(applicant)] = applicant;
    }
    await setPrograms(applicants);
}

export async function addModifyApplicant(requestBody) {
    /*
    * Set the applicant to the local storage (i.e. localforage.getItem('applicants')), and post to the server.
    * @param applicant [Object]: applicant information
    */

    const response = await fetch(ADD_MODIFY_APPLICANT, {
        method: 'POST',
        credentials: 'include',
        headers: await headerGenerator(true),
        body: JSON.stringify({
            newApplicant: requestBody.newApplicant,
            content: {...(requestBody.content), Programs: []},
        }),
    });
    await handleErrors(response)
    await setApplicant(requestBody.content);
}