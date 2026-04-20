'use client';

import { WalletButton } from '@/components/wallet-button';
import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-forge-border/50 backdrop-blur-xl bg-forge-bg/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-forge-text tracking-tight">
            {process.env.NEXT_PUBLIC_APP_NAME || 'CertiChain'}
          </span>
        </div>

        {/* Wallet */}
        <WalletButton />
      </div>
    </header>
  );
}
