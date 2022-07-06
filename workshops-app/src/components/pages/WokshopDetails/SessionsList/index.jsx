import { useState, useEffect } from "react";
import { Form, Spinner, Alert, ListGroup } from "react-bootstrap";
import SessionItem from "./SessionItem";
import { toast } from "react-toastify";

import {
    getSessionsForWorkshop,
    vote as voteSvc,
} from "../../../../services/sessions";

// NOTE: Discussion on debouncing
// import { getSearchresults } from '';
// const debouncedSearch = debounce( getSearchresults );

// The component recieves id as a prop. Alternatively it can use useParams() to get it from the URL.
const SessionsList = ({ id }) => {
    const [ sessions, setSessions ] = useState([]);
    const [ filteredSessions, setFilteredSessions ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ filterKey, setFilterKey ] = useState("Props");

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

    useEffect(() => {
        // NOTE: Discussion on debouncing
        // the underlying function is called only if a fixed time has passed since last change to filterKey
        // debouncedSearch( filterKey )
        
        const filteredSessions = sessions.filter(
            session => session.includes( filterKey )
        );
        setFilteredSessions( filteredSessions );

    }, [ filterKey, sessions ]);
    
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
                    <h2>Sessions in this workshop</h2>
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
