import { AiOutlineHeart } from "react-icons/ai";
import { Typography, message } from "antd";
import Cookies from "js-cookie"
import { useState, useEffect } from "react";

const { Title } = Typography;

const HeartCount = () => {
  const [messageAPI, contextHolder] = message.useMessage();
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const storedRating = localStorage.getItem("rating");
    if (storedRating) {
      setRating(Number(storedRating)); 
    }
  }, []);

  const handleHearClick = () => {
    const token = Cookies.get("token");
    if (token) {
      setRating((prevRating) => {
        const newRating = prevRating + 1;
        localStorage.setItem("rating", newRating); 
        return newRating;
      });
      messageAPI.success("Sản phẩm của bạn đã được yêu thích");
      setIsHovered(true)
    }
    else {
      messageAPI.warning("Bạn cần đăng nhập để yêu thích sản phẩm này")
      setIsHovered(false)
      return;
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        marginRight: "16px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleHearClick}
    >
      {contextHolder}
      <Title level={2} style={{ margin: 0, marginRight: "8px" }}>
        {rating ? rating : 0}
      </Title>
      <AiOutlineHeart
        style={{
          fontSize: "30px",
          color: isHovered ? "red" : "black", // Thay đổi màu khi hover
          transition: "color 0.3s", // Thêm hiệu ứng chuyển màu
        }}
      />
    </div>
  );
};

export default HeartCount;