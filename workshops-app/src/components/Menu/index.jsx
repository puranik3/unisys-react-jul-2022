import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeClassName = 'active';

    return (
        <Navbar bg="light" variant="light">
            <Container>
                {/* NavLink will apply a CSS class "active" on the link whose "to" matches the current URL path */}

                {/* Use "active" prop to avoid applying "active" CSS class when URL path is /workshops (for eg.) */}

                {/* If the active class name is different from "active" then use activeClassName prop to set it */}
                <Navbar.Brand to="/" as={NavLink} exact activeClassName={activeClassName}>Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link to="/workshops" as={NavLink}>List of workshops</Nav.Link>
                    <Nav.Link to="/feedback" as={NavLink}>Feedback</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Menu;