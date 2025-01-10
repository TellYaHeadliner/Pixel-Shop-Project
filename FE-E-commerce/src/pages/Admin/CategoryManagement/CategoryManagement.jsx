import React, { useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Menu, Button, Input, Select, Tree, Checkbox } from 'antd';
import './CategoryManagement.scss';

const { Option } = Select;

const CategoryManagement = () => {
    const initialCategories = [
        {
            id: 2,
            name: "Điện thoại",
            children: [
                {
                    id: 3,
                    name: "Smartphone",
                    children: [
                        {
                            id: 4,
                            name: "Android",
                            children: [
                                {
                                    id: 5,
                                    name: "Samsung",
                                    children: [
                                        {
                                            id: 6,
                                            name: "Galaxy S",
                                            children: [
                                                {
                                                    id: 7,
                                                    name: "Galaxy S21",
                                                    children: []
                                                }
                                            ]
                                        },
                                        {
                                            id: 8,
                                            name: "Xiaomi",
                                            children: [
                                                {
                                                    id: 9,
                                                    name: "Mi Series",
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 10,
                            name: "iPhone",
                            children: [
                                {
                                    id: 11,
                                    name: "iPhone 13",
                                    children: []
                                },
                                {
                                    id: 12,
                                    name: "iPhone 14",
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 13,
                    name: "Điện thoại cơ bản",
                    children: [
                        {
                            id: 14,
                            name: "Nokia",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 15,
            name: "Laptop",
            children: [
                {
                    id: 16,
                    name: "Laptop Gaming",
                    children: [
                        {
                            id: 17,
                            name: "ASUS",
                            children: [
                                {
                                    id: 18,
                                    name: "ROG",
                                    children: [
                                        {
                                            id: 19,
                                            name: "ROG Zephyrus",
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 20,
                            name: "MSI",
                            children: []
                        }
                    ]
                },
                {
                    id: 21,
                    name: "Laptop Văn phòng",
                    children: [
                        {
                            id: 22,
                            name: "Dell",
                            children: []
                        },
                        {
                            id: 23,
                            name: "HP",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 24,
            name: "Máy tính để bàn",
            children: [
                {
                    id: 25,
                    name: "PC Gaming",
                    children: [
                        {
                            id: 26,
                            name: "Custom Build",
                            children: []
                        }
                    ]
                },
                {
                    id: 27,
                    name: "All-in-One",
                    children: []
                }
            ]
        },
        {
            id: 28,
            name: "Thiết bị đeo tay",
            children: [
                {
                    id: 29,
                    name: "Smartwatch",
                    children: [
                        {
                            id: 30,
                            name: "Apple Watch",
                            children: []
                        },
                        {
                            id: 31,
                            name: "Samsung Galaxy Watch",
                            children: []
                        }
                    ]
                },
                {
                    id: 32,
                    name: "Fitbit",
                    children: []
                }
            ]
        },
        {
            id: 33,
            name: "Tai nghe",
            children: [
                {
                    id: 34,
                    name: "Tai nghe không dây",
                    children: [
                        {
                            id: 35,
                            name: "AirPods",
                            children: []
                        },
                        {
                            id: 36,
                            name: "Sony WF",
                            children: []
                        }
                    ]
                },
                {
                    id: 37,
                    name: "Tai nghe có dây",
                    children: []
                }
            ]
        }
    ];

    const [categories, setCategories] = useState(initialCategories);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, position: {}, category: null });
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isSubCategory, setIsSubCategory] = useState(false); // State cho checkbox xác nhận

    const addCategory = () => {
        if (!categoryName.trim()) return;
        const newCategory = { id: Date.now(), name: categoryName, children: [] };
        const updateCategories = (list) => list.map(cat => {
            if (cat.id === (selectedChild ? selectedParent.id : selectedParent?.id)) {
                return {
                    ...cat,
                    children: selectedChild ?
                        cat.children.map(subCat => subCat.id === selectedChild.id ? { ...subCat, children: [...subCat.children, newCategory] } : subCat)
                        : [...cat.children, newCategory]
                };
            }
            return cat;
        });

        setCategories(selectedChild || selectedParent ? updateCategories(categories) : [...categories, newCategory]);
        resetForm();
    };

    const resetForm = () => {
        setCategoryName('');
        setSelectedParent(null);
        setSelectedChild(null);
        setIsSubCategory(false); // Reset lại checkbox

    };

    const handleSelect = (setSelected, category) => {
        setSelected(category);
        if (setSelected === setSelectedParent) setSelectedChild(null);
    };

    const showContextMenu = (e, category) => {
        e.preventDefault();
        setContextMenu({ visible: true, position: { x: e.clientX, y: e.clientY }, category });
    };

    const handleMenuClick = (action) => {
        if (!contextMenu.category) return;
        if (action === "edit") {
            setNewCategoryName(contextMenu.category.name);
            setEditModalVisible(true);
        } else if (action === "delete") {
            setDeleteModalVisible(true);
        }
        setContextMenu({ ...contextMenu, visible: false });
    };

    const updateCategoryName = (id, newName) => {
        const update = (list) => list.map(cat => {
            if (cat.id === id) return { ...cat, name: newName };
            if (cat.children) cat.children = update(cat.children);
            return cat;
        });
        setCategories(update(categories));
        alert('Danh mục đã được cập nhật!');
    };

    const deleteCategory = (id) => {
        const update = (list) => list.filter(cat => {
            if (cat.id === id) return false;
            if (cat.children) cat.children = update(cat.children);
            return true;
        });
        setCategories(update(categories));
        alert('Danh mục đã được xóa!');
    };

    const handleEdit = () => {
        if (contextMenu.category) {
            updateCategoryName(contextMenu.category.id, newCategoryName);
        }
        setEditModalVisible(false);
    };

    const confirmDelete = () => {
        if (contextMenu.category) {
            deleteCategory(contextMenu.category.id);
        }
        setDeleteModalVisible(false);
    };

    const renderTree = (data) => {
        return data.map(cat => ({
            title: cat.name,
            key: cat.id,
            children: cat.children.length > 0 ? renderTree(cat.children) : [],
        }));
    };

    const filterCategories = (data, term) => {
        return data
            .map(cat => {
                const matchedChildren = filterCategories(cat.children, term);
                if (cat.name.toLowerCase().includes(term.toLowerCase()) || matchedChildren.length > 0) {
                    return { ...cat, children: matchedChildren };
                }
                return null;
            })
            .filter(Boolean);
    };

    const filteredCategories = filterCategories(categories, searchTerm);

    return (
        <div className="category-management-container">
            <h2 className="category-management-title">Quản lý danh mục</h2>
            <div className="form-section">
                <h4 className="form-title">Thêm danh mục mới</h4>
                <Input
                    placeholder="Tên danh mục"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <Checkbox
                    checked={isSubCategory}
                    onChange={(e) => setIsSubCategory(e.target.checked)}
                    style={{ marginTop: '10px' }}
                >
                    Đây là danh mục con
                </Checkbox>
                <Select
                    placeholder="--- Chọn danh mục cấp 1 ---"
                    onChange={(value) => handleSelect(setSelectedParent, categories.find(cat => cat.id === value))}
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    {categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.name}</Option>)}
                </Select>
                <Select
                    placeholder="--- Chọn danh mục cấp 2 ---"
                    onChange={(value) => handleSelect(setSelectedChild, selectedParent?.children.find(cat => cat.id === value))}
                    disabled={!selectedParent}
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    {selectedParent?.children.map(subCat => <Option key={subCat.id} value={subCat.id}>{subCat.name}</Option>)}
                </Select>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addCategory}
                    style={{ marginTop: '10px' }}
                >
                    Thêm danh mục
                </Button>
            </div>

            <div className="view-section">
                <h4 className="view-title">Xem và quản lý danh mục</h4>
                <Input
                    placeholder="Tìm kiếm danh mục"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Tree
                    treeData={renderTree(filteredCategories)}
                    onRightClick={(e) => showContextMenu(e.event, e.node)}
                    onSelect={(keys) => {
                        const selected = categories.find(cat => cat.id === Number(keys[0]));
                        handleSelect(setSelectedParent, selected);
                    }}
                />
            </div>

            {contextMenu.visible && (
                <Menu
                    style={{ position: 'absolute', left: contextMenu.position.x, top: contextMenu.position.y }}
                    onClick={({ key }) => handleMenuClick(key)}
                >
                    <Menu.Item key="edit" icon={<EditOutlined />}>Sửa</Menu.Item>
                    <Menu.Item key="delete" icon={<DeleteOutlined />}>Xóa</Menu.Item>
                </Menu>
            )}

            {/* Edit Modal */}
            <Modal
                title="Sửa tên danh mục"
                visible={isEditModalVisible}
                onOk={handleEdit}
                onCancel={() => setEditModalVisible(false)}
            >
                <Input
                    placeholder="Nhập tên mới"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Xác nhận xóa"
                visible={isDeleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p>Bạn có chắc chắn muốn xóa danh mục "{contextMenu.category?.name}" không?</p>
            </Modal>
        </div>
    );
};

export default CategoryManagement;