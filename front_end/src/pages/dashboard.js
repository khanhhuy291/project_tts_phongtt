import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', price: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(0); // page index (0-based)
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    // Lấy danh sách sản phẩm có phân trang
    const fetchProducts = async (pageIndex = page) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/back_end/products?page=${pageIndex}&size=${pageSize}`);
            const data = await res.json();
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError('Không thể tải sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
        // eslint-disable-next-line
    }, [page]);

    // Thêm sản phẩm
    const handleAdd = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:8080/back_end/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setForm({ name: '', price: '', description: '' });
                fetchProducts();
            } else {
                setError('Thêm sản phẩm thất bại');
            }
        } catch {
            setError('Lỗi kết nối');
        }
    };

    // Xoá sản phẩm
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xoá?')) return;
        try {
            await fetch(`http://localhost:8080/back_end/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch {
            setError('Xoá thất bại');
        }
    };

    // Sửa sản phẩm
    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm({ name: product.name, price: product.price, description: product.description });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8080/back_end/products/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            setEditingId(null);
            setForm({ name: '', price: '', description: '' });
            fetchProducts();
        } catch {
            setError('Cập nhật thất bại');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)',
            padding: 0,
        }}>
            <div style={{
                maxWidth: 900,
                margin: '0 auto',
                padding: '40px 16px',
            }}>
                <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: 32 }}>Dashboard - Quản lý sản phẩm</h2>
                {error && <div style={{ color: '#dc2626', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
                <form
                    onSubmit={editingId ? handleUpdate : handleAdd}
                    style={{
                        display: 'flex',
                        gap: 12,
                        marginBottom: 28,
                        background: '#fff',
                        padding: 20,
                        borderRadius: 12,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <input
                        placeholder="Tên sản phẩm"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        style={{
                            padding: '10px 14px',
                            border: '1px solid #cbd5e1',
                            borderRadius: 8,
                            fontSize: 16,
                            minWidth: 180,
                        }}
                    />
                    <input
                        placeholder="Giá"
                        type="number"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                        required
                        style={{
                            padding: '10px 14px',
                            border: '1px solid #cbd5e1',
                            borderRadius: 8,
                            fontSize: 16,
                            minWidth: 120,
                        }}
                    />
                    <input
                        placeholder="Mô tả"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        style={{
                            padding: '10px 14px',
                            border: '1px solid #cbd5e1',
                            borderRadius: 8,
                            fontSize: 16,
                            minWidth: 220,
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: editingId ? '#f59e42' : '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontWeight: 600,
                            fontSize: 16,
                            padding: '10px 24px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                            transition: 'background 0.2s',
                        }}
                    >
                        {editingId ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setForm({ name: '', price: '', description: '' }); }}
                            style={{
                                background: '#64748b',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: 16,
                                padding: '10px 18px',
                                cursor: 'pointer',
                                marginLeft: 6,
                                transition: 'background 0.2s',
                            }}
                        >Huỷ</button>
                    )}
                </form>
                {loading ? <div style={{ textAlign: 'center', color: '#2563eb', fontWeight: 500 }}>Đang tải...</div> : (
                    <>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                overflow: 'hidden',
                            }}>
                                <thead style={{ background: '#2563eb' }}>
                                    <tr>
                                        <th style={{ color: '#fff', padding: 14, fontWeight: 600 }}>ID</th>
                                        <th style={{ color: '#fff', padding: 14, fontWeight: 600 }}>Tên</th>
                                        <th style={{ color: '#fff', padding: 14, fontWeight: 600 }}>Giá</th>
                                        <th style={{ color: '#fff', padding: 14, fontWeight: 600 }}>Mô tả</th>
                                        <th style={{ color: '#fff', padding: 14, fontWeight: 600 }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s' }}>
                                            <td style={{ padding: 12, textAlign: 'center' }}>{product.id}</td>
                                            <td style={{ padding: 12 }}>{product.name}</td>
                                            <td style={{ padding: 12 }}>{product.price}</td>
                                            <td style={{ padding: 12 }}>{product.description}</td>
                                            <td style={{ padding: 12, textAlign: 'center', display: 'flex', gap: 8, justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    style={{
                                                        background: '#f59e42',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: 38,
                                                        height: 38,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 2px 8px rgba(245,158,66,0.15)',
                                                        cursor: 'pointer',
                                                        fontSize: 18,
                                                        transition: 'background 0.2s, transform 0.2s',
                                                        outline: 'none',
                                                    }}
                                                    title="Sửa"
                                                >
                                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11.293-11.293a1 1 0 0 0 0-1.414l-3.586-3.586a1 1 0 0 0-1.414 0L3 15v6z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    style={{
                                                        background: '#dc2626',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: 38,
                                                        height: 38,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 2px 8px rgba(220,38,38,0.15)',
                                                        cursor: 'pointer',
                                                        fontSize: 18,
                                                        transition: 'background 0.2s, transform 0.2s',
                                                        outline: 'none',
                                                    }}
                                                    title="Xoá"
                                                >
                                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, gap: 8 }}>
                            <button
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                                style={{
                                    background: '#e5e7eb', color: '#2563eb', border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 600, cursor: page === 0 ? 'not-allowed' : 'pointer',
                                }}
                            >Trước</button>
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setPage(idx)}
                                    style={{
                                        background: idx === page ? '#2563eb' : '#e5e7eb',
                                        color: idx === page ? '#fff' : '#2563eb',
                                        border: 'none', borderRadius: 8, padding: '7px 14px', fontWeight: 600, cursor: 'pointer',
                                    }}
                                >{idx + 1}</button>
                            ))}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                                style={{
                                    background: '#e5e7eb', color: '#2563eb', border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 600, cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                                }}
                            >Sau</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 