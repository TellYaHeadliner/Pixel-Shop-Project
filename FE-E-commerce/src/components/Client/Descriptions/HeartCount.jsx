import { AiOutlineHeart } from "react-icons/ai";
import { Typography } from "antd";

const { Title } = Typography;

const HeartCount = ({ rating }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        marginRight: "16px",
      }}
    >
      <Title level={2} style={{ margin: 0, marginRight: "8px" }}>
        {rating}
      </Title>
      <AiOutlineHeart style={{ fontSize: "30px" }} />
    </div>
  );
};

export default HeartCount;