import { Modal, Table, Descriptions, Button } from "antd";
import { useState } from "react";

import Star from "../../Client/Descriptions/Star"

const DetailComment = ({ comment, open, onCancel, onDelete }) => {
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
          <Button key="delete" type="primary" danger onClick={onDelete}>
            Xóa bình luận
          </Button>,
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên sản phẩm">{comment?.productName}</Descriptions.Item>
          <Descriptions.Item label="Số sao">
            <Star rating={comment?.stars} />
            </Descriptions.Item>
          <Descriptions.Item label="Tên người dùng">
            {comment?.commenterName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bình luận">
            {comment?.commentDate}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {comment?.content}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default DetailComment;
