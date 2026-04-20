'use client';

/**
 * useMintCertificate — wagmi v2 hook for minting course completion certificates.
 *
 * Uses useWriteContract + useWaitForTransactionReceipt for proper
 * lifecycle tracking: idle → pending → confirming → success | error.
 */

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { CERTICHAIN_ABI } from '@/abi/CertiChainABI';
import { NFT_CONTRACT_ADDRESS } from '@/lib/contract';
import type { Address } from 'viem';

export interface MintCertificateParams {
  userName: string;
  courseName: string;
}

export function useMintCertificate() {
  const { address } = useAccount();

  const {
    data: hash,
    error: writeError,
    isPending: isWritePending,
    writeContract,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
    data: receipt,
  } = useWaitForTransactionReceipt({ hash });

  /** Fire the mintCertificate transaction */
  function mint({ userName, courseName }: MintCertificateParams) {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: CERTICHAIN_ABI,
      functionName: 'mintCertificate',
      args: [address as Address, userName, courseName],
      account: address,
    });
  }

  // Derive a tokenId from the Transfer event in the receipt logs
  let tokenId: bigint | null = null;
  if (receipt?.logs) {
    for (const log of receipt.logs) {
      // Transfer event topic: keccak256("Transfer(address,address,uint256)")
      if (
        log.topics[0] ===
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
      ) {
        // tokenId is the third indexed param (topics[3])
        if (log.topics[3]) {
          tokenId = BigInt(log.topics[3]);
        }
      }
    }
  }

  const error = writeError || confirmError;

  /** Overall status string for the UI */
  const status: 'idle' | 'pending' | 'confirming' | 'success' | 'error' =
    error
      ? 'error'
      : isSuccess
        ? 'success'
        : isConfirming
          ? 'confirming'
          : isWritePending
            ? 'pending'
            : 'idle';

  return {
    mint,
    reset,
    hash,
    tokenId,
    receipt,
    status,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error,
  };
}
