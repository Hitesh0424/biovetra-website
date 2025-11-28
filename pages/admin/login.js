import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/admin.module.css';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError('Invalid email or password');
            } else {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>BIOVETRA - Admin Login</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className={styles.adminContainer}>
                <div className={styles.loginBox}>
                    <h1 className={styles.loginTitle}>BIOVETRA Admin Portal</h1>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email</label>
                            <input
                                type="email"
                                className={styles.formInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Password</label>
                            <input
                                type="password"
                                className={styles.formInput}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.btnPrimary}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
