import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/admin.module.css';
import HeroEditor from '@/components/admin/HeroEditor';
import ProductsManager from '@/components/admin/ProductsManager';
import ContactEditor from '@/components/admin/ContactEditor';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('hero');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="loading">Loading...</div>;
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <Head>
                <title>BIOVETRA - Admin Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className={styles.dashboard}>
                <header className={styles.dashboardHeader}>
                    <h1 className={styles.dashboardTitle}>BIOVETRA Admin Dashboard</h1>
                    <button className={styles.btnLogout} onClick={() => signOut({ callbackUrl: '/admin/login' })}>
                        Logout
                    </button>
                </header>
                <div className={styles.dashboardContent}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'hero' ? styles.active : ''}`}
                            onClick={() => setActiveTab('hero')}
                        >
                            Hero Section
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            Products
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'contact' ? styles.active : ''}`}
                            onClick={() => setActiveTab('contact')}
                        >
                            Contact Info
                        </button>
                    </div>

                    {activeTab === 'hero' && <HeroEditor />}
                    {activeTab === 'products' && <ProductsManager />}
                    {activeTab === 'contact' && <ContactEditor />}
                </div>
            </div>
        </>
    );
}
