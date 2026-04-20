'use client';

/**
 * useGetCertificate — wagmi v2 hook for reading certificate data from the contract.
 *
 * Calls getCertificate(tokenId) → (userName, courseName, completionDate)
 */

import { useReadContract } from 'wagmi';
import { CERTICHAIN_ABI } from '@/abi/CertiChainABI';
import { NFT_CONTRACT_ADDRESS } from '@/lib/contract';

export function useGetCertificate(tokenId: bigint | null) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: CERTICHAIN_ABI,
    functionName: 'getCertificate',
    args: tokenId !== null ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== null,
    },
  });

  // data is a tuple: [userName, courseName, completionDate]
  const certificate = data
    ? {
        userName: (data as [string, string, bigint])[0],
        courseName: (data as [string, string, bigint])[1],
        completionDate: (data as [string, string, bigint])[2],
      }
    : null;

  return {
    certificate,
    isLoading,
    error,
    refetch,
  };
}
