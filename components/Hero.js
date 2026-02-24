import Link from 'next/link';

export default function Hero({ title, subtitle, showNav = true }) {
    return (
        <section className="hero" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            padding: '3rem 0 6rem 0'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <Link href="/">
                    <img src="/logo.png" alt="Evermix Logo" style={{ height: '120px', width: 'auto', marginBottom: '1.5rem' }} />
                </Link>
                {title && <h1 className="brand-name">{title}</h1>}
                {subtitle && <p className="tagline">{subtitle}</p>}
            </div>

            {showNav && (
                <nav style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2.5rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/about">About Us</Link>
                </nav>
            )}
        </section>
    );
}
