import React, { useState } from 'react';
import { Input, Button, Select, Tree, Menu, message } from 'antd';
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
                        { idDanhMuc: 8, tenDanhMuc: "Điện Thoại 11", child: [] },
                        { idDanhMuc: 9, tenDanhMuc: "Điện Thoại 12", child: [] }
                    ]
                }
            ]
        },
        {
            idDanhMuc: 2,
            tenDanhMuc: "Laptop",
            child: [
                { idDanhMuc: 6, tenDanhMuc: "Laptop 1", child: [] }
            ]
        },
        {
            idDanhMuc: 4,
            tenDanhMuc: "Máy tính bảng",
            child: []
        }
    ];

    const [categories, setCategories] = useState(initialCategories);
    const [categoryName, setCategoryName] = useState('');
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedSecondLevel, setSelectedSecondLevel] = useState(null);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedCategory, setSelectedCategory] = useState(null);

    const addCategory = () => {
        if (categoryName.trim()) {
            const newCategory = {
                idDanhMuc: Date.now(),
                tenDanhMuc: categoryName,
                child: [],
            };

            const updateCategories = (categoryList) => {
                return categoryList.map(category => {
                    if (selectedSecondLevel && category.idDanhMuc === selectedParent.idDanhMuc) {
                        return {
                            ...category,
                            child: category.child.map(subCategory => {
                                if (subCategory.idDanhMuc === selectedSecondLevel.idDanhMuc) {
                                    return {
                                        ...subCategory,
                                        child: [...subCategory.child, newCategory],
                                    };
                                }
                                return subCategory;
                            }),
                        };
                    } else if (selectedParent && category.idDanhMuc === selectedParent.idDanhMuc) {
                        return {
                            ...category,
                            child: [...category.child, newCategory],
                        };
                    }
                    return category;
                });
            };

            if (selectedSecondLevel) {
                setCategories(updateCategories(categories));
            } else if (selectedParent) {
                setCategories(updateCategories(categories));
            } else {
                setCategories([...categories, newCategory]);
            }

            setCategoryName('');
            setSelectedParent(null);
            setSelectedSecondLevel(null);
        }
    };

    const handleSelectParent = (category) => {
        setSelectedParent(category);
        setSelectedSecondLevel(null);
    };

    const handleSelectSecondLevel = (subcategory) => {
        setSelectedSecondLevel(subcategory);
    };

    const showCategory = (
        <div className="category-view-section">
            <h4 className="category-view-title">Xem danh mục</h4>
            <div className="category-levels">
                <div className="category-level">
                    <h5 className="category-level-title">Cấp 1</h5>
                    <Tree
                        treeData={categories.map(category => ({
                            title: category.tenDanhMuc,
                            key: category.idDanhMuc,
                        }))}
                        onSelect={(selectedKeys) => handleSelectParent(categories.find(cat => cat.idDanhMuc === selectedKeys[0]))}
                        onRightClick={(info) => showContextMenu(info, null)}
                    />
                </div>

                <div className="category-level">
                    <h5 className="category-level-title">Cấp 2</h5>
                    {selectedParent && (
                        <Tree
                            treeData={selectedParent.child.map(subcategory => ({
                                title: subcategory.tenDanhMuc,
                                key: subcategory.idDanhMuc,
                            }))}
                            onSelect={(selectedKeys) => handleSelectSecondLevel(selectedParent.child.find(cat => cat.idDanhMuc === selectedKeys[0]))}
                            onRightClick={(info) => showContextMenu(info, selectedParent)}
                        />
                    )}
                </div>

                <div className="category-level">
                    <h5 className="category-level-title">Cấp 3</h5>
                    {selectedSecondLevel && (
                        <Tree
                            treeData={selectedSecondLevel.child.map(child => ({
                                title: child.tenDanhMuc,
                                key: child.idDanhMuc,
                            }))}
                            onRightClick={(info) => showContextMenu(info, selectedSecondLevel)}
                        />
                    )}
                </div>
            </div>
            {contextMenuVisible && (
                <Menu
                    style={{ position: 'absolute', left: contextMenuPosition.x, top: contextMenuPosition.y }}
                    onClick={handleMenuClick}
                    onMouseLeave={() => setContextMenuVisible(false)}
                >
                    <Menu.Item key="edit">Sửa</Menu.Item>
                    <Menu.Item key="delete">Xóa</Menu.Item>
                </Menu>
            )}
        </div>
    );

    const showContextMenu = (info, category) => {
        setSelectedCategory(category);
        setContextMenuPosition({ x: info.event.clientX, y: info.event.clientY });
        setContextMenuVisible(true);
    };

    const handleMenuClick = (e) => {
        if (e.key === "edit") {
            if (selectedCategory) {
                const updatedName = prompt("Nhập tên danh mục mới:", selectedCategory.tenDanhMuc);
                if (updatedName) {
                    updateCategoryName(selectedCategory.idDanhMuc, updatedName);
                }
            }
        } else if (e.key === "delete") {
            if (selectedCategory) {
                deleteCategory(selectedCategory.idDanhMuc);
            }
        }
        setContextMenuVisible(false);
    };

    const updateCategoryName = (id, newName) => {
        const updatedCategories = categories.map(category => {
            if (category.idDanhMuc === id) {
                return { ...category, tenDanhMuc: newName };
            }
            if (category.child) {
                category.child = category.child.map(subCategory => {
                    if (subCategory.idDanhMuc === id) {
                        return { ...subCategory, tenDanhMuc: newName };
                    }
                    if (subCategory.child) {
                        subCategory.child = subCategory.child.map(child => {
                            if (child.idDanhMuc === id) {
                                return { ...child, tenDanhMuc: newName };
                            }
                            return child;
                        });
                    }
                    return subCategory;
                });
            }
            return category;
        });

        setCategories(updatedCategories);
    };

    const deleteCategory = (id) => {
        const updatedCategories = categories.filter(category => {
            if (category.idDanhMuc === id) {
                return false; // Xóa danh mục cấp 1
            }
            if (category.child) {
                category.child = category.child.filter(subCategory => {
                    if (subCategory.idDanhMuc === id) {
                        return false; // Xóa danh mục cấp 2
                    }
                    if (subCategory.child) {
                        subCategory.child = subCategory.child.filter(child => child.idDanhMuc !== id); // Xóa danh mục cấp 3
                    }
                    return true;
                });
            }
            return true;
        });

        setCategories(updatedCategories);
        message.success('Danh mục đã được xóa!');
    };

    const addCategorySection = (
        <div className="category-add-section">
            <h4 className="category-add-title">Thêm danh mục mới</h4>
            <Input
                placeholder="Tên danh mục"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="category-input"
            />
            <Select
                placeholder="Chọn danh mục cấp 1"
                onChange={(value) => {
                    const category = categories.find(cat => cat.idDanhMuc === value);
                    handleSelectParent(category);
                }}
                className="category-select"
            >
                <Option value="">--- Chọn danh mục cấp 1 ---</Option>
                {categories.map(category => (
                    <Option key={category.idDanhMuc} value={category.idDanhMuc}>
                        {category.tenDanhMuc}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Chọn danh mục cấp 2"
                onChange={(value) => {
                    const subcategory = selectedParent.child.find(cat => cat.idDanhMuc === value);
                    handleSelectSecondLevel(subcategory);
                }}
                className="category-select"
                disabled={!selectedParent}
            >
                <Option value="">--- Chọn danh mục cấp 2 ---</Option>
                {selectedParent && selectedParent.child.map(subcategory => (
                    <Option key={subcategory.idDanhMuc} value={subcategory.idDanhMuc}>
                        {subcategory.tenDanhMuc}
                    </Option>
                ))}
            </Select>

            <Button type="primary" onClick={addCategory} className="category-add-button">
                Thêm danh mục
            </Button>
        </div>
    );

    return (
        <div className="category-management">
            <h2 className="category-title">Danh mục</h2>
            <hr className="category-divider" />
            <div className="category-container">
                {addCategorySection}
                {showCategory}
            </div>
        </div>
    );
};

export default CategoryManagement;