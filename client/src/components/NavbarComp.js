import React, { Component } from "react"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



export default class NavbarComp extends Component {

    render() {
        return (
          <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">FauxFinder</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Manufacturer</Nav.Link>
              <Nav.Link href="#pricing">Products</Nav.Link>
            </Nav>
            <Navbar.Text>
            Signed in as: <a>PLACEHOLDER</a>
          </Navbar.Text>
          </Container>
        </Navbar>
        )
    }
}