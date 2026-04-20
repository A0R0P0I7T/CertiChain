'use client';

import { useState, useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { useMintCertificate } from '@/hooks/useMintCertificate';
import { TARGET_CHAIN_ID } from '@/lib/contract';
import { Loader2, Sparkles, AlertCircle, Wallet } from 'lucide-react';

interface CertificateMintFormProps {
  onMintSuccess?: (data: {
    hash: string;
    tokenId: bigint | null;
    userName: string;
    courseName: string;
  }) => void;
}

export function CertificateMintForm({ onMintSuccess }: CertificateMintFormProps) {
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [validationError, setValidationError] = useState('');

  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { mint, reset, hash, tokenId, status, error } = useMintCertificate();

  // Hydration safety (per nskills frontend-scaffold spec)
  useEffect(() => setMounted(true), []);

  // Notify parent on success
  useEffect(() => {
    if (status === 'success' && hash && onMintSuccess) {
      onMintSuccess({
        hash,
        tokenId,
        userName,
        courseName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!mounted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-2xl border border-forge-border bg-forge-surface p-8 animate-pulse">
          <div className="h-8 bg-forge-elevated rounded w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-forge-elevated rounded w-1/2 mx-auto mb-8" />
          <div className="h-12 bg-forge-elevated rounded mb-4" />
          <div className="h-12 bg-forge-elevated rounded mb-6" />
          <div className="h-12 bg-forge-elevated rounded" />
        </div>
      </div>
    );
  }

  const isWrongNetwork = isConnected && chain?.id !== TARGET_CHAIN_ID;

  function validate(): boolean {
    setValidationError('');
    if (!userName.trim()) {
      setValidationError('Please enter your name');
      return false;
    }
    if (userName.trim().length < 2) {
      setValidationError('Name must be at least 2 characters');
      return false;
    }
    if (!courseName.trim()) {
      setValidationError('Please enter the course name');
      return false;
    }
    if (courseName.trim().length < 2) {
      setValidationError('Course name must be at least 2 characters');
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isConnected) {
      setValidationError('Please connect your wallet first');
      return;
    }

    if (isWrongNetwork) {
      switchChain?.({ chainId: TARGET_CHAIN_ID });
      return;
    }

    if (!validate()) return;

    try {
      mint({ userName: userName.trim(), courseName: courseName.trim() });
    } catch (err) {
      // Handled by hook error state
    }
  }

  function handleReset() {
    reset();
    setUserName('');
    setCourseName('');
    setValidationError('');
  }

  const isLoading = status === 'pending' || status === 'confirming';

  // Derive user-friendly error message
  let errorMessage = '';
  if (validationError) {
    errorMessage = validationError;
  } else if (error) {
    const msg = error.message || '';
    if (msg.includes('User rejected') || msg.includes('user rejected')) {
      errorMessage = 'Transaction was rejected. Please try again.';
    } else if (msg.includes('insufficient funds')) {
      errorMessage = 'Insufficient funds for gas. Get testnet ETH from a faucet.';
    } else if (msg.includes('execution reverted')) {
      errorMessage = 'Transaction reverted. The contract may not support this operation yet.';
    } else {
      errorMessage = msg.length > 120 ? msg.slice(0, 120) + '…' : msg;
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-forge-border bg-forge-surface/80 backdrop-blur-sm p-8 shadow-2xl shadow-accent-cyan/5"
      >
        {/* Decorative glow */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-accent-cyan/20 via-transparent to-accent-purple/10 -z-10 blur-sm" />

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-forge-text mb-2">
            Mint Certificate
          </h2>
          <p className="text-sm text-forge-muted">
            Issue a verifiable NFT certificate on Arbitrum
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label
              htmlFor="cert-name"
              className="block text-xs font-medium text-forge-muted mb-1.5 uppercase tracking-wider"
            >
              Recipient Name
            </label>
            <input
              id="cert-name"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setValidationError('');
              }}
              placeholder="e.g. John Doe"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-forge-bg border border-forge-border text-forge-text placeholder:text-forge-muted/50 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/30 transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="cert-course"
              className="block text-xs font-medium text-forge-muted mb-1.5 uppercase tracking-wider"
            >
              Course Name
            </label>
            <input
              id="cert-course"
              type="text"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                setValidationError('');
              }}
              placeholder="e.g. Blockchain Fundamentals"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-forge-bg border border-forge-border text-forge-text placeholder:text-forge-muted/50 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/30 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-accent-coral/10 border border-accent-coral/20">
            <AlertCircle className="w-4 h-4 text-accent-coral shrink-0 mt-0.5" />
            <p className="text-sm text-accent-coral">{errorMessage}</p>
          </div>
        )}

        {/* Action Button */}
        {!isConnected ? (
          <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-forge-border text-forge-muted text-sm">
            <Wallet className="w-4 h-4" />
            Connect your wallet to mint
          </div>
        ) : isWrongNetwork ? (
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-accent-amber/20 text-accent-amber border border-accent-amber/30 hover:bg-accent-amber/30 transition-all"
          >
            Switch to Arbitrum Sepolia
          </button>
        ) : status === 'success' ? (
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-accent-lime/20 text-accent-lime border border-accent-lime/30 hover:bg-accent-lime/30 transition-all"
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Mint Another Certificate
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-accent-cyan to-accent-purple text-white hover:shadow-lg hover:shadow-accent-cyan/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'pending' ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirm in Wallet…
              </span>
            ) : status === 'confirming' ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming on Chain…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Mint Certificate
              </span>
            )}
          </button>
        )}
      </form>
    </div>
  );
}
