import React, { useState } from 'react';
import { Input, Button, Checkbox, Tree, Dropdown, Menu, Typography, Space } from 'antd';
import './CategoryManagement.scss';

const { Search } = Input;
const { Title } = Typography;

const CategoryManagement = () => {
    const initialCategories = [
        {
            "idDanhMuc": 1,
            "tenDanhMuc": "Điện thoại",
            "child": [
                {
                    "idDanhMuc": 3,
                    "tenDanhMuc": "Điện thoại 1",
                    "child": [
                        {
                            "idDanhMuc": 8,
                            "tenDanhMuc": "Điện Thoại 11",
                            "child": [
                                {
                                    "idDanhMuc": 15,
                                    "tenDanhMuc": "Điện Thoại 111",
                                    "child": [
                                        {
                                            "idDanhMuc": 20,
                                            "tenDanhMuc": "Điện Thoại 1111",
                                            "child": [
                                                {
                                                    "idDanhMuc": 25,
                                                    "tenDanhMuc": "Điện Thoại 11111",
                                                    "child": [
                                                        {
                                                            "idDanhMuc": 30,
                                                            "tenDanhMuc": "Điện Thoại 111111",
                                                            "child": [
                                                                {
                                                                    "idDanhMuc": 35,
                                                                    "tenDanhMuc": "Điện Thoại 1111111",
                                                                    "child": [
                                                                        {
                                                                            "idDanhMuc": 40,
                                                                            "tenDanhMuc": "Điện Thoại 11111111",
                                                                            "child": []
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "idDanhMuc": 9,
                                    "tenDanhMuc": "Điện Thoại 12",
                                    "child": []
                                }
                            ]
                        },
                        {
                            "idDanhMuc": 4,
                            "tenDanhMuc": "Điện thoại 2",
                            "child": []
                        },
                        {
                            "idDanhMuc": 5,
                            "tenDanhMuc": "Điện thoại 3",
                            "child": []
                        }
                    ]
                }
            ]
        },
        {
            "idDanhMuc": 2,
            "tenDanhMuc": "Laptop",
            "child": [
                {
                    "idDanhMuc": 6,
                    "tenDanhMuc": "Laptop 1",
                    "child": [
                        {
                            "idDanhMuc": 10,
                            "tenDanhMuc": "Laptop 11",
                            "child": [
                                {
                                    "idDanhMuc": 13,
                                    "tenDanhMuc": "Laptop 111",
                                    "child": []
                                },
                                {
                                    "idDanhMuc": 14,
                                    "tenDanhMuc": "Laptop 112",
                                    "child": []
                                }
                            ]
                        },
                        {
                            "idDanhMuc": 11,
                            "tenDanhMuc": "Laptop 12",
                            "child": []
                        },
                        {
                            "idDanhMuc": 12,
                            "tenDanhMuc": "Laptop 13",
                            "child": []
                        }
                    ]
                },
                {
                    "idDanhMuc": 7,
                    "tenDanhMuc": "Laptop 2",
                    "child": []
                }
            ]
        }
    ];

    const [categories, setCategories] = useState(initialCategories);
    const [categoryName, setCategoryName] = useState('');
    const [isSubcategory, setIsSubcategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    const addCategory = () => {
        if (categoryName) {
            const newCategory = {
                tenDanhMuc: categoryName,
                idDanhMuc: Date.now(),
                child: [],
            };
            if (isSubcategory && selectedCategory) {
                const updateCategories = (categoryList) => {
                    return categoryList.map(category => {
                        if (category.idDanhMuc === selectedCategory.idDanhMuc) {
                            return { ...category, child: [...(category.child || []), newCategory] };
                        }
                        if (category.child) {
                            category.child = updateCategories(category.child);
                        }
                        return category;
                    });
                };
                setCategories(updateCategories(categories));
            } else {
                setCategories([...categories, newCategory]);
            }
            setCategoryName('');
            setIsSubcategory(false);
        }
    };

    const deleteCategory = (id) => {
        const filterCategories = (categoryList) => {
            return categoryList.filter(category => {
                if (category.idDanhMuc === id) return false;
                if (category.child) {
                    category.child = filterCategories(category.child);
                }
                return true;
            });
        };
        setCategories(filterCategories(categories));
    };

    const editCategory = (id, newTitle) => {
        const updateCategories = (categoryList) => {
            return categoryList.map(category => {
                if (category.idDanhMuc === id) {
                    return { ...category, tenDanhMuc: newTitle };
                }
                if (category.child) {
                    category.child = updateCategories(category.child);
                }
                return category;
            });
        };
        setCategories(updateCategories(categories));
    };

    const treeData = categories.map(category => ({
        title: category.tenDanhMuc,
        key: category.idDanhMuc,
        children: category.child.map(subcategory => ({
            title: subcategory.tenDanhMuc,
            key: subcategory.idDanhMuc,
            children: subcategory.child.map(child => ({
                title: child.tenDanhMuc,
                key: child.idDanhMuc,
            })),
        })),
    }));

    const handleContextMenu = (node, event) => {
        event.preventDefault();
        setSelectedCategory(node);
        setMenuPosition({ top: event.clientY, left: event.clientX });
    };

    const menu = (
        <Menu>
            <Menu.Item onClick={() => {
                const newTitle = prompt('Nhập tên mới cho danh mục:', selectedCategory.title);
                if (newTitle) editCategory(selectedCategory.key, newTitle);
            }}>
                Sửa
            </Menu.Item>
            <Menu.Item>
                <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteCategory(selectedCategory.key)}>Xóa</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="category-management">
            <Title level={2}>Danh mục</Title>
            <hr />

            <div className="category-management__add">
                <Space direction="vertical">
                    <Input
                        placeholder="Tên danh mục"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <Checkbox checked={isSubcategory} onChange={e => setIsSubcategory(e.target.checked)}>
                        Đây là danh mục con
                    </Checkbox>
                    <Button type="primary" onClick={addCategory}>
                        Thêm danh mục
                    </Button>
                </Space>
            </div>

            <div className="category-management__search">
                <Search placeholder="Tìm kiếm danh mục" onSearch={value => console.log(value)} />
            </div>

            <div className="category-management__list">
                <Tree
                    treeData={treeData}
                    switcherIcon={<span style={{ fontSize: '12px' }}>▶</span>}
                    onRightClick={({ node, event }) => handleContextMenu(node, event)} // Gọi hàm khi nhấp chuột phải
                />
            </div>

            {selectedCategory && (
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement="bottomLeft"
                    overlayStyle={{ position: 'absolute', top: menuPosition.top, left: menuPosition.left }}
                >
                    <Button type="default" style={{ display: 'none' }}>Tùy chọn</Button>
                </Dropdown>
            )}
        </div>
    );
};

export default CategoryManagement;