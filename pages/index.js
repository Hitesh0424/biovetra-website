import Head from 'next/head';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <>
            <Head>
                <title>BIOVETRA - Pharmaceutical Excellence</title>
                <meta name="description" content="BIOVETRA Pharmaceuticals - Your trusted partner in healthcare. Quality medicines and healthcare solutions." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Hero />
                <Products />
                <Contact />
            </main>
        </>
    );
}
