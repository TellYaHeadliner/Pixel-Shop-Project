import React, { useState } from 'react';
import './CommentManagement.scss';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = () => {
        console.log('Tìm kiếm với:', searchParams);
    };

    return (
        <div>
            <h2>Quản lý bình luận</h2>
            <div className='search-container'>
                <input
                    type="text"
                    name='fine-search'
                    placeholder='Tìm kiếm '
                />
                <input
                    type='date'
                    name='date'
                    value={searchParams.date}
                    onChange={handleChange}
                    placeholder='Ngày đăng'
                />
                <input
                    type='number'
                    name='stars'
                    value={searchParams.stars}
                    onChange={handleChange}
                    placeholder='Số sao'
                    min='1'
                    max='5'
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <hr />
            <div className='comments-list'>
                <h3>Danh sách bình luận</h3>
                {comments.map((comment, index) => (
                    <div className='comment-item' key={index}>
                        <h4>{comment.productName}</h4>
                        <p>Số sao: {comment.stars}</p>
                        <p>Tên người bình luận: {comment.commenterName}</p>
                        <p>Ngày bình luận: {comment.commentDate}</p>
                        <p>Nội dung: {comment.content}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentManagement;