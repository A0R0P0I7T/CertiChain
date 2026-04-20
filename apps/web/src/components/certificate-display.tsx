'use client';

import { txUrl } from '@/lib/contract';
import { Award, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CertificateDisplayProps {
  userName: string;
  courseName: string;
  hash: string;
  tokenId: bigint | null;
}

export function CertificateDisplay({
  userName,
  courseName,
  hash,
  tokenId,
}: CertificateDisplayProps) {
  const [copied, setCopied] = useState(false);
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  async function copyHash() {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 animate-fade-in">
      <div className="relative rounded-2xl border border-accent-lime/30 bg-forge-surface/80 backdrop-blur-sm overflow-hidden">
        {/* Decorative top gradient bar */}
        <div className="h-1 bg-gradient-to-r from-accent-cyan via-accent-lime to-accent-purple" />

        {/* Certificate Content */}
        <div className="p-8">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-lime/20 to-accent-cyan/20 border border-accent-lime/30 flex items-center justify-center">
              <Award className="w-8 h-8 text-accent-lime" />
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-xs font-medium text-accent-lime uppercase tracking-widest mb-1">
              Certificate Minted
            </p>
            <h3 className="text-xl font-bold text-forge-text">
              Course Completion
            </h3>
          </div>

          {/* Details Grid */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2.5 px-4 rounded-lg bg-forge-bg/60 border border-forge-border/50">
              <span className="text-xs text-forge-muted uppercase tracking-wider">Name</span>
              <span className="text-sm font-medium text-forge-text">{userName}</span>
            </div>

            <div className="flex justify-between items-center py-2.5 px-4 rounded-lg bg-forge-bg/60 border border-forge-border/50">
              <span className="text-xs text-forge-muted uppercase tracking-wider">Course</span>
              <span className="text-sm font-medium text-forge-text">{courseName}</span>
            </div>

            <div className="flex justify-between items-center py-2.5 px-4 rounded-lg bg-forge-bg/60 border border-forge-border/50">
              <span className="text-xs text-forge-muted uppercase tracking-wider">Date</span>
              <span className="text-sm font-medium text-forge-text">{timestamp}</span>
            </div>

            {tokenId !== null && (
              <div className="flex justify-between items-center py-2.5 px-4 rounded-lg bg-forge-bg/60 border border-forge-border/50">
                <span className="text-xs text-forge-muted uppercase tracking-wider">Token ID</span>
                <span className="text-sm font-mono font-medium text-accent-cyan">
                  #{tokenId.toString()}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-2.5 px-4 rounded-lg bg-forge-bg/60 border border-forge-border/50">
              <span className="text-xs text-forge-muted uppercase tracking-wider">Tx Hash</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-mono text-forge-muted">
                  {hash.slice(0, 6)}…{hash.slice(-4)}
                </span>
                <button
                  onClick={copyHash}
                  className="p-1 rounded hover:bg-forge-border/50 transition-colors"
                  title="Copy full hash"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-accent-lime" />
                  ) : (
                    <Copy className="w-3 h-3 text-forge-muted" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Explorer Link */}
          <a
            href={txUrl(hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-forge-border text-sm text-forge-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View on Arbiscan
          </a>
        </div>
      </div>
    </div>
  );
}
