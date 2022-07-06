import { useState, useEffect } from 'react';
import { Spinner, Alert, ListGroup } from 'react-bootstrap';
import SessionItem from './SessionItem';

import { getSessionsForWorkshop, vote as voteSvc } from "../../../../services/sessions";

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

    const vote = async ( event, sessionId, type ) => {
        console.log( event );
        console.log( 'You tried to ' + type + ' session id =' + sessionId );

        const updatedSession = await voteSvc( sessionId, type );
        console.log( updatedSession );

        sessions.find( session => session.id === updatedSession.id );

        // we make an "immutable" change to the sessions array - i.e. the current sessions remains untouched, and a new array of sessions is generated
        setSessions( sessions => {
            // generate a new sessions array through map(), and return it
            // every item except the one updated is the same as before
            return sessions.map(
                s => {
                    if( s.id === sessionId ) {
                        return updatedSession;
                    } else {
                        return s;
                    }
                }
            )
        });
    };

    return (
        <div>
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
            {
                !loading && !error && (
                    <>
                        <h2>Sessions in this workshop</h2>
                        <hr />
                        <ListGroup>
                            {
                                sessions.map(
                                    session => (
                                        <ListGroup.Item key={session.id}>
                                            <SessionItem
                                                session={session}
                                                vote={vote}
                                            ></SessionItem>
                                        </ListGroup.Item>
                                    )
                                )
                            }
                        </ListGroup>
                    </>
                )
            }
        </div>
    );
}
 
export default SessionsList;