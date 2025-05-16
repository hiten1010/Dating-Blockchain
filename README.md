# DecentralMatch - Decentralized Dating Platform

A modern dating application built with decentralized identity and encrypted data storage using Verida protocol.

## Features

- **Decentralized Identity (DID)**: Users control their identity using Verida's DID solution
- **Encrypted Data Storage**: All profile data is stored in user-owned encrypted databases
- **Self-Sovereign Profile**: Users own their dating profile data
- **Privacy-First**: Share only what you want with who you want
- **Blockchain Integration**: Support for interoperability with blockchain applications
- **Decentralized Chat**: Secure, private messaging stored on Verida blockchain
- **AI Twin Creation**: Build a blockchain-stored AI representation of yourself

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
   - `favourite`: Stores AI Twin data using Verida's Favourite schema

## Usage

### User Authentication

1. Users connect to the application by scanning a QR code with their Verida Wallet
2. Once connected, a DID is established for the user
3. The user's DID is used to create and access their encrypted databases

### Profile Management

1. Basic profile data is stored in the user's Verida profile database
2. Photos are stored separately in the photos database
3. All data is encrypted and only accessible by the user or those they grant permission to

## Profile System Architecture

The profile system provides users with complete ownership and control over their dating profile data through a decentralized architecture.

### Core Components

#### Client Infrastructure

* **`verida-client.ts`** - Core singleton client that manages Verida SDK initialization, connection, and context management
* **`verida-client-wrapper.tsx`** - Client-side wrapper for the Verida client to handle client/server rendering
* **`clientside-verida.tsx`** - React hooks for accessing Verida services in components

#### Data Services

* **`profile-service.ts`** - Manages profile data storage and retrieval using the Verida SDK directly
* **`profile-rest-service.ts`** - REST API service for profile operations using standard Verida schemas
* **`verida-schema-mapping.ts`** - Maps app data models to standard Verida schemas
* **`verida-token-utils.ts`** - Utilities for verifying and managing API tokens

### Profile Creation Flow

The profile creation process follows a multi-step workflow:

1. **DID Creation** (`create-did-step.tsx`)
   - Creates a decentralized identity on the Verida network
   - Establishes the foundation for user data ownership

2. **Basic Information** (`basic-info-step.tsx`)
   - Collects and stores essential profile information
   - Data is saved in encrypted Verida databases

3. **Photo Management** (`photos-step.tsx`)
   - Enables uploading and managing profile photos
   - Photos are stored securely in Verida storage

4. **Preferences & Interests** (`preferences-step.tsx`)
   - Captures user interests and relationship goals
   - Facilitates better matching algorithms

5. **NFT Minting** (`mint-nft-step.tsx`)
   - Transforms the user profile into an NFT
   - Provides on-chain verification of profile authenticity

6. **Completion** (`success-step.tsx`)
   - Confirms successful profile creation and NFT minting
   - Links to next steps in the application

### Wallet Integration

* **`connect-wallet-step.tsx`** - Handles wallet connection for blockchain interaction
* **`verification-step.tsx`** - Verifies user identity

### Database Schema

#### Profile Data (`social_post` schema)

The profile data utilizes Verida's standard `social_post` schema:

```javascript
{
  // Standard schema fields
  schema: "https://common.schemas.verida.io/social/post/v0.1.0/schema.json",
  name: "User's display name",
  content: "User's bio",
  uri: "dating:profile:{DID}",
  type: "status",
  
  // Custom metadata fields
  metadata: {
    profileType: "dating",
    age: "25",
    location: "New York",
    interests: ["Music", "Travel", "Art"],
    relationshipGoals: "long-term",
    primaryPhotoIndex: 0
  }
}
```

#### Photos Data (`file` schema)

Profile photos use Verida's standard `file` schema:

```javascript
{
  // Standard schema fields
  schema: "https://common.schemas.verida.io/file/v0.1.0/schema.json",
  name: "Profile Photo 1",
  extension: "jpg",
  mimeType: "image/jpeg",
  size: 102400,
  uri: "photo_url_or_data",
  
  // Custom metadata fields
  metadata: {
    profileType: "dating",
    description: "My primary photo",
    isPrivate: false,
    order: 0,
    did: "user:did"
  }
}
```

#### Preferences Data (`social_following` schema)

Dating preferences use Verida's standard `social_following` schema:

