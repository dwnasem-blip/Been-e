# WAIN - وين راح؟
**Smart Personal Memory iOS Application**

A professional iOS application that serves as a smart personal memory assistant to help users organize and retrieve information about their belongings, receipts, warranties, documents, and more.

---

## 🎯 Project Overview

WAIN (وين راح؟ - "Where did it go?") is a mobile-first application designed exclusively for iPhone that leverages AI and computer vision to help users:

- **Remember item locations** - Keep track of where you've placed your belongings
- **Manage documents** - Store and organize receipts, invoices, and certificates
- **Track warranties** - Monitor warranty expiration dates with smart reminders
- **Manage subscriptions** - Keep track of recurring payments and renewals
- **Log loans** - Record items you've lent to others
- **Search intelligently** - Natural language search across all your data
- **Get AI assistance** - Ask the smart assistant questions about your stored items

---

## 🛠 Tech Stack

### Core Framework
- **React Native 0.74** - Native iOS mobile development
- **Expo 51** - Development framework and distribution
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing system

### Backend & Database
- **Supabase** - Open-source Firebase alternative
  - PostgreSQL database
  - Authentication (Email/Password)
  - Storage for images and documents
  - Row Level Security (RLS) for data privacy
  - Edge Functions for AI processing

### UI & Design
- **React Native Components** - Native platform components
- **Expo Image** - Optimized image handling
- **React Native SVG** - Vector graphics support

### Device Features
- **Expo Camera** - Camera access for capturing items and documents
- **Expo Image Picker** - Photo library access
- **Expo Notifications** - Push notifications for reminders
- **Expo Secure Store** - Secure credential storage

### State Management & Storage
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local persistent storage

### Utilities
- **Axios** - HTTP client for API requests
- **Date-fns** - Date formatting and manipulation
- **UUID** - Unique identifier generation

---

## 📋 Project Structure

```
Been-e/
├── app/                          # Expo Router app directory (routing)
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Splash screen
│   ├── auth/                    # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   └── tabs/                    # Main app tabs
│       ├── _layout.tsx
│       ├── home.tsx             # Dashboard
│       ├── add-item.tsx         # Add new item
│       ├── search.tsx           # Smart search
│       └── profile.tsx          # User profile
│
├── src/                          # Source code
│   ├── components/              # Reusable UI components
│   ├── screens/                 # Full-screen components
│   ├── services/                # API and backend services
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   └── items.ts
│   ├── hooks/                   # Custom React hooks
│   ├── store/                   # Zustand stores
│   ├── utils/                   # Utility functions
│   ├── types/                   # TypeScript type definitions
│   └── constants/               # App constants
│       ├── colors.ts            # Color palette
│       ├── typography.ts        # Typography system
│       ├── spacing.ts           # Spacing & layout
│       └── index.ts             # Main exports
│
├── assets/                       # App assets
│   ├── icon.png
│   ├── splash.png
│   └── ...
│
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Xcode** (for iOS development) - macOS only
- A **Supabase** account (for backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dwnasem-blip/Been-e.git
   cd Been-e
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the project root:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Development

**Start the development server:**
```bash
npm run start
```

**Run on iOS (requires macOS with Xcode):**
```bash
npm run ios
```

**Run on web (for testing):**
```bash
npm run web
```

**Type checking:**
```bash
npm run type-check
```

---

## 🗄 Database Schema

### Tables (PostgreSQL via Supabase)

#### `profiles`
- `id` (uuid, primary key)
- `email` (text, unique)
- `full_name` (text)
- `phone_number` (text, nullable)
- `avatar` (text, nullable - storage URL)
- `language` (text - 'ar' or 'en')
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `items`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `name` (text)
- `description` (text, nullable)
- `location` (text, nullable)
- `category` (text)
- `image_url` (text, nullable - storage URL)
- `tags` (text[], nullable)
- `notes` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `deleted_at` (timestamp, nullable - soft delete)

#### `documents`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `item_id` (uuid, foreign key, nullable)
- `document_type` (text)
- `image_url` (text - storage URL)
- `extracted_data` (jsonb)
- `original_data` (jsonb)
- `is_verified` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `warranties`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `item_id` (uuid, foreign key, nullable)
- `product_name` (text)
- `warranty_start_date` (date)
- `warranty_end_date` (date)
- `duration_months` (integer)
- `provider` (text, nullable)
- `document_url` (text, nullable - storage URL)
- `notes` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `subscriptions`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `name` (text)
- `provider` (text)
- `amount` (decimal)
- `currency` (text - 'SAR', 'USD', etc.)
- `frequency` (text - 'monthly', 'annual', etc.)
- `next_billing_date` (date)
- `last_billing_date` (date, nullable)
- `is_active` (boolean)
- `notes` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `loans`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `item_name` (text)
- `borrower_name` (text)
- `loan_date` (date)
- `expected_return_date` (date, nullable)
- `actual_return_date` (date, nullable)
- `status` (text - 'pending', 'returned', 'overdue')
- `notes` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `reminders`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `title` (text)
- `description` (text, nullable)
- `type` (text)
- `related_id` (uuid, nullable)
- `due_date` (timestamp)
- `is_completed` (boolean)
- `notification_enabled` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `notifications`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `title` (text)
- `body` (text)
- `type` (text)
- `related_id` (uuid, nullable)
- `is_read` (boolean)
- `created_at` (timestamp)

#### `ai_usage`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `feature` (text)
- `request_count` (integer)
- `token_count` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 🔐 Security & Privacy

- **Row Level Security (RLS)** - All tables use RLS policies to ensure users can only access their own data
- **Encrypted Storage** - Sensitive data stored in Secure Store
- **Secure Image URLs** - Temporary signed URLs for accessing user documents
- **No API Keys in App** - All sensitive operations go through Supabase Edge Functions
- **User Data Control** - Users can delete their account and all associated data

---

## 📱 Features (Phase 1)

### Core Features Implemented
- ✅ Project structure with TypeScript
- ✅ Expo Router navigation setup
- ✅ Authentication screens (UI only)
- ✅ Dashboard home screen
- ✅ Add item screen with multiple input methods
- ✅ Smart search interface
- ✅ User profile screen
- ✅ Design system (colors, typography, spacing)

### Features In Progress
- 🔄 Supabase integration
- 🔄 Authentication logic
- 🔄 Database operations

### Future Features
- 📋 Item management (CRUD)
- 📸 Camera and image processing
- 🤖 AI-powered document analysis (OCR)
- 🔍 Natural language search
- 🔔 Push notifications
- 📊 Statistics and analytics
- 💬 Smart assistant chatbot

---

## 📦 Available Scripts

```bash
# Start development server
npm run start

