import Hero from '@/components/Hero';

export default function About() {
    return (
        <main>
            <Hero
                title="OUR STORY"
                subtitle="The Heart of Evermix"
            />

            <section className="section">
                <div className="container">
                    <div className="card">
                        <h2>About Evermix</h2>
                        <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                            Evermix was born from a passion for authentic culinary experiences and the need for convenience in a fast-paced world.
                            Our brand focuses on providing premium premixes that don't compromise on taste or quality.
                        </p>
                        <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                            With "Swaad Bhi, Speed Bhi!" as our motto, we ensure that every product delivers the traditional flavor you love
                            with the speed you need for your modern lifestyle.
                        </p>
                    </div>

                    <div className="card" style={{ marginTop: '2rem' }}>
                        <h2>Brand Brochure</h2>
                        <p style={{ marginTop: '1rem' }}>
                            Want to take a piece of Evermix with you? Download our digital brochure to see our full range and brand story.
                        </p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <a
                                href={`https://umalswpelyzoqzxjgjzf.supabase.co/storage/v1/object/public/product-assets/evermix%20broucher.pdf`}
                                target="_blank"
                                className="btn"
                            >
                                Download Brochure (PDF)
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
