import { useEffect, useState } from 'react';

export default function Hero() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                setHero(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching hero:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!hero) {
        return null;
    }

    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>{hero.title}</h1>
                <h2>{hero.subtitle}</h2>
                <p>{hero.description}</p>
                <a href={hero.ctaLink} className="cta-button">
                    {hero.ctaText}
                </a>
            </div>
        </section>
    );
}
