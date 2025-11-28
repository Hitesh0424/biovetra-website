import { useState } from 'react';
import styles from '@/styles/admin.module.css';

export default function ContactEditor() {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Load contact data
    useState(() => {
        fetch('/api/contact')
            .then(res => res.json())
            .then(data => setContact(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!contact) return <div>Loading...</div>;

    return (
        <div className={styles.editorSection}>
            <h2 className={styles.editorTitle}>Contact Information</h2>
            {success && <div className={styles.successMessage}>Contact info updated successfully!</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input
                        type="email"
                        className={styles.formInputDark}
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone</label>
                    <input
                        type="text"
                        className={styles.formInputDark}
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Address</label>
                    <textarea
                        className={`${styles.formInputDark} ${styles.formTextarea}`}
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    />
                </div>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Social Media Links</h3>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Facebook</label>
                    <input
                        type="url"
                        className={styles.formInputDark}
                        value={contact.socialMedia?.facebook || ''}
                        onChange={(e) => setContact({
                            ...contact,
                            socialMedia: { ...contact.socialMedia, facebook: e.target.value }
                        })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Twitter</label>
                    <input
                        type="url"
                        className={styles.formInputDark}
                        value={contact.socialMedia?.twitter || ''}
                        onChange={(e) => setContact({
                            ...contact,
                            socialMedia: { ...contact.socialMedia, twitter: e.target.value }
                        })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Instagram</label>
                    <input
                        type="url"
                        className={styles.formInputDark}
                        value={contact.socialMedia?.instagram || ''}
                        onChange={(e) => setContact({
                            ...contact,
                            socialMedia: { ...contact.socialMedia, instagram: e.target.value }
                        })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>LinkedIn</label>
                    <input
                        type="url"
                        className={styles.formInputDark}
                        value={contact.socialMedia?.linkedin || ''}
                        onChange={(e) => setContact({
                            ...contact,
                            socialMedia: { ...contact.socialMedia, linkedin: e.target.value }
                        })}
                    />
                </div>
                <button type="submit" className={styles.btnSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
