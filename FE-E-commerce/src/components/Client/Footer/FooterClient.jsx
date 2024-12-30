import { Container, Row, Col } from "react-bootstrap";

// import styles from "./FooterClient.module.css"
const Footer = () => (
  <Container fluid className={`styles.footerClient`}>
    <Row>
        <Col md={6}>
            <img src="/imgs/logo.png" alt="" />
        </Col>
    </Row>
  </Container>
);

export default Footer;
