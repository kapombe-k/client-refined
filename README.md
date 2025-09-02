# Clinic Management System - Frontend

## Overview

This is the frontend application for the Clinic Management System, a comprehensive web-based solution designed to streamline clinic operations. Built with modern React technologies, it provides an intuitive and responsive user interface for managing patient records, doctor schedules, appointments, treatments, billing, inventory, and analytics.

The application serves as the primary interface for clinic staff, enabling efficient workflow management and data-driven decision making in a healthcare environment.

## Features

### Core Functionality
- **User Authentication & Authorization**: Secure login system with role-based access control
- **Patient Management**: Complete patient lifecycle management including registration, medical history, and contact information
- **Doctor Management**: Doctor profiles, specialties, schedules, and availability tracking
- **Appointment Scheduling**: Comprehensive appointment booking, rescheduling, and management system
- **Visit Tracking**: Detailed visit records with treatment notes and follow-up tracking
- **Treatment Management**: Treatment planning, execution tracking, and outcome monitoring
- **Billing & Payments**: Integrated billing system with insurance claim tracking
- **Inventory Management**: Medical supplies and equipment tracking with low-stock alerts
- **Analytics & Reporting**: Data visualization and insights for clinic performance metrics
- **Prescription Management**: Digital prescription creation and management

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization with the backend
- **Intuitive Navigation**: Clean, organized interface with role-based dashboards
- **Search & Filtering**: Advanced search capabilities across all data entities
- **Data Tables**: Sortable, filterable tables with pagination
- **Modal Dialogs**: Contextual forms and confirmation dialogs
- **Toast Notifications**: Real-time feedback for user actions

## Technologies Used

### Core Framework
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server with HMR (Hot Module Replacement)

### UI & Styling
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for rapid UI development
- **Shadcn UI** - High-quality, accessible component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **Tailwind Merge** - Utility for merging Tailwind CSS classes

### State Management & Data Fetching
- **React Query (TanStack Query)** - Powerful data synchronization for React
- **Axios** - HTTP client for API communication
- **React Hook Form** - Performant forms with easy validation
- **Yup & Zod** - Schema validation libraries

### Routing & Navigation
- **React Router DOM** - Declarative routing for React applications

### Data Visualization
- **Recharts** - Composable charting library built on React components
- **AG Grid React** - Enterprise-grade data grid component

### Development Tools
- **ESLint** - JavaScript linting utility
- **Vite Plugin React** - Official React plugin for Vite
- **TypeScript Types** - Type definitions for better development experience

## Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Backend Server**: The Clinic Management System backend must be running

### Installation

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the client directory:
   ```env
   VITE_BASE_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Build Commands

- **Development server:** `npm run dev`
- **Production build:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint code:** `npm run lint`

## Project Structure

```
client/
├── public/                    # Static assets served directly
│   └── vite.svg              # Vite logo
├── src/
│   ├── api-calls/            # API service functions
│   │   ├── analytics.js      # Analytics API calls
│   │   ├── appointments.js   # Appointment management
│   │   ├── authApi.js        # Authentication services
│   │   ├── axios.js          # Axios configuration
│   │   ├── billings.js       # Billing API calls
│   │   ├── doctors.js        # Doctor management
│   │   ├── inventory.js      # Inventory management
│   │   ├── patients.js       # Patient management
│   │   ├── prescriptions.js  # Prescription services
│   │   ├── resources.js      # General resources
│   │   └── visits.js         # Visit tracking
│   ├── assets/               # Static assets (images, icons)
│   │   └── react.svg         # React logo
│   ├── components/           # Reusable UI components
│   │   └── ui/               # Shadcn UI components
│   │       ├── Datatable.jsx # Data table component
│   │       ├── dialog.jsx    # Dialog/modal components
│   │       ├── loader.jsx    # Loading indicators
│   │       ├── modal.jsx     # Modal dialogs
│   │       ├── rolegate.jsx  # Role-based access control
│   │       ├── SearchForm.jsx # Search and filter forms
│   │       └── toast.jsx     # Toast notifications
│   ├── contexts/             # React context providers
│   │   └── authcontext.jsx   # Authentication context
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.js     # Mobile device detection
│   │   ├── useauth.js        # Authentication hooks
│   │   └── useaxios.js       # Axios hooks
│   ├── layouts/              # Layout components
│   │   ├── authLayout.jsx    # Authentication layout
│   │   └── dashBoardLayout.jsx # Main dashboard layout
│   ├── lib/                  # Utility libraries
│   │   └── utils.js          # General utilities
│   ├── pages/                # Page components
│   │   ├── analytics.jsx     # Analytics dashboard
│   │   ├── appointment.jsx   # Appointment management
│   │   ├── billing.jsx       # Billing interface
│   │   ├── dashboard.jsx     # Main dashboard
│   │   ├── doctors.jsx       # Doctor management
│   │   ├── inventory.jsx     # Inventory management
│   │   ├── login.jsx         # Login page
│   │   ├── patients.jsx      # Patient management
│   │   ├── register.jsx      # Registration page
│   │   ├── root.jsx          # Root component
│   │   └── visits.jsx        # Visit tracking
│   ├── routes/               # Routing configuration
│   │   ├── appRoutes.jsx     # Main application routes
│   │   └── privateRoutes.jsx # Protected routes
│   ├── utils/                # Utility functions
│   │   └── utils.js          # Helper functions
│   ├── App.css               # Global application styles
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global CSS styles
│   └── main.jsx              # Application entry point
├── components.json           # Shadcn UI configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── jsconfig.json             # JavaScript configuration
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## How It Works

### Application Flow

1. **Authentication**: Users log in through the secure authentication system
2. **Dashboard**: Role-based dashboard provides quick access to relevant features
3. **Data Management**: CRUD operations for patients, doctors, appointments, etc.
4. **Real-time Updates**: Changes are synchronized with the backend API
5. **Analytics**: Data visualization provides insights into clinic operations

### Key Components

- **RoleGate**: Controls access to features based on user roles
- **DataTable**: Displays and manages tabular data with sorting/filtering
- **SearchForm**: Provides advanced search capabilities
- **Modal**: Handles forms and confirmations
- **Toast**: Shows user feedback and notifications

### API Integration

The frontend communicates with the Flask backend through RESTful APIs:
- Authentication endpoints for login/logout
- CRUD endpoints for all entities (patients, doctors, appointments, etc.)
- Search and filter endpoints
- Analytics data endpoints

## Configuration

### Environment Variables

- `VITE_BASE_URL`: Backend API base URL (default: http://localhost:5000)

### Shadcn UI Configuration

The `components.json` file configures the Shadcn UI component library with:
- Style: "new-york"
- CSS variables enabled
- Tailwind CSS integration
- Component aliases

## Development Guidelines

### Code Style
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write descriptive component and function names

### Component Structure
- Separate UI components from business logic
- Use custom hooks for reusable logic
- Implement proper prop validation

### State Management
- Use React Query for server state
- Use React Context for global app state
- Avoid prop drilling with proper component composition

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Make changes and test locally
4. Run linter: `npm run lint`
5. Build for production: `npm run build`

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed with `npm install`
2. **API Connection Issues**: Check that the backend server is running and `VITE_BASE_URL` is correct
3. **Styling Issues**: Verify Tailwind CSS is properly configured
4. **Component Import Errors**: Check file paths and export statements

### Debug Mode
- Use browser developer tools for debugging
- Check network tab for API calls
- Use React Developer Tools for component inspection

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the backend README for API documentation
- Review the code comments for implementation details
- Create an issue in the repository for bugs or feature requests
