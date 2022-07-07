import { Form, Button } from "react-bootstrap";

const AddSession = ({ id }) => {
    return (
        <>
            <h2 className="mt-4">Add a session</h2>
            <hr />
            <Form>
                <Form.Group className="mb-3" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control type="number" placeholder="2" />
                    <Form.Text className="text-muted">
                        Sequence ID is the serial number of the session in the
                        workshop
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="React v18 features" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control type="text" placeholder="John Doe, Jane Doe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" placeholder="John Doe, Jane Doe" />
                    <Form.Text className="text-muted">
                        Duration must be specified in hours. Example: for 30
                        minutes, enter 0.5
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select>
                        <option value="">-- Select level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="abstract">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Describe the session in a few words" />
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