```javascript
{
  // Standard schema fields
  schema: "https://common.schemas.verida.io/social/following/v0.1.0/schema.json",
  name: "Dating Preferences",
  uri: "dating:preferences:{DID}",
  followedTimestamp: "2023-05-25T10:30:00Z",
  
  // Custom metadata fields
  metadata: {
    profileType: "dating",
    ageRange: { min: 18, max: 50 },
    locationPreference: "worldwide",
    distanceRange: 50,
    lookingFor: ["friendship", "relationship"],
    dealBreakers: ["smoking"]
  }
}
```

### NFT Profile Minting

The NFT minting process:

1. **Data Preparation** - Formats profile data and metadata for on-chain representation
2. **On-Chain Storage** - Public metadata is stored on-chain
3. **Off-Chain References** - Private data remains in Verida with secure references
4. **Blockchain Transaction** - NFT is minted on the Cheqd protocol
5. **Ownership Assignment** - NFT is assigned to the user's wallet address

#### NFT Metadata Structure

```javascript
{
  name: "DecentralMatch Profile - {DisplayName}",
  description: "Verified dating profile on DecentralMatch",
  image: "ipfs://hash-of-profile-image",
  attributes: [
    { trait_type: "Display Name", value: "User's display name" },
    { trait_type: "DID", value: "did:verida:user-did" },
    { trait_type: "Interest Count", value: 5 },
    { trait_type: "Photo Count", value: 3 },
    { trait_type: "Creation Date", value: "2023-05-01" }
  ],
  external_url: "https://app.decentralmatch.com/profile/{DID}"
}
```

### Data Privacy and Security

* All sensitive profile data is encrypted using Verida's encryption protocol
* Users explicitly control which data is public vs. private
* Public data available on-chain includes only basic discovery information
* Private data (specific preferences, photos, etc.) remains securely stored in Verida databases
* Access to private data requires explicit user permission

### Technical Flow

1. User creates a DID through Verida protocol
2. Profile data is stored in schema-compliant format in Verida databases
3. Data is mapped between app models and standard Verida schemas
4. When minting an NFT, public metadata is prepared for on-chain storage
5. The NFT links to the Verida-stored private data via secure references
6. User maintains full control of profile data and can revoke access at any time

## Chat System Database Architecture

The chat functionality uses Verida's decentralized data storage to ensure user privacy and data sovereignty. All chat messages are stored in encrypted blockchain databases.

### Schema Structure

The chat system utilizes the Verida social chat message schema:
`https://common.schemas.verida.io/social/chat/message/v0.1.0/schema.json`

### Database Collections

1. **Chat Messages Database (`social_chat_message`)**
   - Primary storage for all chat messages
   - Messages are encrypted end-to-end
   - Indexed by conversation groupId for efficient retrieval

### Chat System Implementation

The chat system is implemented through several key components working together:

1. **`app/chats/page.tsx`**:
   - Main page component for the chat functionality
   - Sets up the animated background and layout
   - Renders the ChatInterface component within the page structure
   - Manages global styles for chat animations

2. **`app/chats/components/chat-interface.tsx`**:
   - Core component that orchestrates the entire chat experience
   - Manages state for conversations, selected chats, and loading states
   - Handles loading chat groups from Verida blockchain
   - Implements methods for loading messages for specific conversations
   - Prevents duplicate API calls using reference caching
   - Formats blockchain data for display in the UI
   - Manages responsive layout for mobile and desktop views

3. **`app/chats/components/chat-list.tsx`**:
   - Displays the list of conversations from the blockchain
   - Handles conversation selection
   - Formats the last message and timestamp for each conversation
   - Shows blockchain verification status with the Shield icon
   - Displays AI twin indicators for messages from AI twins
   - Implements search functionality for filtering conversations

4. **`app/chats/components/conversation-panel.tsx`**:
   - Displays individual conversation thread with messages
   - Manages message input and sending
   - Sends messages to Verida blockchain with proper group identification
   - Implements AI mode toggle for enabling AI twin responses
   - Generates AI suggestions for messages
   - Formats incoming and outgoing messages
   - Handles message animations and typing indicators

### Message Data Structure

Chat messages are stored with the following fields:

```typescript
{
  name: string;           // Required name for the message record
  groupId: string;        // Unique conversation/group ID
  groupName: string;      // Name of the conversation/group
  type: 'send' | 'receive'; // Message direction
  messageText: string;    // Plain text message or JSON string of message dictionary
  messageHTML?: string;   // Optional HTML formatted message
  fromId: string;         // Sender's DID (decentralized identifier)
  fromHandle?: string;    // Optional sender's handle
  fromName?: string;      // Optional sender's display name
  sentAt: string;         // ISO timestamp
  isMessageDict?: boolean; // Indicates if messageText contains serialized messages
}
```

### Message Dictionary Format

For efficient storage, messages can be stored in a dictionary format:

