import { Row, Col, Layout, Typography, Card, Flex } from "antd";
import { AiOutlineCheck } from "react-icons/ai";
import { useState, useEffect } from "react";

import SanPhamNav from "../../../components/Client/Button/SanPhamNav";
import SanPhamCard from "../../../components/Client/Cards/CardSanPham";
import "./Home.scss";
import SlideShowAds from "../../../components/Client/Slideshow/SlideShowAds";
import SlideShowProducts from "../../../components/Client/Slideshow/SlideShowProducts";
import CardSanPham from "../../../components/Client/Cards/CardSanPham";

const { Content } = Layout;
const { Paragraph, Title, Text } = Typography;

import productsService from "../../../services/productsService";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [listLaptop, setListLaptop] = useState([]);
  const [bestSellerList, setBestSellerList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlideShow = (current) => {
    setCurrentSlide(current);
  };

  useEffect(() => {
    document.title = "Trang chủ Pixel Shop";
    const fetchProducts = async () => {
      try {
        const response = await productsService.getListNewProducts;
        if (response && response.data && response.data.data.listSanPham) {
          setNewProducts(response.data.data?.listSanPham);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    console.log(newProducts);
    fetchProducts();
  }, [newProducts]);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await productsService.getListLaptop;
        if (response && response.data && response.data.data) {
          setListLaptop(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };
    fetchLaptops();
    console.log(listLaptop);
  }, [listLaptop]);

  useEffect(() => {
    const fetchBestProductList = async () => {
      try {
        const response = await productsService.getListBestSellingProducts;
        setBestSellerList(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBestProductList();
    console.log(bestSellerList);
  }, [bestSellerList]);

  return (
    <Layout className="user-home-layout">
      <Content
        className="user-home-content"
        style={{
          imageRendering: "optimizeQuality",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={14}>
            <SlideShowAds
              linkImg="/imgs/slideshow1.png"
              width="100%"
              height="300px"
            />
          </Col>
          <Col xs={24} md={10}>
            <Flex gap="middle" vertical>
              <SlideShowAds
                linkImg="/imgs/slideshow2.png"
                width="100%"
                height="50%"
              />
              <SlideShowAds
                linkImg="/imgs/slideshow3.png"
                width="100%"
                height="50%"
              />
            </Flex>
          </Col>
        </Row>

        <div className="mt-3">
          <SanPhamNav
            title="Sản phẩm mới"
          />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {newProducts.map((product, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <CardSanPham
                tenSanPham={product?.tenSanPham}
                hang={product?.hang}
                gia={product?.gia}
                img={product?.img}
                slug={product?.slug}
              />
            </Col>
          ))}
        </Row>

        <div className="mt-3">
          <SanPhamNav
            title="Sản phẩm bán chạy"
            onNext={() => handleNextSlideShow((currentSlide + 1) % 3)}
          />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {bestSellerList.map((product, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <CardSanPham
                tenSanPham={product?.tenSanPham}
                hang={product?.hang}
                gia={product?.gia}
                img={product?.img}
                slug={product?.slug}
              />
            </Col>
          ))}
        </Row>

        <div className="mt-3">
          <SanPhamNav
            title="Laptop"
          />
        </div>
        <Row gutter={[16, 16]} className="mt-3">
          {listLaptop.map((product, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <CardSanPham
                tenSanPham={product?.tenSanPham}
                hang={product?.hang}
                gia={product?.gia}
                img={product?.img}
                slug={product?.slug}
              />
            </Col>
          ))}
        </Row>

        <div className="mt-3">
          <Card
            title="Dịch vụ bán hàng và vận chuyển"
            style={{ margin: "16px 0" }}
          >
            <Title level={4}>Giới thiệu</Title>
            <Paragraph>
              Chào mừng bạn đến với trang thông tin về dịch vụ bán hàng và dịch
              vụ vận chuyển. Chúng tôi cam kết mang đến cho bạn những trải
              nghiệm tốt nhất từ việc chọn lựa sản phẩm cho đến khi hàng hóa
              được giao đến tay bạn.
            </Paragraph>
            <Title level={4}>Dịch Vụ bán hàng</Title>
            <ul style={{ listStyle: "none" }}>
              <li>
                <AiOutlineCheck />
                <Text strong> Sản phẩm chất lượng cao: </Text>
                <Text>
                  Chúng tôi chỉ cung cấp những sản phẩm được kiểm định chất
                  lượng.
                </Text>
              </li>
              <li>
                <AiOutlineCheck />
                <Text strong> Giá cả cạnh tranh: </Text>
                <Text>
                  Mức giá hợp lý và nhiều chương trình khuyến mãi hấp dẫn.
                </Text>
              </li>
              <li>
                <AiOutlineCheck />
                <Text strong> Đội ngũ tư vấn chuyên nghiệp: </Text>
                <Text>Luôn sẵn sàng hỗ trợ bạn 24/7.</Text>
              </li>
            </ul>
            <Title level={4}>Quy trình mua hàng</Title>
            <ol>
              <li>
                <Text strong>Chọn sản phẩm: </Text>
                Duyệt qua danh mục sản phẩm trên website.
              </li>
              <li>
                <Text strong>Thêm vào giỏ hàng: </Text>
                Nhấn vào nút &quot;Mua Ngay&quot; hoặc &quot;Thêm vào Giỏ
                Hàng&quot;.
              </li>
              <li>
                <Text strong>Thanh toán: </Text>
                Lựa chọn phương thức thanh toán phù hợp (thẻ tín dụng, chuyển
                khoản, ví điện tử).
              </li>
            </ol>
            <Title level={4}>Dịch Vụ vận chuyển</Title>
            <ol>
              <Title level={5}>
                <li>Lựa chọn vận chuyển</li>
              </Title>
              <ul>
                <li>Giao hàng tiêu chuẩn: Thời gian từ 3-5 ngày làm việc.</li>
                <li>Giao hàng nhanh: Nhận hàng trong vòng 24-48 giờ.</li>
                <li>
                  Giao hàng siêu tốc: Áp dụng tại các thành phố lớn, trong vòng
                  2-4 giờ.
                </li>
              </ul>
              <Title level={5}>
                <li>Chính sách vận chuyển</li>
              </Title>
              <ul>
                <li>
                  <Text strong> Miễn phí vận chuyển: </Text>
                  Với đơn hàng từ 500,000 VNĐ trở lên.
                </li>
                <li>
                  <Text strong> Kiểm tra hàng trước khi nhận: </Text>
                  Khách hàng có thể mở hộp kiểm tra trước khi thanh toán.
                </li>
                <li>
                  <Text strong> Theo dõi đơn hàng: </Text>
                  Cung cấp mã vận đơn để khách hàng tự theo dõi tình trạng giao
                  hàng.
                </li>
              </ul>
              <Title level={5}>
                <li>Khu Vực Hoạt Động</li>
              </Title>
              <ul>
                <li>
                  Hiện tại, chúng tôi hỗ trợ giao hàng toàn quốc, bao gồm các
                  tỉnh thành và khu vực hẻo lánh.
                </li>
              </ul>
            </ol>
            <Title level={4}>Hỗ Trợ Khách Hàng</Title>
            <ul>
              <li>Hotline: 1800-123-456</li>
              <li>Email: hotro@dichvu.vn</li>
              <li>
                Trung tâm hỗ trợ: Địa chỉ cửa hàng hoặc văn phòng đại diện tại
                các thành phố lớn.
              </li>
            </ul>
            <Title level={4}>Cam kết của chúng tôi</Title>
            <ul>
              <li>Đúng sản phẩm, đúng chất lượng.</li>
              <li>Giao hàng nhanh chóng, tiện lợi.</li>
              <li>Đổi trả dễ dàng trong vòng 7 ngày.</li>
            </ul>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
