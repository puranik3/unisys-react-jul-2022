// useState is one of the "hooks" of React
// "hooks" can be used ONLY in function components (class components do not need them and are not allowed to use them)
import React, { useState, useEffect } from "react";
import { Form, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import { getWorkshops, getWorkshopsForPage } from "../../../services/workshops";

import useFilter from '../../../hooks/useFilter';

import './index.css';
import WorkshopItem from "./WorkshopItem";

// Shortcut to create function component code - sfc
// { details } -> pick props.details (1st argument is props) and set it to a variable called details
const WorkshopsList = ({ details, cols }) => {
    // console.log(details, cols);

    // [ data, setter function for the data ]
    // workshops -> data (1st item in the array)
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [ show, setShow ] = useState( details );

    // console.log( 'workshops = ', workshops ); // data -> []
    // console.log( 'setWorkshops = ', setWorkshops ); // setter -> function

    // if we pass empty array (i.e. []) as the 2nd argument to useEffect, the "side-effect" runs after firts component render
    // useEffect(
    //     () => { // the "side-effect"
    //         getWorkshops()
    //             .then(workshops => {
    //                 setWorkshops( workshops );
    //             })
    //             .catch(error => {
    //                 setError( error );
    //             })
    //             .finally(() => {
    //                 setLoading( false );
    //             });
    //     },
    //     []
    // );

    const previousPage = () => {
        // setPage( p - 1 );

        // if new state depends on current state, then we must use the function form os the setter
        setPage( p => p - 1 );
    };

    const nextPage = () => {
        setPage( p => p + 1 );
    };

    const toggle = () => {
        // new state depends on current state, then we must use the function form os the setter
        setShow( v => !v );
    };

    const { filterKey, setFilterKey, filteredItems : filteredWorkshops } = useFilter( workshops );

    // this side-effect runs on first load AND change to page state
    useEffect(() => {
        const fetchWorkshopsForPage = async () => {
            try {
                const workshops = await getWorkshopsForPage(page);
                setWorkshops(workshops);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchWorkshopsForPage();
    }, [page]); // runs ONLY on page change

    useEffect(() => {
        setShow( details );
    }, [details]);

    // <></> -> is React.Fragment
    return (
        <>
            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status" aria-label="Loading list of workshops">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {!loading && error && (
                <Alert variant="danger">{error.message}</Alert>
            )}
            {!loading && !error && (
                <>
                    <h1>List of workshops</h1>
                    <hr />
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="search"
                            placeholder="Type here to search by session name"
                            value={filterKey}
                            onChange={( event ) => setFilterKey( event.target.value )}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Button onClick={previousPage} size="sm me-2">
                                Previous
                            </Button>
                            <Button onClick={nextPage} size="sm">
                                Next
                            </Button>
                        </div>
                        
                        <Button size="sm" onClick={toggle}>
                            Hide / Show details
                        </Button>
                    </div>
                    <Row xs={1} lg={cols} className="clearfix">
                        {/* Use array idx (second argument to function passed to map() as last resort */}
                        {filteredWorkshops.map((workshop) => (
                            <Col key={workshop.id} className="d-flex align-items-stretch my-3">
                                <WorkshopItem
                                    workshop={workshop}
                                    show={show}
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default WorkshopsList;
