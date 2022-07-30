import { useState } from 'react';
import { Provider } from 'react-redux';
import { Container } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from "./containers/Menu/";
import MyHome from "./components/pages/Home";
import WorkshopsList from "./components/pages/WorkshopsList";
import WorkshopDetails from "./containers/pages/WorkshopDetails";
import PageNotFound from "./components/PageNotFound";

import { ToastContainer } from 'react-toastify';
import store from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // JSX is like HTML syntax
    // JSX defines a "React element" - an object which defines the user interface
    const [ theme, setTheme ] = useState( 'light' );

    const toggleTheme = () => setTheme( t => t === 'light' ? 'dark' : 'light' );

    const value = {
        theme,
        toggleTheme
    };

    return (
        <Provider store={store}>
            <div id="app" title="Workshops App">
                <ToastContainer autoClose={5000} />
                <Menu></Menu>
                <Container className="my-4">
                    <Switch>
                        <Route path="/workshops/:id">
                            <WorkshopDetails></WorkshopDetails>
                        </Route>
                        <Route path="/workshops" exact>
                            {/* props (attributes) are the way to customize an instance of the component - it is the way the parent component (here, App) customizes the children (here, WorkshopsList) */}
                            <WorkshopsList
                                details={true}
                                cols={4}
                            ></WorkshopsList>
                        </Route>
                        <Route path="/notfound">
                            <PageNotFound></PageNotFound>
                        </Route>
                        <Route path="/" exact>
                            <MyHome></MyHome>
                        </Route>
                        {/* ** matches all routes, but we have put this as the last route. so if none matched, this will match and show the page not found */}
                        <Route path="**">
                            <Redirect to="/notfound" />
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Provider>
    );
}

export default App;
