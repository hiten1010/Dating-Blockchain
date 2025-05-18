# NFT Profile Minting

This guide explains how to use the NFT minting functionality in the dating app, which allows users to mint their profiles as NFTs on the Unichain Sepolia blockchain.

## Overview

The NFT minting functionality allows users to:
- Create a tamper-proof representation of their profile on the blockchain
- Link their Verida DID with their on-chain identity
- Control ownership and access to their profile data

## Technical Implementation

### Smart Contract

The NFT functionality uses a custom ProfileNFT contract (`ProfileNFT.sol`) deployed on the Unichain Sepolia blockchain. This is an ERC-721 NFT contract with additional functionality:

- `createProfile(string tokenURI)`: Mints a new profile NFT for the user with metadata URI
- `updateProfile(uint256 tokenId, string newTokenURI)`: Updates the metadata of an existing profile
- `burnProfile(uint256 tokenId)`: Burns (deletes) a profile NFT
- `hasProfile(address)`: Checks if an address has a profile NFT
- `UserProfileId(address)`: Retrieves the token ID of a profile NFT owned by an address

### Frontend Services

The following services handle interaction with the blockchain:

1. **NFT Service** (`app/services/nft-service.ts`)
   - Handles all contract interactions using ethers.js
   - Takes care of transaction management, errors, and event parsing
   
2. **Metadata Service** (`app/services/profile-metadata-service.ts`)
   - Generates proper metadata for the NFT
   - Stores profile data in Verida and generates a URI

3. **Wallet Integration** (`utils/wallet.ts`)
   - Handles wallet connection with Leap wallet
   - Manages chain switching to Unichain Sepolia

### User Flow

1. User fills out profile information (basic info, photos, preferences)
2. In the final step, user can review their profile and mint it as an NFT
3. On minting:
   - Profile data is stored in Verida
   - A metadata URI is generated
   - The NFT is minted on the blockchain
4. User receives their NFT token ID and can view the transaction on the blockchain explorer

## Installation and Setup

### Prerequisites

- Leap wallet extension installed in your browser
- ETH in your wallet for gas fees on Unichain Sepolia

### Contract Deployment

Before using the NFT functionality, deploy the contract:

1. Create a `.env` file with your private key:
   ```
   PRIVATE_KEY=your_wallet_private_key
   ```

2. Run the deployment script:
   ```
   node scripts/deploy-profile-nft.js
   ```

3. Update the contract address in `app/services/nft-service.ts`:
   ```typescript
   const PROFILE_NFT_CONTRACT_ADDRESS = "your_deployed_contract_address";
   ```

## Usage

The NFT minting functionality is exposed through the mint-nft-step.tsx component in the profile creation flow:

```typescript
// Example usage
import { nftService } from "@/app/services/nft-service";
import { profileMetadataService } from "@/app/services/profile-metadata-service";

// Generate and store metadata
const metadata = profileMetadataService.generateMetadata(profileData, didId);
const tokenURI = await profileMetadataService.storeMetadata(metadata);

// Mint the NFT
const { tokenId, txHash } = await nftService.createProfile(tokenURI);
```

## Troubleshooting

Common issues:

1. **Wallet Connection Error**: Make sure you have Leap wallet installed and have created an account for Unichain Sepolia.

2. **Transaction Error**: Ensure you have enough ETH for gas fees on Unichain Sepolia.

3. **Contract Error**: Verify you're using the correct contract address in the service.

## Future Enhancements

- Integration with IPFS for storing profile metadata
- Enhanced verification and proof mechanisms
- Support for profile updates/deletion
- Integration with more DID providers beyond Verida 