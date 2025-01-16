import { useState } from "react";
import { Modal, Button, Input, message } from "antd";

const ConfirmDeleteContact = ({ open, onCancel, onDelete }) => {
  const [confirmationText, setConfirmationText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const confirmationWord = "Xác nhận"; 

  const handleDelete = () => {
    if (confirmationText === confirmationWord) {
      onDelete();
    } else {
      messageApi.error(`Vui lòng gõ đúng chữ "xác nhận" `);
    }
  }
  return (
    <Modal
      title="Xác nhận xóa liên hệ"
      onCancel={onCancel}
      open={open}
      footer={[
          <Button key="cancel" onClick={onCancel}>
            Đóng
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Xóa liên hệ
          </Button>,
        ]}
    >
      {contextHolder}
      <p>Hãy gõ chữ &quot;Xác nhận&quot; để xóa liên hệ này</p>
      <Input
        placeholder={`Gõ "${confirmationWord}" để xác nhận`}
        value={confirmationText}
        onChange={(e) => setConfirmationText(e.target.value)} 
      />
    </Modal>
  );
};

export default ConfirmDeleteContact;
