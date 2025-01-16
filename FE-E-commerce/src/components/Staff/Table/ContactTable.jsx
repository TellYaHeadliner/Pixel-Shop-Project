import { Table, Button, Flex, message } from "antd";
import { useState, useEffect } from "react";

import UpdateContact from "../PopConfirm/UpdateContact";
import ConfirmDeleteContact from "../Modal/ConfirmDeleteContact";
import lienHeService from "../../../services/lienHeService";


const ContactTable = ({ data }) => {   
    const [selectedContact, setSelectedContact] = useState(null);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);

    useEffect(() => {
    },[selectedContact])

    const columns = [
      {
        title: "ID liên hệ",
        dataIndex: "idLienHe",
        key: "idLienHe",
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
        title: "Thời gian",
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
              <Button color="danger" variant="solid"  onClick={() => handleDelete(record)}>
                Xoá liên hệ
              </Button>
              <UpdateContact onConfirm={() => handleUpdate(record)}/>
            </Flex>
          </>
        ),
      },
    ];

    const handleUpdate = async (record) => {
      try {
        const updateTrangThai = !record.trangThai
        console.log(record.idLienHe, updateTrangThai);
        const response = await lienHeService.updateStatusLienHe(
          record.idLienHe,
          updateTrangThai
        );
        if (response.data.success == true){
          message.success("Cập nhật trạng thái thành công, trong 5 giây trang web sẽ reload lại !");
          setInterval(() => {
            window.location.reload();
          }, 5000);
        }
      } catch (error) {
        message.error(error.message);
      }
    }



    const handleDelete = (record) => {
      setSelectedContact(record)
      setIsConfirmDelete(true);
    }

    const confirmDelete = async () => {
      try {
        const response = await lienHeService.deleteLienHe(selectedContact.idLienHe);
        if (response.data.success){
          message.success("Xoá liên hệ thành công!");
          window.location.reload();
        }
      } catch (error) {
        message.error(error.message);
      }
    }


    const handleCancel = () => {
      setIsConfirmDelete(false);
    };


    return (
      <>
        <Table columns={columns} dataSource={data} rowKey="id" bordered />
        {selectedContact && (
          <>
          <ConfirmDeleteContact
            onDelete={confirmDelete}
            onCancel={handleCancel}
            open={isConfirmDelete}
          />
          </>
        )}
      </>
    );
}

export default ContactTable;