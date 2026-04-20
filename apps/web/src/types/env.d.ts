declare namespace NodeJS {
  interface ProcessEnv {
    /** WalletConnect Cloud project ID (required) */
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;

    /** Application name for wallet dialogs */
    NEXT_PUBLIC_APP_NAME?: string;

    /** Deployed ERC-721 NFT contract address */
    NEXT_PUBLIC_NFT_ADDRESS?: string;

    /** ERC721 deployment API URL */
    ERC721_DEPLOYMENT_API_URL?: string;
  }
}
