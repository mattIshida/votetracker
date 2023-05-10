import { Navbar, Modal, Nav, Container, Button } from 'react-bootstrap'
import { useState } from 'react' 

function NavBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand style={{color: "white"}}>VoteTracker</Navbar.Brand>
                    <Nav><Nav.Link style={{color: "white"}} onClick={()=>setShow(true)}>About</Nav.Link></Nav>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Hover over vote tiles to see additional info</Modal.Body>
                <Modal.Body>Click "Show similar votes" to see who else voted the same way</Modal.Body>
                <Modal.Body>Built by Matt Ishida</Modal.Body>
                <Modal.Body>Data is refreshed daily from the ProPublica Congress API</Modal.Body>
            </Modal>
        </>
    )
}
export default NavBar;