```typescript
{
  "msg-1234567890": {
    id: "msg-1234567890",
    text: "Hello there!",
    fromId: "did:vda:0x...",
    fromName: "John",
    timestamp: "2023-06-15T10:30:00Z",
    read: true
  },
  "msg-0987654321": {
    id: "msg-0987654321",
    text: "Hi, how are you?",
    fromId: "did:vda:0x...",
    fromName: "Sarah",
    timestamp: "2023-06-15T10:31:00Z",
    read: false
  }
}
```

### Group Structure

Conversations are organized into groups with the following structure:

```typescript
{
  id: string;           // Unique group identifier
  name: string;         // Group name (often "Chat with [Username]")
  participants: {       // Array of participants
    did: string;        // Participant's DID
    name: string;       // Participant's name
    avatar?: string;    // Optional avatar URL
  }[];
  lastMessage?: ChatMessage; // Last message in the conversation
  unreadCount?: number; // Number of unread messages
  createdAt: string;    // ISO timestamp of creation
  updatedAt: string;    // ISO timestamp of last update
}
```

### Chat Message Processing Flow

1. **Message Creation**: 
   - When a user sends a message, it's formatted according to the schema
   - A unique message ID is generated
   - The message is stored with references to the conversation group

2. **Message Retrieval**:
   - Messages are retrieved by querying the database with the groupId
   - For direct messages, a consistent groupId is generated from both participants' DIDs
   - For group chats, a unique identifier is created at group formation

3. **Message Consolidation**:
   - Multiple message records for the same conversation are combined
   - Messages are sorted by timestamp
   - Unread status is tracked per message

4. **Group Management**:
   - Groups are created when a user initiates a new conversation
   - Group metadata includes participant information and conversation name
   - Last message and unread count are tracked at the group level

### Chat and AI Twin Integration

The chat system is designed to integrate with the AI Twin functionality:

- The conversation panel includes an AI Mode toggle
- When enabled, the user's AI twin can respond on their behalf
- AI responses are marked with a special indicator
- AI-generated suggestions help users craft messages
- Messages from AI twins are stored in the same blockchain structure with appropriate metadata

### Authentication and Privacy

- All chat data is encrypted using Verida's encryption protocols
- Only conversation participants can decrypt and read messages
- Each user's identity is verified through their DID
- Messages are stored in user-controlled databases, ensuring data sovereignty

### Implementation Details

Key files for the chat system:

- `app/lib/chat-message-service.ts`: Core service for chat operations
- `app/chats/page.tsx`: Main chat page container
- `app/chats/components/chat-interface.tsx`: Main chat UI orchestrator
- `app/chats/components/chat-list.tsx`: Conversation list component
- `app/chats/components/conversation-panel.tsx`: Individual conversation view
- `app/lib/verida-client.ts`: Verida client configuration for blockchain interaction

## AI Twin System Architecture

The AI Twin functionality allows users to create a digital representation of themselves stored securely on the Verida blockchain. This twin can interact with other users when the original user is offline, enhancing the dating experience.

### Schema Structure

The AI Twin system utilizes the Verida Favourite schema:
`https://common.schemas.verida.io/favourite/v0.1.0/schema.json`

### Database Collections

1. **AI Twin Database (`favourite`)**
   - Stores AI Twin personality data
   - Encrypted using Verida's protocols
   - Linked to the user's DID for authentication

### AI Twin Data Structure

AI Twin data is stored using the Verida Favourite schema with extensive metadata:

```typescript
{
  // Core Favourite schema fields
  name: string;               // Twin's name (usually the user's name)
  favouriteType: string;      // Set to "recommendation" 
  contentType: string;        // Set to "document"
  uri: string;                // Unique identifier for the twin
  schema: string;             // The Favourite schema URL
  description: string;        // Brief bio
  
  // AI Twin metadata
  metadata: {
    profileType: "ai-twin",   // Identifies this as an AI twin
    personalDetails: {        // Basic information
      age: string;
      location: string;
      occupation: string;
    },
    lifeStory: {              // Biographical information
      childhood: string;
      significantEvents: string[];
      achievements: string[];
      challenges: string[];
      lifePhilosophy: string;
    },
    personality: {            // Personality traits
      personalityTraits: string[];
      communicationStyle: string;
      humorStyle: string;
      emotionalResponses: Array<{ situation: string; response: string }>;
      decisionMakingStyle: string;
    },
    interests: {              // Interests and preferences
      interests: string[];
      hobbies: string[];
      expertise: string[];
      specificLikes: string[];
      specificDislikes: string[];
    },
    relationships: {          // Relationship preferences
      relationshipGoals: string;
      dealBreakers: string[];
      lookingFor: string[];
      pastRelationships: string;
      attachmentStyle: string;
    },
    values: {                 // Personal values
      coreValues: string[];
      beliefs: string[];
      politicalViews: string;
      spirituality: string;
    },
    communication: {          // Communication style
      conversationTopics: string[];
      avoidTopics: string[];
      communicationPatterns: string[];
      typicalPhrases: string[];
    },
    aiBehavior: {             // AI behavior configuration
      aiResponseStyle: string;
      aiProactiveness: number;
      aiPersonality: string;
      aiConfidentiality: string[];
    }
  },
  
  // Standard metadata
  insertedAt: string;         // Creation timestamp
  modifiedAt: string;         // Last modified timestamp
  sourceApplication: string;  // App identifier
  sourceId: string;           // Source record identifier
  did: string;                // User's DID
}
```

