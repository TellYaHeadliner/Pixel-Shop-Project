import React, { useState, useEffect } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Menu, Button, Input, Checkbox, Tree, notification } from 'antd';
import apiService from '../../../api/api';
import './CategoryManagement.scss';

const { Search } = Input;

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [selectedParent, setSelectedParent] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, position: {}, category: null });
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isSubCategory, setIsSubCategory] = useState(false);

    // Fetch categories every second
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiService.getListDanhMuc();
                setCategories(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
        const intervalId = setInterval(fetchCategories, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleClickOutside = (event) => {
        if (isEditModalVisible && !event.target.closest('.ant-modal')) {
            setEditModalVisible(false);
        }
        if (isDeleteModalVisible && !event.target.closest('.ant-modal')) {
            setDeleteModalVisible(false);
        }
        if (contextMenu.visible && !event.target.closest('.ant-menu')) {
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditModalVisible, isDeleteModalVisible, contextMenu.visible]);

    const addCategory = async () => {
        if (!categoryName.trim()) {
            notification.warning({ message: 'Cảnh báo', description: 'Tên danh mục không được để trống!' });
            return;
        }

        let categoryData = { tenDanhMuc: categoryName };

        // Kiểm tra điều kiện để xác định idDanhMucCha
        if (isSubCategory && selectedParent) {
            categoryData.idDanhMucCha = selectedParent.idDanhMuc;
        } else if (!isSubCategory && selectedParent) {
            categoryData.idDanhMucCha = selectedParent.idDanhMuc;
        } else {
            categoryData.idDanhMucCha = null; // Tạo danh mục cấp cao nhất
        }

        try {
            const response = await apiService.addDanhMuc(categoryData);
            const newCategory = { ...response.data.data, child: [] };

            setCategories(prev => {
                const updatedCategories = [...prev];
                if (isSubCategory && selectedParent) {
                    const parentIndex = updatedCategories.findIndex(cat => cat.idDanhMuc === selectedParent.idDanhMuc);
                    if (parentIndex !== -1) {
                        updatedCategories[parentIndex].child.push(newCategory);
                    }
                } else if (selectedParent) {
                    const parentIndex = updatedCategories.findIndex(cat => cat.idDanhMuc === selectedParent.idDanhMuc);
                    if (parentIndex !== -1) {
                        updatedCategories.splice(parentIndex + 1, 0, newCategory);
                    }
                } else {
                    updatedCategories.push(newCategory);
                }
                return updatedCategories;
            });

            resetForm();
            notification.success({ message: 'Thành công', description: 'Danh mục đã được thêm thành công!' });
        } catch (error) {
            console.error("Error adding category:", error);
            notification.error({ message: 'Lỗi', description: 'Có lỗi xảy ra khi thêm danh mục!' });
        }
    };

    const deleteCategory = async () => {
        if (contextMenu.category) {
            const hasChildren = contextMenu.category.child && contextMenu.category.child.length > 0;
            if (hasChildren) {
                notification.warning({ message: 'Cảnh báo', description: 'Không thể xóa danh mục này vì nó có danh mục con.' });
                return;
            }

            const categoryId = contextMenu.category.key;
            try {
                await apiService.deleteDanhMuc(categoryId);
                setCategories(prev => prev.filter(cat => cat.idDanhMuc !== categoryId));
                notification.success({ message: 'Thành công', description: 'Danh mục đã được xóa!' });
            } catch (error) {
                console.error("Error deleting category:", error);
                notification.error({ message: 'Lỗi', description: 'Có lỗi xảy ra khi xóa danh mục!' });
            }
        }
        setDeleteModalVisible(false);
    };

    const updateCategoryName = async () => {
        if (contextMenu.category) {
            const categoryId = contextMenu.category.key;

            try {
                await apiService.updateDanhMuc(categoryId, { tenDanhMuc: newCategoryName });
                setCategories(prev => {
                    const updatedCategories = prev.map(cat => {
                        if (cat.idDanhMuc === categoryId) {
                            return { ...cat, tenDanhMuc: newCategoryName };
                        }
                        return cat;
                    });
                    return updatedCategories;
                });

                notification.success({ message: 'Thành công', description: 'Danh mục đã được cập nhật!' });
            } catch (error) {
                console.error("Error updating category:", error);
                notification.error({ message: 'Lỗi', description: 'Có lỗi xảy ra khi cập nhật danh mục!' });
            }
        }
        setEditModalVisible(false);
    };

    const resetForm = () => {
        setCategoryName('');
        setSelectedParent(null);
        setIsSubCategory(false);
    };

    const showContextMenu = (e, category) => {
        e.preventDefault();
        setContextMenu({ visible: true, position: { x: e.clientX, y: e.clientY }, category });
    };

    const filterCategories = (data = [], term) => {
        return Array.isArray(data)
            ? data
                .map(cat => {
                    const matchedChildren = filterCategories(cat.child || [], term);
                    if (cat.tenDanhMuc.toLowerCase().includes(term.toLowerCase()) || matchedChildren.length > 0) {
                        return { ...cat, child: matchedChildren };
                    }
                    return null;
                })
                .filter(Boolean)
            : [];
    };

    const findCategoryById = (data, id) => {
        for (const category of data) {
            if (category.idDanhMuc === id) {
                return category;
            }
            const found = findCategoryById(category.child || [], id);
            if (found) {
                return found;
            }
        }
        return null;
    };

    const menuItems = [
        { key: "edit", label: "Sửa", icon: <EditOutlined /> },
        { key: "delete", label: "Xóa", icon: <DeleteOutlined /> },
    ];

    const filteredCategories = filterCategories(categories, searchTerm);

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

    const renderTree = (data) => {
        return data.map(cat => {
            if (!cat.idDanhMuc) {
                console.warn("Danh mục không có idDanhMuc:", cat);
                return null;
            }
            return {
                title: cat.tenDanhMuc,
                key: cat.idDanhMuc.toString(),
                children: cat.child && cat.child.length > 0 ? renderTree(cat.child) : [],
            };
        }).filter(Boolean);
    };

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
                    style={{ margin: '10px 0', opacity: '0' }}
                >
                    Đây là danh mục con
                </Checkbox>
                <Tree
                    treeData={renderTree(filteredCategories)}
                    onRightClick={(e) => showContextMenu(e.event, e.node)}
                    onSelect={(keys) => {
                        const selected = findCategoryById(categories, Number(keys[0]));
                        if (selected) {
                            setSelectedParent(selected); // Set selected parent
                        }
                    }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addCategory}
                    style={{ marginTop: '10px' }}
                >
                    Thêm danh mục
                </Button>
            </div>

            <div className="view-section" style={{ width: 'auto' }}>
                <h4 className="view-title">Xem và quản lý danh mục</h4>
                <Search
                    placeholder="Tìm kiếm danh mục"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <Tree
                    treeData={renderTree(filteredCategories)}
                    onRightClick={(e) => showContextMenu(e.event, e.node)}
                    onSelect={(keys) => {
                        const selected = findCategoryById(categories, Number(keys[0]));
                        if (selected) {
                            console.log({
                                idDanhMuc: selected.idDanhMuc,
                                tenDanhMuc: selected.tenDanhMuc,
                                idDanhMucCha: selected.idDanhMucCha,
                            });
                        }
                    }}
                />
            </div>

            {contextMenu.visible && (
                <Menu
                    style={{ position: 'absolute', left: contextMenu.position.x, top: contextMenu.position.y }}
                    onClick={({ key }) => handleMenuClick(key)}
                    items={menuItems}
                />
            )}

            <Modal
                title="Sửa tên danh mục"
                open={isEditModalVisible}
                onOk={updateCategoryName}
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
                open={isDeleteModalVisible}
                onOk={deleteCategory}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p>Bạn có chắc chắn muốn xóa danh mục không?</p>
            </Modal>
        </div>
    );
};

const App = () => (
    <CategoryManagement />
);

export default App;