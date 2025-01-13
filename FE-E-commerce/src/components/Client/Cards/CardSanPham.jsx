import { Card, Flex, Button } from "antd";
function SanPhamCard({ tenSanPham, hang, gia, img, slug }) {
  const formattedPrice = `${gia.toLocaleString()} VND`
  const linkImg = `http://127.0.0.1:8000/imgs/` + img;
  const link = `http://127.0.0.1:5173/product/` + slug;
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
