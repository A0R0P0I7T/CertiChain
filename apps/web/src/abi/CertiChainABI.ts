/**
 * CertiChain Certificate NFT ABI
 *
 * Auto-generated from `cargo run --features export-abi` output.
 * MUST match the deployed Stylus contract exactly.
 *
 * Rust → Solidity name mapping (automatic camelCase):
 *   mint_certificate → mintCertificate
 *   get_certificate  → getCertificate
 *
 * Defined with `as const` for full wagmi/viem type inference.
 */

export const CERTICHAIN_ABI = [
  // ──────────────────────────────────────────────
  // Certificate Functions (custom)
  // ──────────────────────────────────────────────
  {
    type: 'function',
    name: 'mintCertificate',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'user_name', type: 'string' },
      { name: 'course_name', type: 'string' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getCertificate',
    inputs: [{ name: 'token_id', type: 'uint256' }],
    outputs: [
      { name: '', type: 'string' },
      { name: '', type: 'string' },
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
  },

  // ──────────────────────────────────────────────
  // Standard ERC-721 View Functions
  // ──────────────────────────────────────────────
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [{ name: 'token_id', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: '_interface', type: 'bytes4' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'pure',
  },

  // ──────────────────────────────────────────────
  // Standard ERC-721 Write Functions
  // ──────────────────────────────────────────────
  {
    type: 'function',
    name: 'mint',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [{ name: 'token_id', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'token_id', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'token_id', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'token_id', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'approved', type: 'address' },
      { name: 'token_id', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [{ name: 'token_id', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },

  // ──────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'approved', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
      { name: 'approved', type: 'bool', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'CertificateMinted',
    inputs: [
      { name: 'to', type: 'address', indexed: true },
      { name: 'token_id', type: 'uint256', indexed: true },
      { name: 'user_name', type: 'string', indexed: false },
      { name: 'course_name', type: 'string', indexed: false },
    ],
  },

  // ──────────────────────────────────────────────
  // Errors
  // ──────────────────────────────────────────────
  {
    type: 'error',
    name: 'InvalidTokenId',
    inputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'error',
    name: 'NotOwner',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'uint256' },
      { name: '', type: 'address' },
    ],
  },
  {
    type: 'error',
    name: 'NotApproved',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
      { name: '', type: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'TransferToZero',
    inputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'error',
    name: 'ReceiverRefused',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'uint256' },
      { name: '', type: 'bytes4' },
    ],
  },
] as const;
