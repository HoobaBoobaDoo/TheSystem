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

# List of Functionalities

## User Authentication:
- Registration and login
- Local authentication (biometrics, PIN) via expo-local-authentication

## User Profile Management:
- Create and update user profile
- Select rank, productivity type, and class during onboarding

## Productivity Tools:
- To-do list management (add, edit, delete tasks)
- Goal tracking (create, update, complete goals)

## Notifications:
- Local push notifications for reminders and tasks (expo-notifications)

## Health & Activity Tracking:
- Step counting and sensor-based activity tracking (expo-sensors) *not functional yet*

## Media & Assets:
- Pick and upload images for profile or tasks (expo-image-picker)
- Custom fonts and icons (expo-font)

## Navigation:
- File-based navigation and routing (expo-router)
- Custom layouts (header, sidebar, footer)

## Persistent Storage:
- Save user data, tasks, and settings locally (@react-native-async-storage/async-storage)

## UI/UX Enhancements:
- Animated components (react-native-reanimated)
- Gesture handling (react-native-gesture-handler)
- Status bar customization (expo-status-bar)
- Typing text animation
