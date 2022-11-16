import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export function Header(){

    return (
        <div className="header">
             <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Rent A Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to='/cars'> Cars</Link>
            <Link className='nav-link' to='/customers'> Customers</Link>
            <Link className='nav-link' to='/rentals'> Rentals</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
    );
}