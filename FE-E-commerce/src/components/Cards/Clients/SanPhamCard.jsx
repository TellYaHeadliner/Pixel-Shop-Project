import { Card, Container, Row, Col } from "react-bootstrap";
import { BsStar } from "react-icons/bs";

import styles from "./SanPhamCard.module.css";

function SanPhamCard() {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src="/public/imgs/product.png" className="w-50 h-50"/>
      <Card.Body>
        <Card.Title>9,999,999đ</Card.Title>
        <Card.Title>LAPTOP GAMING MAX</Card.Title>
        <Card.Text>HP</Card.Text>
        <Card.Text>
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SanPhamCard;
