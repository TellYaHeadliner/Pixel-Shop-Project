import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import './Sidebar.scss';
import Cookies from 'js-cookie';
const StaffSidebar = () => {
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
          <img src="/imgs/admin-avatar.png" alt="Staff" />
        </div>
        <h3 className="sidebar-staff-name">Staff Name</h3>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <Link to="/staff">
            <DashboardOutlined /> Quản lý liên hệ
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/staff/order-management">
            <ShoppingCartOutlined /> Quản lý đơn hàng
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/staff/customer_consulting">
            <UserOutlined /> Tư vấn khách hàng
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

export default StaffSidebar;