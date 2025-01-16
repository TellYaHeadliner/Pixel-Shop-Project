import { Modal, Table, Descriptions, Button, message, Input } from "antd";
import { useState } from "react";

import Star from "../../Client/Descriptions/Star"


const DetailComment = ({ comment, open, onCancel, onDelete }) => {
  const [confirmationText, setConfirmationText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const confirmationWord = "Xác nhận";

  const handleDelete = () => {
    if (confirmationText === confirmationWord){
      onDelete();
    }
    else {
      messageApi.error(`Vui lòng gõ đúng chữ "${confirmationWord}"`);
    }
  }
  return (
    <>
      <Modal
        title="Chi tiết bình luận"
        open={open}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Đóng
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Xóa bình luận
          </Button>,
        ]}
      >
        {contextHolder}
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên sản phẩm">
            {comment?.tenSanPham}
          </Descriptions.Item>
          <Descriptions.Item label="Số sao">
            <Star rating={comment?.soSao} />
          </Descriptions.Item>
          <Descriptions.Item label="Tên người dùng">
            {comment?.hoVaTen}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bình luận">
            {comment?.ngayGio}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {comment?.noiDung}
          </Descriptions.Item>
        </Descriptions>
        <p style={{ marginTop: 16 }}>
          Hãy gõ chữ &quot;Xác nhận&quot; để xóa bình luận
        </p>
        <Input
          placeholder={`Gõ "${confirmationWord}" để xác nhận`}
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          style={{ marginTop: 8 }}
        />
      </Modal>
    </>
  );
};

export default DetailComment;
