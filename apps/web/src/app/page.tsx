'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CertificateMintForm } from '@/components/certificate-mint-form';
import { CertificateDisplay } from '@/components/certificate-display';

interface MintedCert {
  hash: string;
  tokenId: bigint | null;
  userName: string;
  courseName: string;
}

export default function Home() {
  const [mintedCert, setMintedCert] = useState<MintedCert | null>(null);

  return (
    <div className="min-h-screen bg-forge-bg text-forge-text">
      <Header />

      <main className="pt-24 pb-16 px-6">
        {/* Hero */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forge-border text-xs text-forge-muted mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
            Arbitrum Sepolia
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-forge-text via-accent-cyan to-accent-purple bg-clip-text text-transparent">
            CertiChain
          </h1>

          <p className="text-lg text-forge-muted leading-relaxed">
            Mint verifiable course completion certificates as NFTs on Arbitrum.
            <br className="hidden sm:block" />
            Permanent, tamper-proof, and blockchain-verified.
          </p>
        </div>

        {/* Mint Form */}
        <CertificateMintForm
          onMintSuccess={(data) => setMintedCert(data)}
        />

        {/* Certificate Display — appears after successful mint */}
        {mintedCert && (
          <CertificateDisplay
            userName={mintedCert.userName}
            courseName={mintedCert.courseName}
            hash={mintedCert.hash}
            tokenId={mintedCert.tokenId}
          />
        )}

        {/* Footer area */}
        <div className="mt-16 text-center">
          <p className="text-xs text-forge-muted/60">
            Built with Arbitrum Stylus • ERC-721 •{' '}
            <a
              href="https://sepolia.arbiscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-forge-muted transition-colors"
            >
              Explorer
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}