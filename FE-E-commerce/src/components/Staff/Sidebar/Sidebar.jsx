import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import './Sidebar.scss';

const StaffSidebar = () => {
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
          <Link to="/staff/orders">
            <ShoppingCartOutlined /> Quản lý đơn hàng
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/staff/customer_consulting">
            <UserOutlined /> Tư vấn khách hàng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StaffSidebar;