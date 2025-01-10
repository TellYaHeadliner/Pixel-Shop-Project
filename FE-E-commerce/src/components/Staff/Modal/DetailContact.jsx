import { Modal, Table, Descriptions, Button } from "antd";
import { useState } from "react";

const DetailContact = ({ contact, open, onCancel, onDelete }) => {
  return (
    <>
      <Modal
        title="Chi tiết thông tin liên lạc"
        open={open}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Đóng
          </Button>,
          <Button key="delete" type="primary" danger onClick={onDelete}>
            Xóa liên hệ
          </Button>,
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên">{contact?.hoVaTen}</Descriptions.Item>
          <Descriptions.Item label="Email">{contact?.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {contact?.sdt}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {contact?.noiDung}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default DetailContact;
