import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const items = [
    {
      key: '/profile',
      label: 'Thông tin',
    },
    {
        key: '/profile/locations',
        label: 'Địa chỉ',
    },
    {
        key: '/profile/changepassword',
        label: 'Đổi mật khẩu',
    },
    {
      key: '/profile/order',
      label: 'Đơn hàng',
      children: [
        {
          key: '/profile/orderpendingconfirm',
          label: 'Chờ xác nhận',
        },
        {
          key: '/profile/orderbeingship',
          label: 'Đang vận chuyển',
        },
        {
          key: '/profile/orderreceived',
          label: 'Đã nhận',
        },
        {
          key: '/profile/ordercanceled',
          label: 'Đã hủy',
        },
      ],
    },
    {
        key: '/profile/productloved',
        label: 'Sản phẩm yêu thích',
    },
    {
        key: '/profile/productrated',
        label: 'Sản phẩm đã đánh giá',
    }
  ];
  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(items);

export default function ProfileLayout (){
    const navigate = useNavigate();
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
        const repeatIndex = openKeys
            .filter((key) => key !== currentOpenKey)
            .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
        setStateOpenKeys(
            openKeys
            // remove repeat key
            .filter((_, index) => index !== repeatIndex)
            // remove current level all child
            .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
        } else {
        // close
        setStateOpenKeys(openKeys);
        }
    };
    const onMenuClick = (e) => {
        navigate(e.key); // Điều hướng đến đường dẫn từ key của menu
      };
    return (
        <div className="d-flex">
            <div>
                <div className="d-flex" style={{margin:10}}>  
                    <Space wrap size={16}>
                        <Avatar size={65} icon={<UserOutlined />} />
                    </Space>
                    <div style={{marginTop:20, marginLeft:15}}><p>User</p></div>
                </div>
                
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['231']}
                    openKeys={stateOpenKeys}
                    onOpenChange={onOpenChange}
                    onClick={onMenuClick}
                    style={{
                        width: 256,
                        fontSize: 20,
                        marginTop:30,
                    }}
                    items={items}
                />
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}