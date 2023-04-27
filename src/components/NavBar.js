// import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

function NavBar({ userId }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand  exact to="/">VoteTracker</Navbar.Brand>
                <Nav>
                    <Nav.Link  exact to='/'>Home</Nav.Link>
                    <Nav.Link  to='/legislators'>Legislators</Nav.Link >
                    <Nav.Link  to='/bills'>Bills</Nav.Link >
                    <Nav.Link  to='/issues'>Issues</Nav.Link >
                    <Nav.Link  to={`/users/${userId}`}>MyVoteTracker</Nav.Link >
                    <Nav.Link   to='/about'>About</Nav.Link >
                </Nav>
            </Container>
            
        </Navbar>
        // <nav className='nav'>
            
        // </nav>
    )
}
export default NavBar;