# Run on iOS device/simulator
npm run ios

# Run on Android (basic setup only)
npm run android

# Run on web browser
npm run web

# Type checking
npm run type-check

# Lint code
npm run lint
```

---

## 🔗 API Integration

### Supabase Configuration

1. Create a project on [Supabase](https://supabase.com)
2. Get your project URL and anon key from Project Settings
3. Set up the database schema (see Database Schema above)
4. Configure RLS policies for all tables
5. Create Edge Functions for AI processing

### Environment Variables

Create `.env.local`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🧪 Testing

Current status: **Basic UI screens created and tested**

To test the current implementation:

1. Start the dev server: `npm run start`
2. Navigate through screens using the navigation
3. Check TypeScript compilation: `npm run type-check`

---

## 📝 Notes

### Current Status
- **Phase 1** ✅ Complete
  - Project initialization
  - TypeScript setup
  - Design system
  - Basic screen layouts
  
- **Phase 2** ⏳ Next
  - Supabase integration
  - Authentication implementation
  - Database operations

### Known Issues
- Dependency warnings from React Navigation (normal for Expo)
- Tabs navigation needs icons (currently showing text only)

### Next Steps
1. Set up Supabase database
2. Implement authentication with Supabase
3. Create data service layers
4. Implement camera and image handling
5. Add OCR/AI functionality
6. Implement smart search

---

## 🤝 Contributing

This is a solo project for WAIN development. All work should be done on feature branches and merged via pull requests.

**Branch Naming Convention:**
- Feature: `feature/feature-name`
- Bug Fix: `fix/bug-description`
- Improvement: `improve/improvement-name`

---

## 📄 License

Private project - All rights reserved.

---

## 📞 Support & Contact

For questions or issues:
- 📧 Email: support@wainapp.com
- 🐛 Issues: GitHub Issues

---

## 🎨 Design System

The app uses a carefully curated design system:
- **Colors**: Warm, earthy tones with calm blues
- **Typography**: Clear, readable with Arabic RTL support
- **Spacing**: 8px grid system
- **Components**: Reusable, accessible, and consistent
- **Animations**: Smooth transitions and micro-interactions

---

## 📊 Project Metrics

- **Languages**: TypeScript, React Native
- **Mobile Platform**: iOS (primary), Android (future)
- **Database**: PostgreSQL (Supabase)
- **Lines of Code**: ~500 (Phase 1)
- **Components**: 5 main screens
- **Type Safety**: 100%

---

**Last Updated**: November 8, 2026  
**Version**: 1.0.0 - Phase 1 Complete
