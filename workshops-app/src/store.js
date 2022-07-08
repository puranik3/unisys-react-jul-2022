import { createStore, combineReducers } from 'redux';
import themeReducer from './reducers/themeReducer';

/**
 * big state -> {
 *      themeState: {
            theme: 'light'
        }
 * 
 * }
 */
const rootReducer = combineReducers({
    themeState: themeReducer
});

const store = createStore( rootReducer );

export default store;