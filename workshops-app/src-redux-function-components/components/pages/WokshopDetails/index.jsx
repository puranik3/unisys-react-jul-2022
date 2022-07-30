import { useState, useEffect } from 'react';
import { useParams, Switch, Route, Redirect } from 'react-router-dom';
import { Alert, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

import SessionsList from './SessionsList';
import AddSession from './AddSession';

import { getWorkshopById } from '../../../services/workshops';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const WorkshopDetails = () => {
    const format = "DD-MM-yyyy";
    const theme = useSelector( state => state.themeState.theme );

    const { id } = useParams(); // { id: '2', action: 'edit' }

    const [ workshop, setWorkshop ] = useState( null );
    const [ error, setError ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                const workshop = await getWorkshopById( id );
                setWorkshop(workshop);
            } catch (error) {
                setError(error);
                toast.error( 'No matching workshop was found' );
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchWorkshop();
    }, []); // runs ONLY after initial render

    let el = null;

    if( loading ) {
        el = <div>Need to fetch details for workshops with id = {id}</div>;
    } else {
        if( error ) {
            el = <Redirect to="/notfound" />
        } else {
            el = (
                <div>
                    <h1>{workshop.name}</h1>
                    <hr />
                    <Row className={theme === 'light' ? 'bg-light' : 'bg-dark text-light'}>
                        <Col xs={12} lg={4}>
                            <Image src={workshop.imageUrl} fluid />
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row xs={2} lg={4}>
                                <Col>
                                    <div>
                                        <small>
                                            <Moment format={format}>
                                                {workshop.startDate}
                                            </Moment>
                                            {" - "}
                                            <Moment format={format}>{workshop.endDate}</Moment>
                                        </small>
                                    </div>
                                    <div>
                                        <small>{workshop.time}</small>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        {
                                            workshop.modes.inPerson ? (
                                                <FontAwesomeIcon icon={faCheck} />
                                            ) : (
                                                <FontAwesomeIcon icon={faTimes} />
                                            )
                                        }
                                        <span className="ms-2">In-Person</span>
                                        </div>
                                    <div>
                                        <FontAwesomeIcon icon={workshop.modes.online ? faCheck : faTimes} />
                                        <span className="ms-2">Online</span>
                                    </div>
                                </Col>
                            </Row>
                            <div dangerouslySetInnerHTML={{ __html: workshop.description }}></div>
                        </Col>
                    </Row>

                    <Switch>
                        <Route path="/workshops/:id/add">
                            <AddSession id={id} />
                        </Route>
                        <Route path="/workshops/:id" exact>
                            <SessionsList id={id} />
                        </Route>
                        <Route path="**">
                            <Redirect to="/notfound"></Redirect>
                        </Route>
                    </Switch>
                </div>
            )
        }
    }

    return (
        <div>
            {el}
        </div>
    );
}
 
export default WorkshopDetails;