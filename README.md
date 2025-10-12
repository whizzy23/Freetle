# Freetle Project

Freetle is a full-stack web application for sharing, discovering, bookmarking, commenting on, and purchasing stories. It provides a seamless experience for both readers and writers, with robust user authentication, story management, and secure payment integration.

## Project Structure

- **backend/**: Node.js/Express server, MongoDB (Mongoose), JWT, Razorpay, Cloudinary, Multer, Nodemailer
	- Controllers for business logic (user, story, bookmark, comment, contact, payment)
	- Middlewares for authentication and uploads
	- Models for User, Story, Bookmark, Comment, Payment, OTP, Message
	- Routes for API endpoints
	- Utilities for image uploads
- **frontend/**: React app, React Router, Bootstrap, Context API, Toastify
	- Components for navigation, story display, bookmarks, etc.
	- Contexts for global state (auth, bookmarks, comments, stories, user)
	- Custom hooks for API calls and state logic
	- Pages for main navigation and user interaction

## Key Features

### Backend
- User authentication (signup, login) with password hashing and JWT tokens
- Story CRUD operations (create, read, update, delete)
- Bookmarking stories for quick access
- Commenting system for user interaction
- Contact form for user feedback, sent via email
- **Payment workflow for purchasing stories (Razorpay):**
	- Users can purchase stories securely via Razorpay
	- Purchased books are tracked in the user's account and stored in the backend
	- Duplicate purchases are restricted; users cannot buy the same book twice
	- Purchased books are visible in a dedicated section, with download options for each book
	- Payment controller and user model updated to support purchase tracking and validation
- Image upload support via Cloudinary
- OTP model for secure operations (e.g. signup)

### Frontend
- User registration and login forms
- Story browsing, creation, editing, and detailed views
- Bookmark management (add/remove bookmarks)
- Commenting system (add/view comments)
- Profile page with user info and bio
- About and Contact pages
- **Purchase flow for buying stories:**
	- Integrated with backend payment API
	- Purchased books section with download buttons
	- Restricts duplicate purchases and provides feedback
- Responsive design for desktop and mobile
- Toast notifications for feedback

## Setup & Installation

### Backend
1. Clone the repository and navigate to `backend/`
2. Run `npm install` to install dependencies
3. Create a `.env` file with:
	 - `MONGO_URI`: MongoDB connection string
	 - `PORT`: Server port
	 - `JWT_SECRET`: JWT signing key
	 - `CLOUDINARY_API_KEY`: Cloudinary API key
	 - `RAZORPAY_KEY`: Razorpay API key
4. Start the server with `npm run dev`

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Start the React app with `npm start`

## API Endpoints (Backend)
- `/api/user`: User registration, login, profile management
- `/api/stories`: Story CRUD operations
- `/api/bookmarks`: Bookmark management
- `/api/comments`: Comment management
- `/api/contact`: Contact form submissions
- `/api/payment`: Payment processing

## Frontend Routes
- `/`: Home page
- `/about`: About page
- `/contact`: Contact page
- `/profile`: User profile
- `/bookmarks`: User's bookmarks
- `/stories/:id`: Story details
- `/purchase`: Purchase flow
- `/signup`: Registration
- `/login`: Login
- `/404`: Not Found

## State Management (Frontend)
- AuthContext: Manages authentication state (login, logout, signup)
- BookmarkContext: Manages bookmarks
- CommentContext: Manages comments
- StoriesContext: Manages stories
- UserContext: Manages user profile data

## Authors & License
- Owner: whizzy23
- License: MIT