import { Button } from "antd"

const ButtonSearchContact = ({ onClick} ) => {
    return (
      <Button type="primary" onClick={onClick} style={{ marginLeft: "20px" }}>
        Tìm kiếm
      </Button>
    );
}

export default ButtonSearchContact;