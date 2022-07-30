import {
    TOGGLE_THEME,
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    NEXT_PAGE,
    PREVIOUS_PAGE
} from "./constants";

import { getWorkshopsForPage } from '../services/workshops';

const toggleTheme = () => {
    return {
        type: TOGGLE_THEME
    }
};

const fetchingWorkshops = () => {
    return {
        type: FETCHING_WORKSHOPS
    };
};

const fetchedWorkshops = ( workshops ) => {
    return {
        type: FETCHED_WORKSHOPS,
        payload: {
            workshops
        }
    };
};

const errorFetchingWorkshops = ( error ) => {
    return {
        type: ERROR_FETCHING_WORKSHOPS,
        payload: {
            error
        }
    };
};

const nextPage = () => {
    return {
        type: NEXT_PAGE
    };
};

const previousPage = () => {
    return {
        type: PREVIOUS_PAGE
    };
};

// special action -> an action which is a function (not an object)
const fetchWorkshops = ( page ) => {
    return async ( dispatch, getState ) => {
        try {
            const workshops = await getWorkshopsForPage(page);
            dispatch( fetchedWorkshops( workshops ) );
        } catch (error) {
            dispatch( errorFetchingWorkshops( error ) );
        }
    };
}

export {
    toggleTheme,
    fetchingWorkshops,
    fetchedWorkshops,
    errorFetchingWorkshops,
    nextPage,
    previousPage,
    fetchWorkshops
}