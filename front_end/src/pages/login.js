import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/back_end/auth/log-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.code === 1000 && data.result && data.result.authenticated) {
                alert('Đăng nhập thành công!');
                navigate('/dashboard');
            } else {
                setError('Sai tài khoản hoặc mật khẩu!');
            }
        } catch (err) {
            setError('Lỗi kết nối tới server!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
        }}>
            <div style={{
                background: '#fff',
                padding: 90,
                borderRadius: 18,
                boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
                width: '100%',
                maxWidth: 380,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: 28, fontWeight: 700, letterSpacing: 1 }}>Đăng nhập</h2>
                {error && <div style={{ color: '#dc2626', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 600, textAlign: 'left' }}>Tên đăng nhập</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 12, top: 10, color: '#a0aec0', fontSize: 18 }}>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg>
                            </span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 0px 10px 38px',
                                    border: '1.5px solid #cbd5e1',
                                    borderRadius: 10,
                                    fontSize: 16,
                                    outline: 'none',
                                    transition: 'border 0.2s',
                                    background: '#f8fafc',
                                }}
                                placeholder="Nhập tên đăng nhập"
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: 'block', marginBottom: 8, color: '#374151', fontWeight: 600, textAlign: 'left' }}>Mật khẩu</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 12, top: 10, color: '#a0aec0', fontSize: 18 }}>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="8" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 0px 10px 38px',
                                    border: '1.5px solid #cbd5e1',
                                    borderRadius: 10,
                                    fontSize: 16,
                                    outline: 'none',
                                    transition: 'border 0.2s',
                                    background: '#f8fafc',
                                }}
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '13px 0',
                            background: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 10,
                            fontWeight: 700,
                            fontSize: 18,
                            boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'background 0.2s',
                            marginTop: 6,
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
} 