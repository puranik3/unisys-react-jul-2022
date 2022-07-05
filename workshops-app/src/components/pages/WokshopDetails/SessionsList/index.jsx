import { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import SessionItem from './SessionItem';

import { getSessionsForWorkshop } from "../../../../services/sessions";

// The component recieves id as a prop. Alternatively it can use useParams() to get it from the URL.
const SessionsList = ( { id } ) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessionsForWorkshop = async () => {
            try {
                const sessions = await getSessionsForWorkshop( id );
                setSessions( sessions );
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchSessionsForWorkshop();
    }, []); // runs ONLY after first render

    return (
        <div>
            <h2>Sessions in this workshop</h2>
            <hr />
            <ListGroup>
                {
                    sessions.map(
                        session => (
                            <ListGroup.Item key={session.id}>
                                <SessionItem session={session}></SessionItem>
                            </ListGroup.Item>
                        )
                    )
                }
            </ListGroup>
        </div>
    );
}
 
export default SessionsList;