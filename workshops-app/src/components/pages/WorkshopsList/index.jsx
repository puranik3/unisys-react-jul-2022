// useState is one of the "hooks" of React
// "hooks" can be used ONLY in function components (class components do not need them and are not allowed to use them)
import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Row, Col, Card } from "react-bootstrap";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { getWorkshops, getWorkshopsForPage } from "../../../services/workshops";

import './index.css';

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

    const format = "DD-MM-yyyy";

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
                    <Spinner animation="border" role="status">
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
                        {workshops.map((workshop) => (
                            <Col key={workshop.id} className="d-flex align-items-stretch my-3">
                                <Card
                                    className="p-4 card-workshop text-reset text-decoration-none"
                                    as={Link}
                                    to={`/workshops/${workshop.id}`}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={workshop.imageUrl}
                                    />
                                    <Card.Body>
                                        <Card.Title>{workshop.name}</Card.Title>
                                        {
                                            show ? (
                                                <Card.Text>
                                                    <div>
                                                        <Moment format={format}>
                                                            {workshop.startDate}
                                                        </Moment>
                                                        {" - "}
                                                        <Moment format={format}>
                                                            {workshop.endDate}
                                                        </Moment>
                                                    </div>
                                                    <div>
                                                        {workshop.time}
                                                    </div>
                                                </Card.Text>
                                            ) : (
                                                <span>Some details are hidden</span>
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default WorkshopsList;
