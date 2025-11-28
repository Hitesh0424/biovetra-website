import Head from 'next/head';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <>
            <Head>
                <title>Website CMS - Home</title>
                <meta name="description" content="Modern website with admin panel CMS" />
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
