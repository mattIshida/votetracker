import 'components/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import NavBar from 'components/components/NavBar';
export default function App({ Component, pageProps }) {

  
  return (
    <>
    
    <NavBar />
    <Container className="Board sm-col-10 md-col-8 col-lg-6 xl-col-4 my-3">
      <Component {...pageProps} />
    </Container>
  </>  
  ) 
}
