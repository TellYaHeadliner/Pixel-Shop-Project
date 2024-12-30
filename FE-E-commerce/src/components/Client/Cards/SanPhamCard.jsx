import { Card } from "react-bootstrap";
import { BsStar } from "react-icons/bs";

function SanPhamCard() {
  return (
    <Card style={{ backgroundColor: "#9370DB", width: "431px" }} className="text-white">
      <Card.Img
        variant="top"
        src="/public/imgs/product.png"
        className="w-30 h-30"
      />
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
