import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zintlr Component Library</title>
        <meta name="description" content="React component library by Zintlr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Zintlr Component Library
        </h1>
        
        <p className="text-lg mb-4">
          This is a Next.js-powered component library showcase.
        </p>
      </main>
    </div>
  );
} 