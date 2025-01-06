import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./ProfileLayout.scss";

const items = [
  {
    key: "userInfo",
    disabled: true,
  },
  {
    key: "/profile",
    label: "Thông tin",
  },
  {
    key: "/profile/locations",
    label: "Địa chỉ",
  },
  {
    key: "/profile/changepassword",
    label: "Đổi mật khẩu",
  },
  {
    key: "/profile/order",
    label: "Đơn hàng",
    children: [
      {
        key: "/profile/orderpendingconfirm",
        label: "Chờ xác nhận",
      },
      {
        key: "/profile/orderbeingship",
        label: "Đang vận chuyển",
      },
      {
        key: "/profile/orderreceived",
        label: "Đã nhận",
      },
      {
        key: "/profile/ordercanceled",
        label: "Đã hủy",
      },
    ],
  },
  {
    key: "/profile/productloved",
    label: "Sản phẩm yêu thích",
  },
  {
    key: "/profile/productrated",
    label: "Sản phẩm đã đánh giá",
  },
];

export default function ProfileLayout() {
  const navigate = useNavigate();
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = {
      name: "John Doe", // Thay bằng dữ liệu thực tế từ API
    };
    setUserName(userData.name);
  }, []);

  const modifiedItems = items.map((item) => {
    if (item.key === "userInfo") {
      return {
        ...item,
        label: (
          <div className="label">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ marginRight: 10 }}
            />
            <span>{userName || "Tài khoản"}</span>
          </div>
        ),
      };
    }
    return item;
  });

  const onOpenChange = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  const onMenuClick = (e) => {
    if (e.key !== "userInfo") {
      navigate(e.key);
    }
  };

  return (
    <div className="d-flex">
      <div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["/profile"]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          onClick={onMenuClick}
          className="menu"
          items={modifiedItems}
        />
      </div>
      <div style={{ marginLeft: 25 }}>
        <Outlet />
      </div>
    </div>
  );
}
