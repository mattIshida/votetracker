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
                <Modal.Body>
                    <div>
                        <strong>What is VoteTracker?</strong>
                        <p>A simple web app for visualizing votes in the US congress</p>
                    </div>
                    <div>
                        <strong>How do I use it?</strong>
                        <ul>
                            <li>"Yes" votes are green; "No" votes are red</li>
                            <li>Gray/white shading indicates consecutive votes on the same bill</li>
                            <li>Hover over each vote to see more details
                                <div style={{textAlign: 'center'}}>
                                    <img src="/votetracker_hover.jpg" alt="an example of detailed vote info" height="300px"/>
                                </div>

                            </li>
                            <li>Click "Show similar votes" to see who voted the same way</li>
                            <li>Use "Highlight by Alignment" to highlight atypical votes
                                <div style={{textAlign: 'center'}}>
                                    <img src="/votetracker_highlight.jpg" alt="an example of highlighted votes" height="50px"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>Credits</strong>
                        <ul>
                            <li>Data is refreshed daily from the <a href="https://projects.propublica.org/api-docs/congress-api" target="_blank">ProPublica Congress API</a></li>
                            <li>App by <a href="https://github.com/mattIshida" target="_blank">@mattIshida</a></li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default NavBar;