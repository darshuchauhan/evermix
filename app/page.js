import { createServerClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function Home() {
  const supabase = createServerClient();

  const { data: featuredProducts, error } = await supabase
    .from('products')
    .select('*')
    .limit(4)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Home Page Supabase Error:', error);
  }

  return (
    <main>
      <section className="hero" style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '2rem 0 6rem 0'
      }}>
        <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/logo.png" alt="Evermix Logo" style={{ height: '200px', width: 'auto', marginBottom: '2rem' }} />
          <h1 className="brand-name" style={{ display: 'none' }}>EVERMIX</h1>
          <p className="tagline" style={{ fontSize: '1.8rem', letterSpacing: '0.1em' }}>SWAAD BHI, SPEED BHI!</p>

          <div style={{ marginTop: '3rem' }}>
            <Link href="/products" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Our Range
            </Link>
          </div>
        </div>

        <nav style={{
          position: 'absolute',
          bottom: '2rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          fontWeight: '600',
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Link href="/" style={{ borderBottom: '2px solid white' }}>Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About Us</Link>
        </nav>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '3rem' }}>Featured Products</h2>
          {!featuredProducts || featuredProducts.length === 0 ? (
            <p>Ready to discover our premixes? Check back very soon!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="card" style={{ textAlign: 'left', textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  {product.images?.[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem', height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <h3>{product.name}</h3>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>{product.category}</p>
                </Link>
              ))}
            </div>
          )}
          <div style={{ marginTop: '4rem' }}>
            <Link href="/products" className="btn">View All Products</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: 0 }}>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <img src="/footer-1-section.png" alt="Evermix Brand Showcase Part 1" style={{ width: '100%', display: 'block' }} />
          <img src="/footer-2-section.png" alt="Evermix Brand Showcase Part 2" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2>About Evermix</h2>
            <p style={{ marginTop: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
              Evermix is a trusted brand offering high-quality premixes, masalas, spices, and specialty ingredients designed to bring authentic Indian flavors to every kitchen. We combine traditional recipes with modern convenience, making cooking faster, easier, and more consistent without compromising on taste or nutrition.
            </p>
            <p style={{ marginTop: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
              Along with retail and home use, Evermix also proudly serves the HoReCa segment (Hotels, Restaurants, Cafés & Caterers) with bulk supply options and consistent quality that chefs can rely on.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Connect with Us</h2>
          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Contact Person</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>V. Akanksha</p>
            </div>
            <div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Call Us</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>+91 7383312090</p>
            </div>
            <div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Email</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>evermixrtc@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
