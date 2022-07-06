import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/";
import MyHome from "./components/pages/Home";
import WorkshopsList from "./components/pages/WorkshopsList";
import WorkshopDetails from "./components/pages/WokshopDetails";

import { ToastContainer } from 'react-toastify';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // JSX is like HTML syntax
    // JSX defines a "React element" - an object which defines the user interface
    return (
        <div id="app" title="Workshops App">
            <ToastContainer autoClose={5000} />
            <Menu></Menu>
            <Container className="my-4">
                <Switch>
                    <Route path="/workshops/:id">
                        <WorkshopDetails />
                    </Route>
                    <Route path="/workshops">
                        {/* props (attributes) are the way to customize an instance of the component - it is the way the parent component (here, App) customizes the children (here, WorkshopsList) */}
                        <WorkshopsList
                            details={false}
                            cols={4}
                        ></WorkshopsList>
                    </Route>
                    <Route path="/">
                        <MyHome></MyHome>
                    </Route>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
