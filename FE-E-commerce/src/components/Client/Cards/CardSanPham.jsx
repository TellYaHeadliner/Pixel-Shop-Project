import { Card, Flex, Button } from "antd";
function SanPhamCard() {
  return (
    <Card
      bordered
      title="LAPTOP GAMING MAX "
      extra="HP"
      style={{
        margin: "0 20px 0 30px"
      }}
    >
      <img src="/imgs/product_2.png" alt="product_2.png" style={{ width: "90%" }} />
      <Flex justify="space-between" align="flex-end" style={{ marginTop: "2rem" }}>
        <h3>9,999,999 vnđ</h3>
        <Button>Chi tiết</Button>
      </Flex>
    </Card>
  );
}

export default SanPhamCard;
