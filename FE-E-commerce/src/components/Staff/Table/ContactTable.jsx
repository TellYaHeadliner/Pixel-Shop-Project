import { Table, Button, Flex, message } from "antd";
import { useState } from "react";

import UpdateContact from "../PopConfirm/UpdateContact";
import DetailContact from "../Modal/DetailContact";

/*
  `idLienHe` bigint NOT NULL,
  `hoVaTen` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `noiDung` text NOT NULL,
  `thoiGian` datetime NOT NULL,
  `trangThai` tinyint(1) NOT NULL
*/


const ContactTable = ({ data }) => {   
    const [contact, setContact] = useState(data)
    const [selectedContact, setSelectedContact] = useState(null);
    const [isDetailOpen, setIsOpenDetail] = useState(false);

    const columns = [
      {
        title: "ID liên hệ",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Họ và tên",
        dataIndex: "hoVaTen",
        key: "hoVaTen",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Số điện thoại",
        dataIndex: "sdt",
        key: "sdt",
      },
      {
        title: "Nội dung",
        dataIndex: "noiDung",
        key: "noiDung",
      },
      {
        title: "Thờii gian",
        dataIndex: "thoiGian",
        key: "thoiGian",
        render: (time) => <>{time.toLocaleString()}</>,
      },
      {
        title: "Trạng thái",
        dataIndex: "trangThai",
        key: "trangThai",
        render: (trangThai) => (trangThai ? "Đã xử lý" : "Chưa xử lý"),
      },
      {
        title: "Chức năng",
        key: "action",
        render: (_, record) => (
          <>
            <Flex justify="center" align="center" gap={10}>
              <Button onClick={() => handleShowDetail(record)}>
                Xem chi tiết
              </Button>
              <UpdateContact onConfirm={() => handleUpdate(record.id)}/>
            </Flex>
          </>
        ),
      },
    ];

    const handleUpdate = (id) => {
        const updateContact = contact.find(item => item.id === id);
        updateContact.trangThai = !updateContact.trangThai;;
        setContact([...contact]);
    }


    const handleShowDetail = (record) => {
      setSelectedContact(record)
      setIsOpenDetail(true);
    }

    const handleCloseDetail = () => {
      setIsOpenDetail(false);
    }

    const handleDelete = (id) => {
      const updatedContact = contact.filter((item) => item.id !== id);
      console.log(updatedContact);
      setContact(updatedContact);
      setIsOpenDetail(!isDetailOpen);
      message.success("Xóa thành công!");
    }

    return (
      <>
        <Table columns={columns} dataSource={contact} rowKey="id" bordered />
        {
          selectedContact && (
            <DetailContact
              contact={selectedContact}
              onCancel={handleCloseDetail}
              open={isDetailOpen}
              onDelete={() => handleDelete(selectedContact.id)}
            />
          )
        }
      </>
    );
}

export default ContactTable;