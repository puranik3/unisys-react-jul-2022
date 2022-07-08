import { Row, Col, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretUp,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';

const SessionItem = ( { session, vote, theme } ) => {
    return (
        <Row className={theme === 'light' ? 'bg-light' : 'bg-dark text-light'}>
            <Col xs={1} className="d-flex flex-column align-items-center">
                <FontAwesomeIcon
                    icon={faCaretUp}
                    className="fa-2x"
                    onClick={( event ) => vote( event, session.id, 'upvote' )}
                />
                {session.upvoteCount}
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className="fa-2x"
                    onClick={( event ) => vote( event, session.id, 'downvote' )}
                />
            </Col>
            <Col xs={11}>
                <h3>{session.name}</h3>
                <div>by {session.speaker}</div>
                <div className="my-2">
                    <Badge bg="primary">{session.level}</Badge>
                </div>
                <div className="my-1">{session.duration} hours</div>
                <div>{session.abstract}</div>
            </Col>
        </Row>
    );
};

export default SessionItem;
