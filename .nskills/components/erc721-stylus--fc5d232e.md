# ERC-721 NFT

| Field | Value |
|-------|-------|
| Type | `erc721-stylus` |
| ID | `fc5d232e` |
| Category | contracts |
| Tags | nft, erc721, stylus, arbitrum, collectible |
| Description | Deploy NFT collection on Arbitrum Stylus |

## User's Intent

> Modify this ERC-721 Stylus NFT contract to implement a Course Completion Certificate system.
> 
> Add the following features:
> 
> 1. Create a struct:
>    struct Certificate {
>    string userName;
>    string courseName;
>    uint256 completionDate;
>    }
> 
> 2. Add storage:
>    mapping(uint256 => Certificate) public certificates;
> 
> 3. Add a tokenId counter (auto-increment)
> 
> 4. Create a function:
>    mintCertificate(address to, string memory userName, string memory courseName)
> 
>    This function should:
> 
>    * Generate new tokenId
>    * Call safe_mint(to, tokenId)
>    * Store:
>      certificates[tokenId] = Certificate(userName, courseName, block.timestamp)
> 
> 5. Add a view function:
>    getCertificate(uint256 tokenId) returns (string memory, string memory, uint256)
> 
> 6. Keep existing ERC-721 functionality unchanged
> 
> Constraints:
> 
> * Keep code simple
> * Do not remove existing mint functions
> * Ensure compatibility with frontend calls
> 
> Goal:
> Each NFT should represent a unique course completion certificate with stored data.
> 

## Configuration

| Setting | Value |
|---------|-------|
| Collection Name | SuperPositionNFT |
| Collection Symbol | SPTNFT |
| Network | arbitrum-sepolia |
| Selected Functions | safe_mint |

## Environment Variables

| Key | Description | Required | Secret | Default |
|-----|-------------|----------|--------|---------|
| `NEXT_PUBLIC_NFT_ADDRESS` | Deployed ERC721 NFT address | No | No |  |
| `ERC721_DEPLOYMENT_API_URL` | URL of the ERC721 deployment API | No | No | http://localhost:4001 |

## Scripts

| Name | Command |
|------|---------|
| `deploy:erc721` | `ts-node scripts/deploy-erc721.ts` |
| `nft:info` | `ts-node scripts/nft-info.ts` |

## Documentation

### ERC-721 NFT Collection

# SuperPositionNFT (SPTNFT)

An ERC-721 NFT collection for Arbitrum Sepolia using Stylus.

## Collection Details

- **Name:** SuperPositionNFT
- **Symbol:** SPTNFT
- **Base URI:** https://api.example.com/metadata/
- **Network:** arbitrum-sepolia
- **Features:** ownable, mintable, burnable, pausable

## Deployment

```bash
pnpm deploy:erc721
```

This will deploy the NFT collection and output the contract address.

## Usage

### Get Collection Info

```typescript
import { fetchCollectionInfo } from '@/lib/erc721-nft';

const info = await fetchCollectionInfo();
console.log(info.name, info.symbol, info.totalSupply);
```

### Mint NFT (Owner Only)

```typescript
import { mintNFT } from '@/lib/erc721-nft';

const { hash, tokenId } = await mintNFT('0x...', privateKey);
console.log('Minted NFT #' + tokenId);
```

### Transfer NFT

```typescript
import { transferNFT } from '@/lib/erc721-nft';

await transferNFT('0x...from', '0x...to', 1n, privateKey);
```

## Contract Features

- **ownable**: Enabled
- **mintable**: Enabled
- **burnable**: Enabled
- **pausable**: Enabled


## File Structure

This component would generate the following files:

- `deploy-erc721.ts` (contract-scripts)
- `erc721-nft.ts` (frontend-lib)
- `ERC721NFTPanel.tsx` (frontend-components)

## Integration Points

**Provides to:**
- Frontend-scaffold (`b3d0eeb8`)

