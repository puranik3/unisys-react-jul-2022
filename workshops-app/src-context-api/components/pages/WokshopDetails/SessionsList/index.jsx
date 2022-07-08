import { useState, useEffect, useContext } from "react";
import { Button, Form, Spinner, Alert, ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import SessionItem from "./SessionItem";
import { toast } from "react-toastify";

import useFilter from '../../../../hooks/useFilter';

import {
    getSessionsForWorkshop,
    vote as voteSvc,
} from "../../../../services/sessions";

import ThemeContext from "../../../../context/ThemeContext";

// The component recieves id as a prop. Alternatively it can use useParams() to get it from the URL.
const SessionsList = ({ id }) => {
    const { theme } = useContext( ThemeContext );

    // EXERCISE: You can create a custom hook that fetches required data on first render of a component
    const [ sessions, setSessions ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    useEffect(() => {
        const fetchSessionsForWorkshop = async () => {
            try {
                const sessions = await getSessionsForWorkshop(id);
                setSessions(sessions);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        setLoading(true);
        fetchSessionsForWorkshop();
    }, []); // runs ONLY after first render

    const { filterKey, setFilterKey, filteredItems : filteredSessions } = useFilter( sessions );
    
    const vote = async (event, sessionId, type) => {
        console.log(event);
        console.log("You tried to " + type + " session id =" + sessionId);

        try {
            const updatedSession = await voteSvc(sessionId, type);
            console.log(updatedSession);

            sessions.find((session) => session.id === updatedSession.id);

            // we make an "immutable" change to the sessions array - i.e. the current sessions remains untouched, and a new array of sessions is generated
            setSessions((sessions) => {
                // generate a new sessions array through map(), and return it
                // every item except the one updated is the same as before
                return sessions.map((s) => {
                    if (s.id === sessionId) {
                        return updatedSession;
                    } else {
                        return s;
                    }
                });
            });

            toast.success("Your vote has been captured");
        } catch (error) {
            toast.error(error.message);
        }
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
            {!loading && !error && (
                <>
                    <h2>
                        Sessions in this workshop
                        <Button className="float-end" as={Link} to={`/workshops/${id}/add`}>Add a session</Button>
                    </h2>
                    <hr />
                    {/* value prop when set, enables React to "control" the component's value */}
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="search"
                            placeholder="Type here to search by session name"
                            value={filterKey}
                            onChange={( event ) => setFilterKey( event.target.value )}
                        />
                    </Form.Group>
                    {filterKey}
                    <ListGroup>
                        {filteredSessions.map((session) => (
                            <ListGroup.Item key={session.id}>
                                <SessionItem
                                    session={session}
                                    vote={vote}
                                    theme={theme}
                                ></SessionItem>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}
        </div>
    );
};

export default SessionsList;
