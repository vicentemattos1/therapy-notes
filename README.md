# TherapyNotes

A modern web application for managing therapy session notes with comprehensive analytics and insights. Built with React, TypeScript, and Supabase, this application helps therapists track sessions, monitor client progress, and analyze session patterns over time.

## 🎯 Features

- **Session Note Management**
  - Create, edit, and delete therapy session notes
  - Track client names, session dates, duration, and detailed notes
  - Form validation with real-time feedback
  - Character limit enforcement (500 characters for notes)

- **Dashboard Analytics**
  - Monthly session statistics with trend indicators
  - Average session duration tracking
  - Interactive bar chart showing sessions per day
  - Line chart displaying session frequency by client over time
  - Month-over-month comparison with percentage changes

- **User Interface**
  - Modern, responsive design using Material-UI
  - Clean card-based layout for notes
  - Intuitive navigation between views
  - Toast notifications for user feedback
  - Loading states and error handling

- **Data Management**
  - Real-time data synchronization with Supabase
  - Optimistic updates using React Query
  - Session duration validation via Supabase Edge Functions
  - Automatic cache invalidation on mutations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.5
- **State Management**: TanStack Query (React Query) 5.90.6
- **UI Library**: Material-UI (MUI) 7.4.4
- **Styling**: Tailwind CSS 4.1.16 + Material-UI theming
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Date Handling**: date-fns 4.1.0
- **Charts**: Recharts 3.3.0
- **Notifications**: react-toastify 11.0.5

## 📁 Project Structure

```
terapy-note/
├── src/
│   ├── api/              # API layer for Supabase operations
│   │   └── notesApi.ts   # CRUD operations for notes
│   ├── components/       # Reusable UI components
│   │   ├── CardActions.tsx    # Note card menu actions
│   │   ├── DeleteDialog.tsx   # Delete confirmation dialog
│   │   └── Layout.tsx         # Main layout with navigation
│   ├── hooks/           # Custom React hooks
│   │   └── useDashboardMetrics.tsx  # Dashboard calculations
│   ├── lib/             # Library configurations
│   │   └── supabase.ts  # Supabase client initialization
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx      # Analytics dashboard
│   │   ├── NotesList.tsx      # List of all notes
│   │   ├── CreateNote.tsx     # Create new note form
│   │   ├── EditNote.tsx       # Edit existing note form
│   │   └── NotFound.tsx       # 404 page
│   ├── types/           # TypeScript type definitions
│   │   ├── note.ts      # Note-related types
│   │   └── supabase.ts  # Supabase types
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## 🏗️ How It Works

### Architecture Overview

The application follows a modern React architecture with clear separation of concerns:

1. **API Layer** (`src/api/`): Handles all Supabase interactions
   - CRUD operations for notes
   - Session duration validation via Edge Functions
   - Error handling and type safety

2. **Component Layer** (`src/components/` & `src/pages/`): UI components
   - Pages for different views (Dashboard, Notes List, Create/Edit)
   - Reusable components (Layout, DeleteDialog, CardActions)
   - Material-UI components for consistent styling

3. **State Management**: TanStack Query
   - Server state management with automatic caching
   - Optimistic updates for better UX
   - Automatic refetching and cache invalidation

4. **Data Flow**:
   ```
   User Action → Component → React Query Mutation → API → Supabase
                                                          ↓
   UI Update ← Cache Invalidation ← Success Response ← Database
   ```

### Key Features Implementation

- **Session Duration Validation**: Uses Supabase Edge Functions to validate session duration before creating/updating notes
- **Dashboard Metrics**: Custom hook (`useDashboardMetrics`) calculates metrics client-side from fetched notes
- **Real-time Updates**: React Query automatically refetches data after mutations
- **Responsive Design**: Material-UI Grid system with breakpoints for mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm** or **yarn**: Package manager
- **Supabase Account**: For backend database and authentication
- **Git**: For version control

### Installation

1. **Clone the repository** (if not already cloned):
   ```bash
   git clone <repository-url>
   cd terapy-note
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   To get these values:
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy the "Project URL" and "anon/public" key


### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔧 Configuration

### Vite Configuration

The project uses Vite with React plugin and Tailwind CSS. Path aliases are configured:
- `@/` resolves to `src/`

### TypeScript Configuration

- Strict type checking enabled
- Path aliases configured for imports
- Separate configs for app and build tools

### Material-UI Theme

Custom theme configured with:
- Primary color: `hsl(190, 65%, 45%)` (teal/cyan)
- Secondary color: `hsl(20, 50%, 60%)` (orange/coral)
- System font stack

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Circular progress indicators during data fetching
- **Error Handling**: Toast notifications for success/error messages
- **Form Validation**: Real-time validation with helpful error messages
- **Hover Effects**: Smooth transitions and hover states on interactive elements
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🔮 Possible Improvements

### Functionality Enhancements

1. **Authentication & Multi-user Support**
   - Add user authentication (Supabase Auth)
   - User-specific notes and data isolation
   - Role-based access control (therapist/admin)

2. **Advanced Features**
   - Search and filter functionality for notes
   - Tags and categories for notes
   - Export notes to PDF/CSV
   - Client profiles with session history
   - Appointment scheduling integration
   - Reminders and notifications

3. **Data Management**
   - Pagination for large note lists
   - Bulk operations (delete multiple notes)
   - Data backup and restore functionality
   - Archive/soft delete for notes

4. **Analytics Enhancements**
   - More detailed charts and visualizations
   - Custom date range selection
   - Client progress tracking over time
   - Revenue tracking and billing integration
   - Session summary reports

5. **User Experience**
   - Dark mode toggle
   - Keyboard shortcuts
   - Drag-and-drop note reordering
   - Rich text editor for notes (markdown support)
   - Note templates for common sessions
   - Mobile app version (React Native)

### Technical Improvements

1. **Performance**
   - Implement virtual scrolling for large lists
   - Add service worker for offline support
   - Optimize bundle size with code splitting
   - Implement lazy loading for routes

2. **Testing**
   - Unit tests with Vitest or Jest
   - Component tests with React Testing Library
   - E2E tests with Playwright or Cypress
   - Integration tests for API calls

3. **Code Quality**
   - Add more comprehensive TypeScript types
   - Implement error boundaries
   - Add logging and error tracking (Sentry)
   - Improve ESLint configuration
   - Add Prettier for code formatting

4. **DevOps**
   - CI/CD pipeline (GitHub Actions)
   - Automated testing on pull requests
   - Docker containerization
   - Deployment configuration (Vercel, Netlify, etc.)

5. **Security**
   - Input sanitization
   - Rate limiting
   - CORS configuration
   - Security headers
   - Data encryption for sensitive information

## 📝 Notes

- The application uses Supabase Edge Functions for server-side validation, which is optional but recommended for data integrity
- All session durations are validated to ensure they are positive numbers
- Notes are limited to 500 characters to maintain concise session documentation
- The dashboard calculates metrics client-side, which may impact performance with very large datasets

## 🤝 Contributing

This is a learning project. Feel free to fork, modify, and use it as a starting point for your own therapy note management system.

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [Material-UI](https://mui.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Charts by [Recharts](https://recharts.org/)
