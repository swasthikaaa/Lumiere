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
            <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Email</th>
                            <th style={{ padding: '1rem' }}>Role</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!Array.isArray(users) || users.length === 0) ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No users found.</td></tr>
                        ) : users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{user.name}</td>
                                <td style={{ padding: '1rem' }}>{user.email}</td>
                                <td style={{ padding: '1rem' }}>{user.isAdmin ? 'Admin' : 'User'}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: user.isActive ? 'green' : 'red', fontWeight: 600 }}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {!user.isAdmin && (
                                        <>
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                style={{ marginRight: '1rem', color: '#666', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                            >
                                                {user.isActive ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(user)}
                                                style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
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
        </div>
    );
};

export default AdminUsers;
