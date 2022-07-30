// createRef in class components
import { toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import { addSession as addSessionSvc } from '../../../../services/sessions';

const AddSession = ({ id }) => {
    const { push } = useHistory();

    const [ sequenceId, setSequenceId ] = useState( '' );
    const [ name, setName ] = useState( '' );
    const [ speaker, setSpeaker ] = useState( '' );
    const [ duration, setDuration ] = useState( '' );
    const [ level, setLevel ] = useState( '' );
    const [ abstract, setAbstract ] = useState( '' );

    const [ sequenceIdErr, setSequenceIdErr ] = useState( '' );
    // const [ nameErr, setNameErr ] = useState( '' );
    // const [ speakerErr, setSpeakerErr ] = useState( '' );
    // const [ durationErr, setDurationErr ] = useState( '' );
    // const [ levelErr, setLevelErr ] = useState( '' );
    // const [ abstractErr, setAbstractErr ] = useState( '' );

    const [ valid, setValid ] = useState( false );
    const [ isSubmitted, setSubmitted ] = useState( false );

    const validate = () => {
        const sequenceIdVal = sequenceId.trim();
        
        let sequenceIdErr = '';
        let valid = true;

        // is required
        if( sequenceIdVal === '' ) {
            sequenceIdErr += 'Sequence ID cannot be empty';
            valid = false;
        }

        // is a positive number
        if( /^\d+$/.test( sequenceIdVal ) === false ) {
            sequenceIdErr += 'Sequence ID must be a positive number';
            valid = false;
        }

        setSequenceIdErr( sequenceIdErr );

        // validate other inputs similarly
        // ...

        setValid( valid );

        return valid;
    };

    useEffect( () => {
        validate();
    }, [ sequenceId ] );

    const addSession = async ( event ) => {
        setSubmitted( true );

        // prevent the browser from submitting the form
        event.preventDefault();

        if( validate() ) {
            const session = {
                workshopId: +id,
                sequenceId: +sequenceId.trim(),
                name: name.trim(),
                speaker: speaker.trim(),
                duration: parseFloat( duration.trim() ),
                level: level.trim(),
                abstract: abstract.trim(),
                upvoteCount: 0
            };

            try {
                const addedSession = await addSessionSvc( session );
                toast.success( 'Session was added' );
                push( `/workshops/${id}` );
            } catch( error ) {
                console.log( error );
                toast.error( error.response.data || error.message )
            }
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
                        value={sequenceId}
                        onChange={ event => setSequenceId( event.target.value ) }
                        isInvalid={isSubmitted && sequenceIdErr}
                    />
                    <Form.Text className="text-muted">
                        Sequence ID is the serial number of the session in the
                        workshop
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {isSubmitted && sequenceIdErr}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="React v18 features"
                        value={name}
                        onChange={ event => setName( event.target.value ) }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="John Doe, Jane Doe"
                        value={speaker}
                        onChange={ event => setSpeaker( event.target.value ) }
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="1.5"
                        value={duration}
                        onChange={ event => setDuration( event.target.value ) }
                    />
                    <Form.Text className="text-muted">
                        Duration must be specified in hours. Example: for 30
                        minutes, enter 0.5
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        value={level}
                        onChange={ event => setLevel( event.target.value ) }
                    >
                        <option value="">-- Select level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="abstract">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Describe the session in a few words"
                        value={abstract}
                        onChange={ event => setAbstract( event.target.value ) }
                    />
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
