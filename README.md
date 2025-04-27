# DecentralMatch - Decentralized Dating Platform

A modern dating application built with decentralized identity and encrypted data storage using Verida protocol.

## Features

- **Decentralized Identity (DID)**: Users control their identity using Verida's DID solution
- **Encrypted Data Storage**: All profile data is stored in user-owned encrypted databases
- **Self-Sovereign Profile**: Users own their dating profile data
- **Privacy-First**: Share only what you want with who you want
- **Blockchain Integration**: Support for interoperability with blockchain applications

## Technologies

- Next.js 14
- Verida Protocol (Client SDK, Account Web Vault)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dating-blockchain.git
   cd dating-blockchain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_VERIDA_NETWORK=testnet
   NEXT_PUBLIC_CONTEXT_NAME="DecentralMatch Dating Application"
   NEXT_PUBLIC_LOGO_URL="https://your-logo-url.com/logo.png"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Verida Integration Details

This application uses Verida for decentralized identity and data storage:

1. **Verida Client Setup**: 
   - `app/lib/verida-client.ts` contains the client configuration
   - Uses the `@verida/client-ts` and `@verida/account-web-vault` packages

2. **Key Components**:
   - `OnboardingFlow`: Handles user onboarding and wallet connection
   - `ProfileCreationFlow`: Manages user profile creation using Verida
   - `ProfileService`: Service for storing and retrieving profile data

3. **Database Structure**:
   - `dating_profile`: Stores basic profile information
   - `dating_preferences`: Stores user preferences
   - `dating_photos`: Stores profile photos
   - `dating_matches`: Stores match information
   - `dating_messages`: Stores messages between users

## Usage

### User Authentication

1. Users connect to the application by scanning a QR code with their Verida Wallet
2. Once connected, a DID is established for the user
3. The user's DID is used to create and access their encrypted databases

### Profile Management

1. Basic profile data is stored in the user's Verida profile database
2. Photos are stored separately in the photos database
3. All data is encrypted and only accessible by the user or those they grant permission to

## Development

### Project Structure

```
app/
├── lib/
│   ├── verida-client.ts       # Verida client configuration
│   └── profile-service.ts     # Service for profile data operations
├── onboarding/                # Onboarding flow components
└── profile/                   # Profile creation components
```

### Adding New Features

1. Update `verida-client.ts` if you need to add new database types or functions
2. Extend `profile-service.ts` with new data operations
3. Implement new UI components that utilize these services

## Resources

- [Verida Documentation](https://developers.verida.network/protocol/client-sdk)
- [Verida Client SDK](https://developers.verida.network/protocol/client-sdk/how-it-works)
- [Verida Authentication](https://developers.verida.network/protocol/client-sdk/authentication)

## License

This project is licensed under the MIT License - see the LICENSE file for details.