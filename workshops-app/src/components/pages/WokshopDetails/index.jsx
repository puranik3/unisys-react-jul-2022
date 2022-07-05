import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Row, Col, Image } from 'react-bootstrap';

import { getWorkshopById } from '../../../services/workshops';

const WorkshopDetails = () => {
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
                        <Col xs={12} lg={8} dangerouslySetInnerHTML={{ __html: workshop.description }}></Col>
                    </Row>
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