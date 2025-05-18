# Cheqd NFT Creation Guide

This document explains how the platform integrates Cheqd decentralized identity with NFT profiles on Unichain Sepolia blockchain.

## Overview

The Dating Blockchain platform creates a secure digital identity solution by:
1. Linking Cheqd DIDs with NFT profiles
2. Storing sensitive data off-chain via Verida protocol
3. Recording ownership and verification on-chain via NFT minting

## Technical Components

### Smart Contract

The Profile NFT contract is deployed at `0x968Cd0A56cAc23332c846957064A99Eabbdc464E` on Unichain Sepolia and provides:

- One profile NFT per wallet address
- Profile metadata linked to Verida storage
- Ownership verification and transfer capabilities

### Cheqd Integration 

When a profile NFT is minted, the following occurs:

1. User's Cheqd DID document is updated to include:
   - NFT transaction details
   - Token ID reference
   - Verida DID link for encrypted data access
   - Contract address and chain information

2. The DID document includes multiple service endpoints:
   ```json
   "service": [
     {
       "id": "did:cheqd:testnet:abcd1234#service-1",
       "type": "LinkedDomains",
       "serviceEndpoint": ["https://example.com"]
     },
     {
       "id": "did:cheqd:testnet:abcd1234#nft-profile",
       "type": "ProfileNFT",
       "serviceEndpoint": [{
         "uri": "https://sepolia.uniscan.xyz/tx/0x52178bef007c0224e5a65261f507d18a3db923280a618b13b1c4dff793060f8b",
         "tokenId": "4152",
         "contractAddress": "0x968Cd0A56cAc23332c846957064A99Eabbdc464E",
         "chainId": "1301",
         "chainName": "Unichain Sepolia",
         "transactionHash": "0x52178bef007c0224e5a65261f507d18a3db923280a618b13b1c4dff793060f8b"
       }]
     },
     {
       "id": "did:cheqd:testnet:abcd1234#verida-identity",
       "type": "VeridaDID",
       "serviceEndpoint": ["did:verida:0x8F44d780A59b252Aeb9Fb4C9dACA5376899BCd97:86125e4cf78b1f8d"]
     }
   ]
   ```

## NFT Minting Process

1. **Preparation**:
   - User connects both Leap wallet (for blockchain transactions) and Cheqd wallet (for DID)
   - Profile data is collected and stored encrypted via Verida protocol
   - Metadata is prepared for the NFT

2. **Minting**:
   - The NFT contract verifies the user doesn't already have a profile NFT 
   - NFT is minted with a URI pointing to the encrypted profile data
   - Transaction hash and token ID are recorded

3. **DID Update**:
   - Cheqd DID document is updated to include NFT information
   - Verida DID reference is added for encrypted data access
   - Both identifiers are now cryptographically linked

4. **Storage**:
   - Transaction details are saved in localStorage for app reference
   - Profile display shows verification from blockchain

## Error Handling

The smart contract prevents a single address from minting multiple NFTs. If a user attempts to mint when they already have an NFT, the transaction will fail with:

```
Error: execution reverted: Already minted
```

In this case, the application should:
1. Check if user already has an NFT before attempting to mint
2. If already minted, load existing NFT details instead
3. Allow profile updates without requiring a new NFT

## Security and Privacy

This dual-system architecture provides:

- **Public verification** - Anyone can verify profile ownership via the blockchain
- **Privacy protection** - Only the user controls access to their private data
- **Identity portability** - The DID can be used across multiple services
- **Revocable access** - User can revoke access to their encrypted data at any time

## Implementation Files

Key files in the implementation:
- `app/lib/cheqd-service.ts` - Cheqd DID management
- `app/services/nft-service.ts` - NFT contract interaction
- `app/profile/components/steps/mint-nft-step.tsx` - NFT minting UI
- `app/user/components/nft-details.tsx` - NFT display UI
- `app/user/components/off-chain-data.tsx` - Verida data display

## Troubleshooting

If you encounter errors during minting:

1. **"Already minted"** - This wallet address already has an NFT profile
   - Solution: Check if the wallet has an NFT before attempting to mint
   - Use the `hasProfile()` method from the NFT service

2. **DID update failure** - Cheqd DID document wasn't updated
   - Solution: The minting process will continue, but you may need to manually update the DID document

3. **Transaction timeout** - Blockchain transaction took too long
   - Solution: Check the transaction on the explorer or try again with higher gas 