import { Card, Flex, Button } from "antd";
function SanPhamCard({ tenSanPham, hang, gia, img, slug }) {
  const formattedPrice = `${gia} VND`
  const linkImg = `http://localhost:8000` + img;
  const link = `http://localhost:5173/` + slug;
  return (
    <Card
      bordered
      title={tenSanPham}
      extra={hang}
      style={{
        margin: "0 20px 0 30px"
      }}
    >
      <img src={linkImg} alt={linkImg} style={{ width: "100%", height:"300px", objectFit: "contain" }} />
      <Flex justify="space-between" align="flex-end" style={{ marginTop: "2rem" }}>
        <h3>{formattedPrice}</h3>
        <Button>
          <a href={link}>
            Chi tiết
          </a>
        </Button>
      </Flex>
    </Card>
  );
}

export default SanPhamCard;
