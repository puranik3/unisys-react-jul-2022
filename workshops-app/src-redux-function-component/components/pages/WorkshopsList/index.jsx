// useState is one of the "hooks" of React
// "hooks" can be used ONLY in function components (class components do not need them and are not allowed to use them)
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import WorkshopItem from "./WorkshopItem";

import useFilter from '../../../hooks/useFilter';

import {
    // fetchingWorkshops,
    // fetchedWorkshops,
    // errorFetchingWorkshops,
    fetchWorkshops,
    nextPage as nextPageAC,
    previousPage as previousPageAC
} from '../../../actions/creators';

import './index.css';


// Shortcut to create function component code - sfc
// { details } -> pick props.details (1st argument is props) and set it to a variable called details
const WorkshopsList = ({ details, cols }) => {
    // console.log(details, cols);

    // [ data, setter function for the data ]
    // workshops -> data (1st item in the array)
    const { workshops, error, loading, page } = useSelector( state => state.workshopsListState );
    const [ show, setShow ] = useState( details );

    const dispatch = useDispatch();

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
        dispatch( previousPageAC() );
    };

    const nextPage = () => {
        dispatch( nextPageAC() );
    };

    const toggle = () => {
        // new state depends on current state, then we must use the function form os the setter
        setShow( v => !v );
    };

    const { filterKey, setFilterKey, filteredItems : filteredWorkshops } = useFilter( workshops );

    // this side-effect runs on first load AND change to page state
    useEffect(() => {
        // a "function" ation is dispatched -> thunk will execute the function
        dispatch( fetchWorkshops( page ) );
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
