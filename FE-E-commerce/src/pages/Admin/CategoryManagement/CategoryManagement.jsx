import React, { useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Menu, Button, Input, Select, Tree, Checkbox } from 'antd';
import './CategoryManagement.scss';

const { Option } = Select;

const CategoryManagement = () => {
    const initialCategories = [
        {
            idDanhMuc: 1,
            tenDanhMuc: "Điện thoại",
            child: [
                {
                    idDanhMuc: 3,
                    tenDanhMuc: "Điện thoại 1",
                    child: [
                        {
                            idDanhMuc: 6,
                            tenDanhMuc: "Điện thoại 12",
                            child: []
                        }
                    ]
                },
                {
                    idDanhMuc: 4,
                    tenDanhMuc: "Điện thoại 2",
                    child: [
                        {
                            idDanhMuc: 7,
                            tenDanhMuc: "Điện thoại 21",
                            child: [
                                {
                                    idDanhMuc: 9,
                                    tenDanhMuc: "Điện thoại 211",
                                    child: []
                                }
                            ]
                        },
                        {
                            idDanhMuc: 8,
                            tenDanhMuc: "Điện thoại 22",
                            child: []
                        }
                    ]
                },
                {
                    idDanhMuc: 5,
                    tenDanhMuc: "Điện thoại 3",
                    child: []
                }
            ]
        },
        {
            idDanhMuc: 2,
            tenDanhMuc: "Laptop",
            child: [
                {
                    idDanhMuc: 10,
                    tenDanhMuc: "Laptop 1",
                    child: []
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
    const [isSubCategory, setIsSubCategory] = useState(false);

    const addCategory = () => {
        if (!categoryName.trim()) return;
        const newCategory = { idDanhMuc: Date.now(), tenDanhMuc: categoryName, child: [] };
        const updateCategories = (list) => list.map(cat => {
            if (cat.idDanhMuc === (selectedChild ? selectedParent.idDanhMuc : selectedParent?.idDanhMuc)) {
                return {
                    ...cat,
                    child: selectedChild ?
                        cat.child.map(subCat => subCat.idDanhMuc === selectedChild.idDanhMuc ? { ...subCat, child: [...subCat.child, newCategory] } : subCat)
                        : [...cat.child, newCategory]
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
        setIsSubCategory(false);
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
            setNewCategoryName(contextMenu.category.tenDanhMuc);
            setEditModalVisible(true);
        } else if (action === "delete") {
            setDeleteModalVisible(true);
        }
        setContextMenu({ ...contextMenu, visible: false });
    };

    const updateCategoryName = (id, newName) => {
        const update = (list) => list.map(cat => {
            if (cat.idDanhMuc === id) return { ...cat, tenDanhMuc: newName };
            if (cat.child) cat.child = update(cat.child);
            return cat;
        });
        setCategories(update(categories));
        alert('Danh mục đã được cập nhật!');
    };

    const deleteCategory = (id) => {
        const update = (list) => list.filter(cat => {
            if (cat.idDanhMuc === id) return false;
            if (cat.child) cat.child = update(cat.child);
            return true;
        });
        setCategories(update(categories));
        alert('Danh mục đã được xóa!');
    };

    const handleEdit = () => {
        if (contextMenu.category) {
            updateCategoryName(contextMenu.category.idDanhMuc, newCategoryName);
        }
        setEditModalVisible(false);
    };

    const confirmDelete = () => {
        if (contextMenu.category) {
            deleteCategory(contextMenu.category.idDanhMuc);
        }
        setDeleteModalVisible(false);
    };

    const renderTree = (data) => {
        return data.map(cat => ({
            title: cat.tenDanhMuc,
            key: cat.idDanhMuc,
            children: cat.child.length > 0 ? renderTree(cat.child) : [],
        }));
    };

    const filterCategories = (data, term) => {
        return data
            .map(cat => {
                const matchedChildren = filterCategories(cat.child, term);
                if (cat.tenDanhMuc.toLowerCase().includes(term.toLowerCase()) || matchedChildren.length > 0) {
                    return { ...cat, child: matchedChildren };
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
                    onChange={(value) => handleSelect(setSelectedParent, categories.find(cat => cat.idDanhMuc === value))}
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    {categories.map(cat => <Option key={cat.idDanhMuc} value={cat.idDanhMuc}>{cat.tenDanhMuc}</Option>)}
                </Select>
                <Select
                    placeholder="--- Chọn danh mục cấp 2 ---"
                    onChange={(value) => handleSelect(setSelectedChild, selectedParent?.child.find(cat => cat.idDanhMuc === value))}
                    disabled={!selectedParent}
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    {selectedParent?.child.map(subCat => <Option key={subCat.idDanhMuc} value={subCat.idDanhMuc}>{subCat.tenDanhMuc}</Option>)}
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

            <div className="view-section" style={{width:'auto'}}>
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
                        const selected = categories.find(cat => cat.idDanhMuc === Number(keys[0]));
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

            <Modal
                title="Xác nhận xóa"
                visible={isDeleteModalVisible}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p>Bạn có chắc chắn muốn xóa danh mục "{contextMenu.category?.tenDanhMuc}" không?</p>
            </Modal>
        </div>
    );
};

export default CategoryManagement;