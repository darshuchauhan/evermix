import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import Hero from '@/components/Hero';

export default async function Products() {
    const supabase = createServerClient();
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Products Page Supabase Error:', error);
    }

    return (
        <main>
            <Hero
                title="OUR PRODUCTS"
                subtitle="Premium Premixes for Every Occasion"
            />

            <section className="section">
                <div className="container">
                    {!products || products.length === 0 ? (
                        <div style={{ textAlign: 'center' }}>
                            <p>No products available yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {products.map((product) => (
                                <Link key={product.id} href={`/products/${product.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    {product.images && product.images[0] && (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', height: '250px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <h2>{product.name}</h2>
                                    <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>{product.category}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
