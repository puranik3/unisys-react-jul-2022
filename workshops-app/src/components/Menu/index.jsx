import { Navbar, Container, Nav, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import ThemeContext from "../../context/ThemeContext";

const Menu = () => {
    const { theme, toggleTheme } = useContext( ThemeContext );

    const activeClassName = "active";

    return (
        <Navbar variant={theme} bg={theme}>
            <Container>
                {/* NavLink will apply a CSS class "active" on the link whose "to" matches the current URL path */}

                {/* Use "active" prop to avoid applying "active" CSS class when URL path is /workshops (for eg.) */}

                {/* If the active class name is different from "active" then use activeClassName prop to set it */}
                <Navbar.Brand
                    to="/"
                    as={NavLink}
                    exact
                    activeClassName={activeClassName}
                >
                    Home
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        to={{ pathname: "/workshops", search: "?start=2" }}
                        as={NavLink}
                    >
                        List of workshops
                    </Nav.Link>
                    <Nav.Link to="/feedback" as={NavLink}>
                        Feedback
                    </Nav.Link>
                </Nav>
                <Nav>
                    <ToggleButtonGroup
                        type="radio"
                        defaultValue={"light"}
                        className="mb-2"
                        name="tbg-theme"
                        onChange={value => toggleTheme( value )}
                    >
                        <ToggleButton id="tbg-light" value="light">
                            Light
                        </ToggleButton>
                        <ToggleButton id="tbg-dark" value="dark">
                            Dark
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Menu;
