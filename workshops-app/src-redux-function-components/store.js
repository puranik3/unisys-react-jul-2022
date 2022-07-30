import { createStore, combineReducers, applyMiddleware } from 'redux';
import themeReducer from './reducers/themeReducer';
import workshopsListReducer from './reducers/workshopsListReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

/**
 * big state -> {
 *      themeState: {
            theme: 'light'
        }
 * 
 * }
 */
const rootReducer = combineReducers({
    themeState: themeReducer,
    workshopsListState: workshopsListReducer
});

const store = createStore( rootReducer, composeWithDevTools( applyMiddleware( thunk ) ) );

export default store;