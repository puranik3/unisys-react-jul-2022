// useState is one of the "hooks" of React
// "hooks" can be used ONLY in function components (class components do not need them and are not allowed to use them)
import React, { Component } from "react";
import { Form, Spinner, Alert, Button, Row, Col } from "react-bootstrap";
import { getWorkshopsForPage } from "../../../services/workshops";

import './index.css';
import WorkshopItem from "./WorkshopItem";

class WorkshopsList extends Component {
    // set up data member here...
    state = {
        workshops: [],
        loading: true,
        error: null,
        page: 1,
        show: this.props.details
    };

    // ...alternatively
    // constructor( props ) {
    //     super( props ); // this.props = props

    //     this.state = {
    //         workshops: [],
    //         loading: true,
    //         error: null,
    //         page: 1,
    //         show: this.props.details
    //     };
    // }

    // IMPORTANT: Event handlers -> best to use the () => {} syntax
    previousPage = () => {
        this.setState({
            page: this.state.page - 1
        });
    };

    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        });
    };

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    };

    // const { filterKey, setFilterKey, filteredItems : filteredWorkshops } = useFilter( workshops );

    async fetchWorkshopsForPage() {
        this.setState({
            loading: true
        });

        try {
            const workshops = await getWorkshopsForPage(this.state.page);
            this.setState({
                workshops: workshops,
                loading: false
            });
        } catch (error) {
            this.setState({
                error: error,
                loading: false
            });
        }
    }

    // this method executes ONLY after FIRST render
    // cdm (shotcut to generate skeleton)
    componentDidMount() {
        this.fetchWorkshopsForPage();
    }

    // state changes -> render is called -> componentDidUpdate is called
    // NOT called after first render. Is called after every state / prop change
    componentDidUpdate( oldProps, oldState ) {
        // executing the side-effect on certain state change(s)
        if( oldState.page !== this.state.page ) {
            this.fetchWorkshopsForPage();
        }

        if( oldProps.details !== this.props.details ) {
            this.setState({
                show: this.props.details
            });
        }
    }

    render() {
        const {
            workshops,
            loading,
            error,
            show
        } = this.state;

        const {
            cols
        } = this.props;

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
                        {
                            /*
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="search"
                                placeholder="Type here to search by session name"
                                value={filterKey}
                                onChange={( event ) => setFilterKey( event.target.value )}
                            />
                        </Form.Group>
                            */
                        }
                        <div className="d-flex justify-content-between">
                            <div>
                                <Button onClick={this.previousPage} size="sm me-2">
                                    Previous
                                </Button>
                                <Button onClick={this.nextPage} size="sm">
                                    Next
                                </Button>
                            </div>
                            
                            <Button size="sm" onClick={this.toggle}>
                                Hide / Show details
                            </Button>
                        </div>
                        <Row xs={1} lg={cols} className="clearfix">
                            {/* Use array idx (second argument to function passed to map() as last resort */}
                            {workshops.map((workshop) => (
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
    }
};

export default WorkshopsList;
