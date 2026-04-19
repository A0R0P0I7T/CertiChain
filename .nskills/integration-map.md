# Integration Map

How components connect and what data flows between them.

### Frontend-scaffold --> Wallet-auth

- **Source**: Frontend-scaffold (`b3d0eeb8`)
  - Output ports: App Context (config)
- **Target**: Wallet-auth (`b2dbd482`)
  

### Erc721-stylus --> Frontend-scaffold

- **Source**: Erc721-stylus (`fc5d232e`)
  - Output ports: NFT Contract (contract)
- **Target**: Frontend-scaffold (`b3d0eeb8`)
  - Input ports: Contract ABI (contract), Network Config (config)
