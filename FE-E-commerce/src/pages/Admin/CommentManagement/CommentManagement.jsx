import { useState } from 'react';
import { Row, Col, Card, Input, Button, Typography } from 'antd';
import './CommentManagement.scss';
import DetailComment from '../../../components/Staff/Modal/DetailComment';

const { Search } = Input;
const { Title } = Typography;

const CommentManagement = () => {
    const [searchParams, setSearchParams] = useState({
        date: '',
        stars: '',
    });

    const [comments, setComments] = useState([
        {
            productName: 'Sản phẩm A',
            stars: 5,
            commenterName: 'Người dùng 1',
            commentDate: '2024-01-01',
            content: 'Bình luận rất tốt!',
        },
        {
            productName: 'Sản phẩm B',
            stars: 4,
            commenterName: 'Người dùng 2',
            commentDate: '2024-01-02',
            content: 'Hài lòng với sản phẩm.',
        },
    ]);
    // Cái này dành cho bình luận 1 cái, lấy giá trị
    const [comment, setComment] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = () => {
        console.log('Tìm kiếm với:', searchParams);
    };

    const handleOpen = (comment) => {
        setComment(comment);
        setIsOpen(true);
    }

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleDelete = (comment) => {
        setIsOpen(false);
        setComment(comment)
        const updatedComments = comments.filter((item) => item !== comment);
        setComments(updatedComments);
    }

    return (
        <div className='comment-management'>
            <Title level={2} style={{ textAlign: 'left' }}>Quản lý bình luận</Title>
            <hr />
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={8}>
                    <Search
                        placeholder='Tìm kiếm bình luận'
                        onSearch={handleSearch}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        type='date'
                        name='date'
                        value={searchParams.date}
                        onChange={handleChange}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        type='number'
                        name='stars'
                        value={searchParams.stars}
                        onChange={handleChange}
                        placeholder='Số sao'
                        min='1'
                        max='5'
                    />
                </Col>
            </Row>

            <div className='comments-list'>
                <Title level={3}>Danh sách bình luận</Title>
                {comments.map((comment, index) => (
                    <Card className='comment-item' key={index} style={{ marginBottom: '15px' }}>
                        <div className='comment-header'>
                            <div className='comment-info'>
                                <Title level={4} className='comment-product'>{comment.productName}</Title>
                                <div className='comment-details'>
                                    <span className='stars'>Số sao: {comment.stars}</span>
                                    <span className='date'>Ngày: {comment.commentDate}</span>
                                </div>
                            </div>
                            <div className='comment-content'>
                                <span className='commenter'>Tên: {comment.commenterName}</span>
                                <p>Nội dung: {comment.content}</p>
                            </div>
                            <Button onClick={() => handleOpen(comment)}>
                                Xem chi tiết
                            </Button>
                            <DetailComment
                                comment={comment}
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