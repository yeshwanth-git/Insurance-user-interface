import * as React from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'

const Header = (props) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#/">Insurance Module</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#addUser">Add User</Nav.Link>
                        <Nav.Link href="#addEvent">Add event</Nav.Link>
                        <Nav.Link href="#users">All Users</Nav.Link>
                        <Nav.Link href="#userEvents">Insurance Events</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.children}
        </>
    );
}

export default Header;