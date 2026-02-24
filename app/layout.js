import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Evermix | Swaad Bhi, Speed Bhi!',
  description: 'Premium food brand providing high-quality premixes for all your culinary needs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header removed as requested. Navigation is now part of the page heroes. */}
        {children}
        <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--card-border)', marginTop: '4rem', background: 'var(--light-bg)' }}>
          <div className="container" style={{ textAlign: 'center', opacity: 0.6 }}>
            <p>&copy; {new Date().getFullYear()} Evermix. All rights reserved.</p>
            <p>Swaad Bhi, Speed Bhi!</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
