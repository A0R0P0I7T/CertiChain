/**
 * Contract configuration — single source of truth.
 *
 * Reads the deployed address from the environment variable
 * so we never hardcode it anywhere in the UI layer.
 */

import type { Address, Chain } from 'viem';

/** Deployed CertiChain NFT contract address */
export const NFT_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_ADDRESS ?? '') as Address;

/** Target chain for all contract interactions */
export const TARGET_CHAIN_ID = 421614;

/** Arbitrum Sepolia chain config */
export const TARGET_CHAIN = {
  id: 421614,
  name: 'Arbitrum Sepolia',
} as Chain;

/** Arbiscan explorer base URL */
export const EXPLORER_URL = 'https://sepolia.arbiscan.io';

/** Build a transaction URL for the explorer */
export function txUrl(hash: string): string {
  return `${EXPLORER_URL}/tx/${hash}`;
}

/** Build a token URL for the explorer */
export function tokenUrl(tokenId: bigint | number): string {
  return `${EXPLORER_URL}/token/${NFT_CONTRACT_ADDRESS}?a=${tokenId}`;
}
