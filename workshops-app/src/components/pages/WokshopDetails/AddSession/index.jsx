// createRef in class components
import { toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import { addSession as addSessionSvc } from '../../../../services/sessions';
import { useForm } from 'react-hook-form';

const AddSession = ({ id }) => {
    /**
     *  errors = {
     *      sequenceId: {
     *          type: "required"
     *      }
     *  }
     */
    const { register, getValues, handleSubmit, formState: { errors } } = useForm({
        mode: 'all'
    });

    const { push } = useHistory();

    const addSession = async ( incomingSession ) => {
        const session = {
            workshopId: id,
            upvoteCount: 0,
            ...incomingSession,
            sequenceId: +incomingSession.sequenceId,
            duration: +incomingSession.duration
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

    const csv = () => {
        const csvPattern = /^[A-Za-z][A-Za-z ]*(,[A-Za-z ]+)*$/;
        const speakerValue = getValues( 'speaker' );

        return csvPattern.test( speakerValue );
    };

    const p = {
        type: "number",
        placeholder: "2"
    }

    return (
        <>
            <h2 className="mt-4">Add a session</h2>
            <hr />
            <Form onSubmit={handleSubmit(addSession)}>
                <Form.Group className="mb-3" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        {...p}
                        {...register( 'sequenceId', { required: true, pattern: /^\d+$/ } )}
                        isInvalid={errors.sequenceId?.type}
                    />
                    <Form.Text className="text-muted">
                        Sequence ID is the serial number of the session in the
                        workshop
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {errors.sequenceId?.type === 'required' && <div>Sequence ID is required</div>}
                        {errors.sequenceId?.type === 'pattern' && <div>Sequence ID must be a positive number</div>}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="React v18 features"
                        {...register( 'name', { required: true } )}
                        isInvalid={errors.name?.type}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name?.type === 'required' && <div>Name is required</div>}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="John Doe, Jane Doe"
                        {...register( 'speaker', { required: true, validate: { csv: csv } } )}
                        isInvalid={errors.speaker?.type}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.speaker?.type === 'required' && <div>At least one speaker's name required</div>}
                        {errors.speaker?.type === 'csv' && <div>Speaker names can have only letters and spaces. Separate speaker names with a comma.</div>}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="1.5"
                        {...register( 'duration', { required: true, pattern: /^\d+(\.\d+)?$/ } )}
                        isInvalid={errors.duration?.type}
                    />
                    <Form.Text className="text-muted">
                        Duration must be specified in hours. Example: for 30
                        minutes, enter 0.5
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {errors.duration?.type === 'required' && <div>Duration is required</div>}
                        {errors.duration?.type === 'pattern' && <div>Duration must be a positive number (with optional decimal part)</div>}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        {...register( 'level', { required: true } )}
                        isInvalid={errors.level?.type}
                    >
                        <option value="">-- Select level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.level?.type === 'required' && <div>Level is required</div>}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="abstract">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Describe the session in a few words"
                        {...register( 'abstract', { required: true, minLength: 20 } )}
                        isInvalid={errors.abstract?.type}
                    />
                    <Form.Text className="text-muted">
                        Description must be at least 20 characters long
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        {errors.abstract?.type === 'required' && <div>Description is required</div>}
                        {errors.abstract?.minLength === 'required' && <div>Description must be at least 20 characters long</div>}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add a session
                </Button>
            </Form>
        </>
    );
};

export default AddSession;
