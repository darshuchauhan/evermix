import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }) {
    const { id } = await params;
    const supabase = createServerClient();

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (!product) {
        notFound();
    }

    return (
        <main>
            {/* Simple Top Bar for Internal Pages */}
            <header style={{ padding: '1.5rem 0', background: 'var(--primary)', color: 'white' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/">
                        <img src="/logo.png" alt="Evermix Logo" style={{ height: '60px', width: 'auto' }} />
                    </Link>
                    <nav style={{ display: 'flex', gap: '2rem', fontWeight: 'bold' }}>
                        <Link href="/">Home</Link>
                        <Link href="/products">Products</Link>
                        <Link href="/about">About</Link>
                    </nav>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <Link href="/products" style={{ marginBottom: '2rem', display: 'inline-block', color: 'var(--primary)', fontWeight: 'bold' }}>← Back to Products</Link>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                        <div className="media-gallery">
                            {product.images?.[0] ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                />
                            ) : (
                                <div style={{ width: '100%', aspectRatio: '1', background: 'var(--light-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No primary image
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                                {product.images?.slice(1).map((img, idx) => (
                                    <img key={idx} src={img} alt={`${product.name} gallery`} style={{ width: '100%', borderRadius: '8px' }} />
                                ))}
                            </div>
                        </div>

                        <div className="details">
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.category}</span>
                            <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{product.name}</h1>
                            <p style={{ marginTop: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>{product.description}</p>

                            {product.videos?.length > 0 && (
                                <div style={{ marginTop: '2.5rem' }}>
                                    <h3>Videos</h3>
                                    <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                        {product.videos.map((vid, idx) => (
                                            <video key={idx} src={vid} controls style={{ width: '100%', borderRadius: '8px' }} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.brochure_url && (
                                <div style={{ marginTop: '2.5rem' }}>
                                    <a href={product.brochure_url} target="_blank" className="btn">View Product Brochure</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
