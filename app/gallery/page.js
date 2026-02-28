import Hero from '@/components/Hero';

export const metadata = {
    title: 'Gallery | Evermix',
    description: 'Experience the world of Evermix through our brand videos and visuals.',
};

export default function Gallery() {
    const videoUrl = "https://umalswpelyzoqzxjgjzf.supabase.co/storage/v1/object/public/product-assets/upma%20video%20.mp4";

    return (
        <main>
            <Hero
                title="GALLERY"
                subtitle="Swaad Bhi, Speed Bhi in Action"
            />

            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Brand Showcase</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.8, lineHeight: '1.6' }}>
                            Discover the secret behind our perfect premixes. Watch how Evermix brings authentic taste
                            to your kitchen with unparalleled speed and consistency.
                        </p>
                    </div>

                    <div className="video-container">
                        <video
                            className="video-player"
                            controls
                            poster="/logo.png"
                            preload="metadata"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div style={{ marginTop: '5rem', opacity: 0.7 }}>
                        <p>More visuals and brand stories coming soon...</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
