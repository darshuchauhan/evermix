'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin/login');
            } else {
                setUser(user);
                fetchProducts();
            }
        }
        checkUser();
    }, []);

    async function fetchProducts() {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (data) setProducts(data);
        setLoading(false);
    }

    async function deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (!error) fetchProducts();
        }
    }

    if (!user) return null;

    return (
        <main className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1>Product Management</h1>
                <Link href="/admin/product/new" className="btn">Add New Product</Link>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--card-border)' }}>
                        <thead style={{ background: 'var(--light-bg)' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Product Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Created At</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                    <td style={{ padding: '1rem' }}>{p.name}</td>
                                    <td style={{ padding: '1rem' }}>{p.category}</td>
                                    <td style={{ padding: '1rem' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <Link href={`/admin/product/${p.id}`} style={{ marginRight: '1rem', color: 'var(--primary)' }}>Edit</Link>
                                        <button
                                            onClick={() => deleteProduct(p.id)}
                                            style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div style={{ marginTop: '3rem' }}>
                <button
                    onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }}
                    style={{ opacity: 0.6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}
                >
                    Sign Out
                </button>
            </div>
        </main>
    );
}
