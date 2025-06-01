# Stucture:
TheSystem/
 - app/           *All screens/pages (routed by expo-router)*
 - assets/        *Images and static assets*
 - components/    *Reusable UI components*
 - types/         *TypeScript type definitions*
 - utils/         *Utility functions (e.g., authentication)*
 - .expo/         *Expo local config (should be gitignored)*

#  Key Architectural Concepts
1. Navigation
Uses expo-router for file-based routing.
Each file in app/ (e.g., app/index.tsx, app/profile.tsx) is a screen.
The root layout is defined in app/_layout.tsx, which wraps all screens with shared UI (header, sidebar, footer).
2. State Management
User data is persisted using AsyncStorage (see utils/auth.ts).
Each screen loads and updates user state as needed, often via utility functions.
3. Authentication & User Flow
Registration and login handled in app/register.tsx and app/login.tsx.
User onboarding is a multi-step process: register → select rank → select productivity → select class → profile created.
Authentication logic is in utils/auth.ts.
4. UI Components
Reusable components are in components/, e.g.:
Header
Sidebar
Footer
GoalCard
TodoList
Custom text animation via TypingText.
5. Types
All user and app data types are defined in types/, e.g. User.
6. Utilities
Utility functions for authentication and user management are in utils/auth.ts.
7. Platform Features
Uses Expo APIs for:
Notifications (expo-notifications)
Sensors (expo-sensors) for step counting
Local authentication (expo-local-authentication)
Image picking (expo-image-picker)
Data Flow Example
User registers via register.tsx → data saved to AsyncStorage.
User info is loaded on each screen via getCurrentUser.
Updates (e.g., todos, stats) are written back to AsyncStorage and reflected in UI.
