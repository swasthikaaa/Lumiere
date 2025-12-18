import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '' });

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users', { headers });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleStatus = async (id) => {
        try {
            const res = await fetch(`/api/users/${id}/status`, { method: 'PUT', headers });
            if (res.ok) {
                toast.success('User status updated');
                fetchUsers();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (user) => {
        setDeleteModal({ isOpen: true, userId: user.id, userName: user.name });
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch(`/api/users/${deleteModal.userId}`, { method: 'DELETE', headers });
            if (res.ok) {
                toast.success('User deleted successfully');
                fetchUsers();
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete user');
        }
    };

    return (
        <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem' }}>Users</h1>
            <div className="admin-table-container">
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Email</th>
                            <th style={{ padding: '1rem' }}>Admin Status</th>
                            <th style={{ padding: '1rem' }}>Account Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!Array.isArray(users) || users.length === 0) ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No users found.</td></tr>
                        ) : users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{user.name}</td>
                                <td style={{ padding: '1rem' }}>{user.email}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        background: user.isAdmin ? '#fff3cd' : '#e2e3e5',
                                        color: user.isAdmin ? '#856404' : '#383d41'
                                    }}>
                                        {user.isAdmin ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        background: user.isActive ? '#d4edda' : '#f8d7da',
                                        color: user.isActive ? '#155724' : '#721c24'
                                    }}>
                                        {user.isActive ? 'Active' : 'Deactivated'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        {user.email !== 'adminlumiere@gmail.com' && (
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: user.isActive ? '#ff4d4f' : '#28a745',
                                                    cursor: 'pointer',
                                                    textDecoration: 'underline',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {user.isActive ? 'Deactivate' : 'Activate'}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteClick(user)}
                                            style={{ color: '#ff4d4f', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, userId: null, userName: '' })}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${deleteModal.userName}? This action cannot be undone.`}
            />
        </div >
    );
};

export default AdminUsers;
