import 'components/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
import NavBar from 'components/components/NavBar';
export default function App({ Component, pageProps }) {

  
  return (
    <>
    
    <NavBar />
    <Container className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-5 my-3">
      <Component {...pageProps} />
    </Container>
  </>  
  ) 
}
