import { Card } from "react-bootstrap";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const WorkshopItem = ( { workshop, show } ) => {
    const format = "DD-MM-yyyy";

    return (
        <Card
            className="p-4 card-workshop text-reset text-decoration-none"
            as={Link}
            to={`/workshops/${workshop.id}`}
        >
            <Card.Img variant="top" src={workshop.imageUrl} />
            <Card.Body>
                <Card.Title>{workshop.name}</Card.Title>
                {show ? (
                    <>
                        <div>
                            <Moment format={format}>
                                {workshop.startDate}
                            </Moment>
                            {" - "}
                            <Moment format={format}>{workshop.endDate}</Moment>
                        </div>
                        <div>{workshop.time}</div>
                    </>
                ) : (
                    <span>Some details are hidden</span>
                )}
            </Card.Body>
        </Card>
    );
};

export default WorkshopItem;
