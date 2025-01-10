import { AiOutlineEye } from "react-icons/ai";
import { Typography } from "antd";

const { Title } = Typography;

const ViewCount = ({ rating }) => {
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
        {rating ? rating : 0 }
      </Title>
      <AiOutlineEye style={{ fontSize: "30px" }} />
    </div>
  );
};

export default ViewCount;
