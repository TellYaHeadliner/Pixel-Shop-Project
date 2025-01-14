import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Cookies from 'js-cookie';
import './Sidebar.scss';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const showLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };

    const handleLogout = () => {
        // Clear the cookies
        Cookies.remove('user');
        Cookies.remove('token');
        Cookies.remove('laravel_session');
        Cookies.remove('XSRF-TOKEN');

        // Redirect to the homepage
        navigate('/');
    };

    const handleCancel = () => {
        setIsLogoutModalVisible(false);
    };

    const handleConfirmLogout = () => {
        handleLogout();
        setIsLogoutModalVisible(false);
    };

    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-avatar">
            <img src="/imgs/admin-avatar.png" alt="Admin" />
          </div>
          <h3 className="sidebar-admin-name">Admin Name</h3>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <Link to="/admin">
              <DashboardOutlined /> Quản lý thông tin trang web
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/suppliers">
              <ShoppingCartOutlined /> Quản lý nhà cung cấp
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/categories">
              <UserOutlined /> Quản lý danh mục
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/products">
              <SettingOutlined /> Quản lý sản phẩm
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/batches">
              <SettingOutlined /> Quản lý lô hàng
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/comments">
              <SettingOutlined /> Quản lý bình luận
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/audience-statistics">
              <SettingOutlined /> Thống kê đối tượng
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/order-statistics">
              <SettingOutlined /> Thống kê đơn hàng
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/contact">
              <SettingOutlined /> Quản lý liên hệ
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/admin/business-statistics">
              <SettingOutlined /> Thống kê doanh thu
            </Link>
          </li>
          <li className="sidebar-menu-item" onClick={showLogoutModal} style={{ cursor: 'pointer' }}>
            <a>
            <LogoutOutlined /> Đăng xuất
            </a>
          </li>
        </ul>

        <Modal
          title="Xác nhận đăng xuất"
          visible={isLogoutModalVisible}
          onOk={handleConfirmLogout}
          onCancel={handleCancel}
          okText="Có"
          cancelText="Không"
        >
          <p>Bạn có chắc chắn muốn đăng xuất không?</p>
        </Modal>
      </div>
    );
};

export default Sidebar;