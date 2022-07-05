import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import Moment from 'react-moment';

import { getWorkshopById } from '../../../services/workshops';

const WorkshopDetails = () => {
    const format = "DD-MM-yyyy";

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
            el = <Alert variant="danger">{error.message}</Alert>;
        } else {
            el = (
                <div>
                    <h1>{workshop.name}</h1>
                    <hr />
                    <Row>
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

                    <SessionsList id={id} />
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