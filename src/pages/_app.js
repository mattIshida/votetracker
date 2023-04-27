import 'components/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
  return (
    <Container className="Board sm-col-10 md-col-8 col-lg-6 xl-col-4 my-3">
      <Component {...pageProps} />
    </Container>
    ) 
}
