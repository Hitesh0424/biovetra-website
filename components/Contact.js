import { useEffect, useState } from 'react';

export default function Contact() {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contact')
            .then(res => res.json())
            .then(data => {
                setContact(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!contact) {
        return null;
    }

    return (
        <section className="contact" id="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p>{contact.email}</p>
                        </div>
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p>{contact.phone}</p>
                        </div>
                        <div className="contact-item">
                            <h3>Address</h3>
                            <p>{contact.address}</p>
                        </div>
                    </div>

                    {contact.socialMedia && Object.values(contact.socialMedia).some(link => link) && (
                        <div className="social-links">
                            {contact.socialMedia.facebook && (
                                <a href={contact.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                                    f
                                </a>
                            )}
                            {contact.socialMedia.twitter && (
                                <a href={contact.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                    𝕏
                                </a>
                            )}
                            {contact.socialMedia.instagram && (
                                <a href={contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                                    📷
                                </a>
                            )}
                            {contact.socialMedia.linkedin && (
                                <a href={contact.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                    in
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
