import { useState } from 'react';
import styles from '@/styles/admin.module.css';

export default function HeroEditor() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Load hero data
    useState(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => setHero(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch('/api/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hero),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error updating hero:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!hero) return <div>Loading...</div>;

    return (
        <div className={styles.editorSection}>
            <h2 className={styles.editorTitle}>Hero Section</h2>
            {success && <div className={styles.successMessage}>Hero updated successfully!</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Title</label>
                    <input
                        type="text"
                        className={styles.formInputDark}
                        value={hero.title}
                        onChange={(e) => setHero({ ...hero, title: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Subtitle</label>
                    <input
                        type="text"
                        className={styles.formInputDark}
                        value={hero.subtitle}
                        onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea
                        className={`${styles.formInputDark} ${styles.formTextarea}`}
                        value={hero.description}
                        onChange={(e) => setHero({ ...hero, description: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>CTA Button Text</label>
                    <input
                        type="text"
                        className={styles.formInputDark}
                        value={hero.ctaText}
                        onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>CTA Link</label>
                    <input
                        type="text"
                        className={styles.formInputDark}
                        value={hero.ctaLink}
                        onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                    />
                </div>
                <button type="submit" className={styles.btnSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
