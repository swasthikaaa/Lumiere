import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';
import { useShop } from '../../context/ShopContext';

const AdminProducts = () => {
    const { formatPrice, refreshProducts } = useShop();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [formData, setFormData] = useState({ id: '', name: '', price: '', category: '', image: '', description: '' });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteClick = (product) => {
        setDeleteModal({ isOpen: true, productId: product.id || product._id, productName: product.name });
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch(`/api/products/${deleteModal.productId}`, { method: 'DELETE', headers });
            if (res.ok) {
                toast.success('Product deleted successfully');
                fetchProducts();
            } else {
                toast.error('Failed to delete product');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete product');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const prodId = formData.id || formData._id;
            const url = editProduct ? `/api/products/${prodId}` : '/api/products';
            const method = editProduct ? 'PUT' : 'POST';

            // Clean price data (remove symbols, extract number)
            const cleanPrice = typeof formData.price === 'string'
                ? formData.price.replace(/[^0-9.]/g, '')
                : formData.price;

            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify({ ...formData, price: cleanPrice })
            });

            if (res.ok) {
                toast.success(editProduct ? 'Product Updated' : 'Product Added');
                setIsModalOpen(false);
                setEditProduct(null);
                setFormData({ id: '', name: '', price: '', category: '', image: '', description: '' });
                fetchProducts();
                refreshProducts(); // Refresh global shop state
            } else {
                toast.error('Operation failed');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openEdit = (product) => {
        setEditProduct(product);
        setFormData(product);
        setIsModalOpen(true);
    };

    const openAdd = () => {
        setEditProduct(null);
        const nextId = products.length > 0 ? Math.max(...products.map(p => Number(p.id) || 0)) + 1 : 1;
        setFormData({ id: nextId, name: '', price: '', category: '', image: '', description: '' });
        setIsModalOpen(true);
    };


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Products</h1>
                <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Add Product</button>
            </div>

            <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>ID</th>
                            <th style={{ padding: '1rem' }}>Image</th>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Price</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Description</th>
                            <th style={{ padding: '1rem' }}>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const displayId = product.id || product._id;
                            return (
                                <tr key={displayId} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{displayId}</td>
                                    <td style={{ padding: '1rem' }}><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                    <td style={{ padding: '1rem' }}>{product.name}</td>
                                    <td style={{ padding: '1rem' }}>{formatPrice(product.price)}</td>
                                    <td style={{ padding: '1rem' }}>{product.category}</td>
                                    <td style={{ padding: '1rem' }}>
                                        {product.description}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                                            <button onClick={() => openEdit(product)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>Edit</button>
                                            <button onClick={() => handleDeleteClick(product)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '10px', border: '1px solid #ddd' }} />
                            <input type="text" placeholder="Price (e.g. Rs. 5000)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required style={{ padding: '10px', border: '1px solid #ddd' }} />

                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <option value="">Select Category</option>
                                {[...new Set([
                                    'Face', 'Body', 'Mist', 'Eyes', 'Sets', 'Lip', 'Skin Care', 'New Arrivals', 'Makeup',
                                    ...products.map(p => p.category)
                                ])].filter(Boolean).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', color: '#666' }}>Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('image', file);

                                            try {
                                                const res = await fetch('/api/upload', {
                                                    method: 'POST',
                                                    body: formData
                                                });
                                                const data = await res.json();
                                                if (res.ok) {
                                                    setFormData(prev => ({ ...prev, image: data.url }));
                                                    toast.success('Image uploaded');
                                                } else {
                                                    toast.error('Upload failed');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                toast.error('Upload error');
                                            }
                                        }
                                    }}
                                    style={{ padding: '10px', border: '1px solid #ddd' }}
                                />
                                {formData.image && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <img src={formData.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ddd' }} />
                                    </div>
                                )}
                            </div>

                            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ padding: '10px', border: '1px solid #ddd', minHeight: '100px' }} />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: '#eee', border: 'none', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })}
                onConfirm={confirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${deleteModal.productName}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminProducts;
