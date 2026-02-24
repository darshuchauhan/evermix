'use client';
import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductEditor({ params }) {
    const { id } = use(params);
    const isNew = id === 'new';
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        images: [],
        videos: [],
        brochure_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push('/admin/login');
            else if (!isNew) fetchProduct();
            else setLoading(false);
        }
        checkUser();
    }, [id]);

    async function fetchProduct() {
        const { data } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) setProduct(data);
        setLoading(false);
    }

    async function handleFileUpload(e, type) {
        const files = e.target.files;
        if (!files.length) return;
        setUploading(true);

        const newUrls = [];
        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${type}/${fileName}`;

            const { data, error } = await supabase.storage
                .from('product-assets')
                .upload(filePath, file);

            if (data) {
                const { data: { publicUrl } } = supabase.storage
                    .from('product-assets')
                    .getPublicUrl(filePath);
                newUrls.push(publicUrl);
            }
        }

        setProduct(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), ...newUrls]
        }));
        setUploading(false);
    }

    async function saveProduct(e) {
        e.preventDefault();
        setSaving(true);

        const { error } = isNew
            ? await supabase.from('products').insert([product])
            : await supabase.from('products').update(product).eq('id', id);

        if (!error) router.push('/admin');
        else alert(error.message);
        setSaving(false);
    }

    if (loading) return <div className="container section">Loading editor...</div>;

    return (
        <main className="container section">
            <Link href="/admin" style={{ display: 'inline-block', marginBottom: '2rem' }}>← Back to Dashboard</Link>
            <h1>{isNew ? 'Add New Product' : 'Edit Product'}</h1>

            <form onSubmit={saveProduct} style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
                <div className="card">
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Product Name</label>
                            <input
                                type="text"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                required
                                className="input-field"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                            <input
                                type="text"
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                required
                                placeholder="e.g. Premix, Desert, Soup"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                            <textarea
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                rows="5"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h2>Media Assets</h2>
                    <div style={{ marginTop: '1.5rem', display: 'grid', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Images</label>
                            <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'images')} disabled={uploading} />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto' }}>
                                {product.images?.map((url, i) => (
                                    <img key={i} src={url} style={{ height: '80px', borderRadius: '4px' }} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Videos</label>
                            <input type="file" multiple accept="video/*" onChange={(e) => handleFileUpload(e, 'videos')} disabled={uploading} />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                {product.videos?.length > 0 && <span>{product.videos.length} videos uploaded</span>}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Brochure URL (or upload image as brochure)</label>
                            <input
                                type="text"
                                value={product.brochure_url}
                                onChange={(e) => setProduct({ ...product, brochure_url: e.target.value })}
                                placeholder="https://..."
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn" disabled={saving || uploading}>
                        {saving ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </main>
    );
}
