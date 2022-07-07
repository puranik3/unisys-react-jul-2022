// createRef in class components
import { useRef, useState } from 'react';
import { Form, Button } from "react-bootstrap";

const AddSession = ({ id }) => {
    const sequenceIdRef = useRef();
    const nameRef = useRef();
    const speakerRef = useRef();
    const durationRef = useRef();
    const levelRef = useRef();
    const abstractRef = useRef();

    const [ sequenceIdErr, setSequenceIdErr ] = useState( '' );
    // const [ nameErr, setNameErr ] = useState( '' );
    // const [ speakerErr, setSpeakerErr ] = useState( '' );
    // const [ durationErr, setDurationErr ] = useState( '' );
    // const [ levelErr, setLevelErr ] = useState( '' );
    // const [ abstractErr, setAbstractErr ] = useState( '' );

    const [ valid, setValid ] = useState( false );

    const validate = () => {
        const sequenceId = sequenceIdRef.current.value.trim();
        
        let sequenceIdErr = '';
        let valid = true;

        // is required
        if( sequenceId === '' ) {
            sequenceIdErr += 'Sequence ID cannot be empty';
            valid = false;
        }

        // is a positive number
        if( /^\d+$/.test( sequenceId ) === false ) {
            sequenceIdErr += 'Sequence ID must be a positive number';
            valid = false;
        }

        setSequenceIdErr( sequenceIdErr );

        // validate other inputs similarly
        // ...

        setValid( valid );

        return valid;
    };

    const addSession = ( event ) => {
        // prevent the browser from submitting the form
        event.preventDefault();

        if( validate() ) {
            alert( 'About to submit' );
        }
    }

    return (
        <>
            <h2 className="mt-4">Add a session</h2>
            <hr />
            <Form onSubmit={addSession}>
                <Form.Group className="mb-3" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="2"
                        ref={sequenceIdRef}
                        isInvalid={sequenceIdErr}
                    />
                    <Form.Text className="text-muted">
                        Sequence ID is the serial number of the session in the
                        workshop
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {sequenceIdErr}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="React v18 features"
                        ref={nameRef}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control type="text" placeholder="John Doe, Jane Doe" ref={speakerRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" placeholder="1.5" ref={durationRef} />
                    <Form.Text className="text-muted">
                        Duration must be specified in hours. Example: for 30
                        minutes, enter 0.5
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select ref={levelRef}>
                        <option value="">-- Select level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="abstract">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Describe the session in a few words" ref={abstractRef} />
                    <Form.Text className="text-muted">
                        Description must be at least 20 characters long
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add a session
                </Button>
            </Form>
        </>
    );
};

export default AddSession;
