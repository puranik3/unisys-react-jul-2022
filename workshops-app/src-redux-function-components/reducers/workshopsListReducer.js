import { ERROR_FETCHING_WORKSHOPS, FETCHED_WORKSHOPS, FETCHING_WORKSHOPS, NEXT_PAGE, PREVIOUS_PAGE } from "../actions/constants";

const initialState = {
    workshops: [],
    loading: true,
    error: null,
    page: 1,
};

const workshopsListReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case FETCHING_WORKSHOPS:
            return {
                ...state,
                loading: true
            };
        case FETCHED_WORKSHOPS:
            return {
                ...state,
                loading: false,
                workshops: action.payload.workshops
            };
        case ERROR_FETCHING_WORKSHOPS:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        case PREVIOUS_PAGE:
            return {
                ...state,
                page: state.page - 1
            };
        default:
            return state;
    }
};

export default workshopsListReducer;