### AI Twin Creation Process

1. **Data Collection**:
   - User fills out an extensive form capturing personality traits, preferences, communication style, etc.
   - The multi-step form collects data across 8 categories: Personal Details, Life Story, Personality, Interests, Relationships, Values, Communication, and AI Behavior

2. **Data Storage**:
   - Data is formatted according to the Verida Favourite schema
   - The twin is stored in the user's encrypted Verida database
   - The twin is linked to the user's DID for authentication

3. **Twin Updating**:
   - Existing twins can be loaded and modified
   - Updates preserve the original record ID to avoid duplication

4. **Real-time Preview**:
   - Users can preview how their AI twin will respond to messages
   - Interactive chat simulation shows personality and communication style

### AI Twin Usage Flow

1. **Twin Creation/Updating**:
   - User creates or updates their AI twin through the multi-step form
   - All data is preserved in the Verida blockchain for future access

2. **Twin Integration with Chat**:
   - When enabled, the AI twin can respond on behalf of the user in chat conversations
   - The AI twin uses the stored personality data to generate authentic responses

3. **Privacy Controls**:
   - Users can specify confidential information that the twin should never share
   - Proactiveness levels control how often the twin initiates conversations

### Implementation Details

Key files for the AI Twin system:

- `app/lib/verida-ai-twin-service.ts`: Core service for AI twin operations with Verida blockchain
- `app/lib/clientside-verida.tsx`: Client-side wrapper for Verida functions with React hooks
- `app/create-twin/page.tsx`: Main page component for AI twin creation
- `app/create-twin/components/ai-twin-creation-form.tsx`: Multi-step form for capturing twin data
- `app/create-twin/components/ai-twin-preview.tsx`: Interactive preview of the AI twin's behavior

## Development

### Project Structure

```
app/
├── lib/
│   ├── verida-client.ts          # Verida client configuration
│   ├── verida-client-wrapper.tsx  # Client-side wrapper for Verida client
│   ├── clientside-verida.tsx     # React hooks for Verida integration
│   ├── verida-schema-mapping.ts  # Maps app data to Verida schemas
│   ├── verida-token-utils.ts     # Utilities for managing API tokens
│   ├── profile-service.ts        # Service for profile data using SDK
│   ├── profile-rest-service.ts   # REST API service for profile operations
│   ├── verida-ai-twin-service.ts # AI Twin service for Verida blockchain
│   ├── chat-message-service.ts   # Chat service for blockchain messages
├── onboarding/                   # Onboarding flow components
│   └── components/               # Onboarding step components
│       ├── connect-wallet-step.tsx # Wallet connection step
│       ├── create-did-step.tsx   # DID creation step
│       ├── verification-step.tsx # User verification step
│       └── success-step.tsx      # Onboarding completion step
├── profile/                      # Profile creation components
│   └── components/               # Profile creation step components
│       ├── basic-info-step.tsx   # Basic profile info collection
│       ├── photos-step.tsx       # Photo upload and management
│       ├── preferences-step.tsx  # Interests and preferences collection
│       ├── mint-nft-step.tsx     # NFT minting functionality
│       └── success-step.tsx      # Profile creation completion
├── chats/                        # Chat interface components
│   ├── page.tsx                  # Main chat page
│   └── components/               # Chat UI components
│       ├── chat-interface.tsx    # Main chat orchestrator
│       ├── chat-list.tsx         # Conversation list
│       └── conversation-panel.tsx # Individual conversation view
└── create-twin/                  # AI Twin creation components
    ├── page.tsx                  # Main AI Twin creation page
    └── components/               # AI Twin creation components
        ├── ai-twin-creation-form.tsx  # Multi-step form for AI Twin creation
        └── ai-twin-preview.tsx        # Interactive AI Twin preview
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