import { AiOutlineStar } from "react-icons/ai";
import { Typography } from "antd";

const { Title } = Typography;

const StarDetail = ({ rating }) => {
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
      <AiOutlineStar style={{ fontSize: "30px"}}/>
    </div>
  );
};

export default StarDetail;
