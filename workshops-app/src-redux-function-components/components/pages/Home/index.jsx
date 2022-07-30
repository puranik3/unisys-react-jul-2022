import { Card } from 'react-bootstrap';

const Home = () => {
    return (
        <Card className="p-5 bg-light">
            <h1>Workshops App</h1>
            <hr />
            <p>
                The Workshops application serves details of (fictitious) technical workshops happening in various cities. Every workshop has a broad topic (eg. JavaScript), and a workshop has many sessions (each session covers a sub-topic, eg. Closures in JavaScript).
            </p>

            <p>
                You can view a list of workshops, details of every workshop, sessions in a workshop, and also add a new session for a workshop.
            </p>
        </Card>
    );
};

// default export let's us use the component in another file even if we do not know its name
export default Home;