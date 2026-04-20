# 📜 CertiChain

**CertiChain** is a decentralized platform for issuing and verifying course completion certificates as ERC-721 NFTs on the **Arbitrum Stylus** network. By leveraging the power of Rust on-chain, CertiChain provides a tamper-proof, permanent, and cost-effective way to manage academic and professional credentials.

> [!IMPORTANT]  
> **Status: UI Feature Showcase**  
> Due to temporary gas constraints for live deployment, the project is currently configured to showcase the **Frontend UI and UX**. While the Rust smart contract logic is fully implemented and verified (WASM generated), live contract interactions are currently disabled/limited in this demo version.

---

## 🚀 Key Features

- **Decentralized Issuance**: Mint verifiable certificates directly to a user's wallet.
- **On-Chain Metadata**: Certificates store the student's name, course name, and completion timestamp directly on the Arbitrum blockchain.
- **Arbitrum Stylus Powered**: High-performance smart contracts written in Rust for minimal gas costs and maximum safety.
- **Modern Web3 UX**: A sleek, dark-themed interface with glassmorphic elements and seamless wallet integration.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Web3 Integration**: [Wagmi v2](https://wagmi.sh/), [RainbowKit](https://www.rainbowkit.com/), [Viem](https://viem.sh/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Smart Contracts
- **Language**: [Rust](https://www.rust-lang.org/)
- **SDK**: [Arbitrum Stylus SDK](https://github.com/OffchainLabs/stylus-sdk-rs)
- **Standard**: ERC-721 (Non-Fungible Tokens)
- **Environment**: Arbitrum Sepolia (Testnet)

---

## 🏗️ Project Structure

```bash
CertiChain/
├── apps/
│   └── web/                # Next.js Application
│       ├── src/
│       │   ├── abi/        # Contract ABIs (Regenerated from Rust)
│       │   ├── app/        # Page routes & Layouts
│       │   ├── components/ # UI Components (Forms, Displays, Header)
│       │   ├── hooks/      # Custom Wagmi hooks for Minting/Reading
│       │   └── lib/        # Wagmi & Contract configurations
│       └── tailwind.config.js
├── contracts/
│   └── erc721/             # Rust Stylus Smart Contract
│       ├── src/
│       │   ├── lib.rs      # Main contract logic & Storage
│       │   └── erc721.rs   # ERC-721 implementation
│       ├── Cargo.toml      # Rust dependencies
│       └── Stylus.toml     # Stylus deployment configuration
└── README.md
```

---

## 🧠 Smart Contract Logic

The core logic resides in `contracts/erc721/src/lib.rs`. It extends a standard ERC-721 implementation with custom certificate metadata storage.

### Data Structures
- **`Certificate` Struct**: Stores `user_name` (string), `course_name` (string), and `completion_date` (U256).
- **`certificates` Mapping**: Maps `token_id` to its unique `Certificate` data.

### Core Functions
1.  **`mint_certificate`**: 
    - Increments the `total_supply`.
    - Mints a new NFT to the recipient address.
    - Stores the student's name, course, and current block timestamp on-chain.
    - Emits a `CertificateMinted` event.
2.  **`get_certificate`**: 
    - A view function that retrieves the triple data (Name, Course, Date) for a given Token ID.

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18+)
- **npm** or **pnpm**
- **Rust Toolchain** (if you wish to build the contracts)
- **WSL2** (Recommended for Windows users to run `cargo-stylus`)

### Frontend Setup
1.  Navigate to the web app directory:
    ```bash
    cd apps/web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Copy `.env.example` to `.env` and fill in the following:
    ```env
    NEXT_PUBLIC_NFT_ADDRESS=0x... # Deployed contract address
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
    Access the UI at `http://localhost:3000`.

### Smart Contract build (WSL/Linux)
1.  Navigate to the contract directory:
    ```bash
    cd contracts/erc721
    ```
2.  Build the WASM binary:
    ```bash
    cargo build --target wasm32-unknown-unknown --release
    ```
3.  Check if it's ready for Stylus:
    ```bash
    cargo stylus check --endpoint https://sepolia-rollup.arbitrum.io/rpc
    ```

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ for the Arbitrum Ecosystem.*
