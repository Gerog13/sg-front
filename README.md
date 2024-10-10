# Dashboard Application

## Overview

This is a React-based dashboard application that allows users to manage their projects and tasks efficiently. The application provides a user-friendly interface to view, update, and organize tasks associated with various projects.

## Features

- **User Authentication**: Secure login and user management.
- **Project Management**: Create, view, and manage projects.
- **Task Management**: View, update, and track tasks associated with each project.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Loading States**: Skeleton loaders for better user experience during data fetching.
- **Dialog Confirmation**: Confirm task status updates with a dialog.

## Technologies Used

- **Frontend**: 
  - React
  - TypeScript
  - Material-UI (MUI)
  - Next.js

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/dashboard-app.git
   cd dashboard-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the NEXT_PUBLIC_API_URL environment variable.

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage

- **Register**: Create a new user with different roles.
- **Login**: Use your credentials to log in to the application.
- **Dashboard**: Once logged in, you will see your dashboard with projects and tasks.
- **Create New Project**: Click on the "Create New Project" button (if you have admin privileges) to add a new project.
- **Manage Tasks**: Click on a task to update its status. A confirmation dialog will appear to confirm the change.


