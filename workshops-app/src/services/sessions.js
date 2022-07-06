import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const getSessionsForWorkshop = async ( workshopId ) => {
    const response = await axios.get( `${baseUrl}/workshops/${workshopId}/sessions` );
    return response.data;
};
/**
 * @param {string} type 'upvote' | 'downvote'
 */
const vote = async ( sessionId, type ) => {
    const response = await axios.put( `${baseUrl}/sessions/${sessionId}/${type}`, null );
    return response.data;
};

export {
    getSessionsForWorkshop,
    vote
};