import { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Button, Typography, message } from 'antd';
import './CommentManagement.scss';
import DetailComment from '../../../components/Staff/Modal/DetailComment';
import danhGiaService from '../../../services/danhGiaService';

const { Search } = Input;
const { Title } = Typography;

const CommentManagement = () => {
    const [searchParams, setSearchParams] = useState({
        date: '',
        stars: '',
    });

    const [comments, setComments] = useState([

    ]);

    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await danhGiaService.getListDanhGia;
                setComments(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchComments();
    },[comments])

    // Cái này dành cho bình luận 1 cái, lấy giá trị
    const [commentDetail, setCommentDetail] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = () => {
        console.log('Tìm kiếm với:', searchParams);
    };

    const handleOpen = (comment) => {
        setCommentDetail(comment);
        setIsOpen(true);
    }

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleDelete = async (comment) => {
        setIsOpen(false);
        try {
            const response = await danhGiaService.deleteDanhGia(comment.idNguoiDung, comment.idSanPham)
            if (response.data.success == true) {
                messageApi.success("Đã xóa thành công bình luận ! Trang web sẽ reload lại !");
                setInterval(() => {
                    window.location.reload();
                }, 5000);
            }
        } catch (error) {
            messageApi.error(error.message);
        }
    }

    

    return (
      <div className="comment-management">
        {contextHolder}
        <Title level={2} style={{ textAlign: "left" }}>
          Quản lý bình luận
        </Title>
        <hr />
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Search placeholder="Tìm kiếm bình luận" onSearch={handleSearch} />
          </Col>
          <Col span={8}>
            <Input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleChange}
            />
          </Col>
          <Col span={8}>
            <Input
              type="number"
              name="stars"
              value={searchParams.stars}
              onChange={handleChange}
              placeholder="Số sao"
              min="1"
              max="5"
            />
          </Col>
        </Row>

        <div className="comments-list">
          <Title level={3}>Danh sách bình luận</Title>
          {comments.map((comment, index) => (
            <Card
              className="comment-item"
              key={index}
              style={{ marginBottom: "15px" }}
            >
              <div className="comment-header">
                <div className="comment-info">
                  <Title level={4} className="comment-product">
                    {comment.tenSanPham}
                  </Title>
                  <div className="comment-details">
                    <span className="stars">Số sao: {comment.soSao}</span>
                    <span className="date">Ngày: {comment.ngayGio}</span>
                  </div>
                </div>
                <div className="comment-content">
                  <span className="commenter">Tên: {comment.hoVaTen}</span>
                  <p>Nội dung: {comment.noiDung}</p>
                </div>
                <Button onClick={() => handleOpen(comment)}>
                  Xem chi tiết
                </Button>
                <DetailComment
                  comment={commentDetail}
                  open={isOpen}
                  onCancel={handleCancel}
                  onDelete={() => handleDelete(comment)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
};

export default CommentManagement;