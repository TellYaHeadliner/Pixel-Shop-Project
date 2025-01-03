import { Card, Flex, Button } from "antd";

function SanPhamCard() {
  return (
    <Card
      bordered
      title="LAPTOP GAMING MAX "
      extra="HP"
      style={{ width: "500", height: "400" }}
    >
      <img src="/imgs/product_2.png" alt="product_2.png" style={{width: "100%"}} />
      <Flex justify="space-between" align="flex-end" style={{ marginTop: "2rem" }}>
        <h3>9,999,999 vnđ</h3>
        <Button>Chi tiết</Button>
      </Flex>
    </Card>
  );
}

export default SanPhamCard;
