# Threem

Threem is a full-stack application combining a modern React frontend with a specialized backend for steganography and encryption.

## Project Structure

The project is organized into two main directories:

- **Frontend**: Contains the user interface application.
  - Location: `Frontend/wdkpro/wdkpro`
- **Backend**: Contains the server-side logic and steganography tools.
  - Location: `Backend/wdk`

## Technologies Used

### Frontend
- **Framework**: React (via Vite)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Validation**: Zod & React Hook Form

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Image Processing**: Sharp, PNGjs
- **Features**: Steganography, File Uploads (Multer)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/wdkpro/wdkpro
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd Backend/wdk
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Features
- **Steganography Tool**: Encrypt and hide data within images.
- **Modern UI**: Responsive and accessible interface built with Radix UI and Tailwind.
