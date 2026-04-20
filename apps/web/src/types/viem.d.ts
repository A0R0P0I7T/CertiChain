
declare module 'viem' {
  export type Address = `0x${string}`;
  export type Hash = `0x${string}`;
  export type Hex = `0x${string}`;

  export interface Chain {
    id: number;
    name: string;
    nativeCurrency: {
      decimals: number;
      name: string;
      symbol: string;
    };
    rpcUrls: {
      default: { http: readonly string[] };
      [key: string]: { http: readonly string[] };
    };
    blockExplorers?: {
      default: { name: string; url: string; apiUrl?: string };
      [key: string]: { name: string; url: string; apiUrl?: string };
    };
    testnet?: boolean;
  }

  export interface PublicClient {
    readContract(args: any): Promise<any>;
    simulateContract(args: any): Promise<any>;
    waitForTransactionReceipt(args: any): Promise<any>;
    getCode(args: any): Promise<any>;
  }

  export interface WalletClient {
    account?: { address: Address };
    writeContract(args: any): Promise<Hash>;
  }

  export function createConfig(config: any): any;
  export function http(url?: string): any;
  export function createStorage(config: any): any;
  export const cookieStorage: any;
}

