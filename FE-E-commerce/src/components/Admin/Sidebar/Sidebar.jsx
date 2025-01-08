import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import './Sidebar.scss';

const Sidebar = () => {
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
        </ul>
      </div>
    );
};

export default Sidebar;