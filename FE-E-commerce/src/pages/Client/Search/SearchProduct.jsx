import React, { useState, useEffect, useRef } from "react";
import { Form, Select, Button, Row, Col, Input, Tree, message } from "antd";
import CardSanPham from "../../../components/Client/Cards/CardSanPham";
import { EllipsisOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import './SearchProduct.scss';
const { Option } = Select;

export default function SearchProduct() {
  const navigate = useNavigate();
  const {categoriess,conditions,texts,pages} = useParams();
  const [SanPham, setSanPham] = useState([]); // Danh sách sản phẩm hiển thị
  const [filter, setFilter] = useState(""); // Lọc sản phẩm theo hãng
  const [condition, setCondition] = useState(parseInt(conditions, 10));
  const [count,setCount] = useState([]);
  const [text, setText] = useState(texts);

  const handleGetProduct = async ()=>{
    try{
        const response = await axios.post(
            'http://127.0.0.1:8000/api/getListSanPham',
            {idDanhMuc:categoriess,condition:conditions,text:text? texts.trim():"",page:pages,trangThai:1},
            {
                headers: {'Content-Type': 'application/json'},
            }
        )
        console.log(response.data.success);
        setSanPham(response.data.data);
        setCount(Array.from({ length: parseInt(response.data.count/12+1,10) }, (_, i) => i + 1));
    }catch(e){
        message.error(e.response.data.message);
    }
  };
  /////Danh mục
  const [form] = Form.useForm();
  const treeRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [selectedDanhMuc, setSelectedDanhMuc] = useState(null);
  const [treeVisible, setTreeVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const renderTree = (data) => {
        return data.map(cat => ({
            title: cat.tenDanhMuc,
            key: cat.idDanhMuc,
            children: cat.child.length > 0 ? renderTree(cat.child) : [],
        }));
  };
  const filterCategories = (data, term) => {
    return data.map(cat => {
            const matchedChildren = filterCategories(cat.child, term);
            if (cat.tenDanhMuc.toLowerCase().includes(term.toLowerCase()) || matchedChildren.length > 0) {
                return { ...cat, child: matchedChildren };
            }
            return null;
        })
        .filter(Boolean);
  };
  const filteredCategories = filterCategories(categories, searchTerm);
  
  const selectDanhMuc = (listDanhMuc,id)=>{
    for(let dm of listDanhMuc){
        if(dm.idDanhMuc == id)
            return {idDanhMuc:dm.idDanhMuc, tenDanhMuc:dm.tenDanhMuc};
        if(dm.child.length > 0){
            const result = selectDanhMuc(dm.child, id);
            if(result)
                return result;
        }
    }
    return null;
  };
  const handleClickOutside = (event) => {
    if (treeRef.current && !treeRef.current.contains(event.target)) {
        setTreeVisible(true);
    }
  };
  const getListDanhMuc = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/listDanhMuc');
        setCategories(response.data.data);
    } catch (e) {
        message.error("Lấy danh mục không thành công");
    }
  };
  useEffect(() => {
            
            form.setFieldsValue({ idDanhMuc: selectedDanhMuc ? selectedDanhMuc.tenDanhMuc : "" });
  }, [selectedDanhMuc]);
  /////////////
  useEffect(() => {
            console.log('us')
            document.addEventListener('mousedown', handleClickOutside);
            handleGetProduct();
            getListDanhMuc();
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
  }, [categoriess,conditions,texts,pages]);
  useEffect(() => {
    const selected = selectDanhMuc(categories,Number(categoriess));
            setSelectedDanhMuc(selected);
  },[categories])

  return (
    <div className="d-flex">
      {/* Sidebar tìm kiếm */}
      <div style={{ backgroundColor: "gray", width: "20%", padding: "10px" }}>

      <div className='d-flex'>
        <Form form = {form}>
            
            <Form.Item 
                name="idDanhMuc"
                label="Danh mục:"
                labelCol={{span: 10}}
                wrapperCol={{span:14}}
                className='col-12'
                >
                <Input readOnly/>
            </Form.Item>
        </Form>
        <div className='btnDanhMuc'>
            <Button onClick={()=>(
                setTreeVisible(!treeVisible)
            )}><EllipsisOutlined/></Button>
            <div className='treeDanhMuc' style={{ display: treeVisible ? 'none' : 'block'}} ref={treeRef}>
                <div className="view-section">
                    <Input
                            placeholder="Tìm kiếm danh mục"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ marginBottom: '20px' }}
                    />
                    <Tree
                            treeData={renderTree(filteredCategories)}
                            onSelect={(keys) => {
                                    const selected = selectDanhMuc(categories,Number(keys[0]));
                                    setSelectedDanhMuc(selected);
                            }}
                    />
                </div>
            </div>
        </div>
      </div>

        <span>Sắp xếp theo: </span>
        <Select
          style={{ width: "100%" }}
          placeholder="xắp xếp theo"
          onChange={(value)=>setCondition(value)}
          defaultValue= {parseInt(conditions??0,10)}
        >
          <Option value={0}>Mặc định</Option>
          <Option value={1}>Giá tăng tăng dần</Option>
          <Option value={2}>Giá giảm dần</Option>
          <Option value={3}>Mới nhất</Option>
          <Option value={4}>Cũ nhất</Option>
          <Option value={5}>Bán chạy nhất</Option>
          <Option value={6}>Ít lượt mua</Option>
        </Select>
        <Button type="primary" style={{ marginTop: "10px" }} onClick={() => navigate(`/searchproduct/${selectedDanhMuc?.idDanhMuc ?? 0}/${texts??" "}/${condition??0}/1`)}>
          Áp dụng
        </Button>
      </div>

  
      <div style={{ flex: 1, width:'45%'}}>
        <Row gutter={[16, 16]} className="mt-3">
          {SanPham.map((product, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <CardSanPham
                tenSanPham={product?.tenSanPham}
                hang={product?.hang}
                gia={product?.gia}
                img={product?.img}
                slug={product?.slug}
           />
            </Col>
          ))}
        </Row>
        {SanPham.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>Không có sản phẩm nào!</p>
        )}
        <div className="d-flex justify-content-center w-100 mt-5" >
            <div>
                <nav>
                <Button disabled={pages == 1 || count.length==1}
                    onClick={() => navigate(`/searchproduct/${selectedDanhMuc?.idDanhMuc ?? 0}/${texts??" "}/${condition}/${parseInt(pages,10)-1}`)}
                >
                    {"<"}
                </Button>
                    {count.map((num) => (
                        <Button
                        key={num}
                        onClick={() => navigate(`/searchproduct/${selectedDanhMuc?.idDanhMuc ?? 0}/${texts??" "}/${condition}/${num}`)}
                        style={{ marginLeft: "5px" }}
                        type={pages == num || (pages==undefined && num==1)? "primary" : "default"}
                        >
                        {num}
                        </Button>
                    ))}
                    <Button style={{ marginLeft: "5px" }} disabled={pages == count[count.length-1] || count.length==1}
                        onClick={() => navigate(`/searchproduct/${selectedDanhMuc?.idDanhMuc ?? 0}/${texts??" "}/${condition}/${parseInt(pages,10)+1}`)}
                    >{">"}</Button>
                </nav>
            </div>
        </div>
      </div>
    </div>
  );
}
