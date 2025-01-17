import { useState, useEffect } from "react";

import { Row, Col, Typography, Flex } from "antd";

const { Title } = Typography;

import ContactTable from "../../../components/Staff/Table/ContactTable";
import lienHeService from "../../../services/lienHeService";
import SearchContact from "../../../components/Client/Search/SearchContact";
import ButtonSearchContact from "../../../components/Staff/Button/ButtonSearchContact";


const StaffContact = () => {
  const [data, setData] = useState([]);
  const [searchContact, setSearchContact] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    document.title = "Staff - Trang liên hệ"
    const fetchLienHe = async () => {
      try {
        const response = await lienHeService.getListLienHe;
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLienHe();

  },[]);

  const handleSearchContact = () => {
    const findData = data.filter((contact) =>
      contact.hoVaTen.toLowerCase().includes(searchContact.toLowerCase())
    );
    setFilteredData(findData)
  }

  return (
    <Row gutter={[16, 16]} style={{ margin: "20px" }}>
      <Col span={24}>
        <Title level={2}>Tìm kiếm liên hệ</Title>
      </Col>
      <Flex align="center" gap="middle" justify="flex-start">
        <Col span={24}>
          <SearchContact searchContact={searchContact} onSearchChange={setSearchContact}/>
          <ButtonSearchContact onClick={handleSearchContact}  />
        </Col>
      </Flex>
      <Col span={24}>
        <ContactTable data={filteredData} setData={setData} />
      </Col>
    </Row>
  );
};

export default StaffContact;
