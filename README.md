# 📚 Books Library Management System

A full-stack web application for managing a digital library where users can browse books, add them to their personal reading list, track reading progress, and read PDFs. Admins can manage the book collection.

## ✨ Features

### For All Users
- 🔍 **Search & Filter**: Search books by title or author, filter by availability
- 📖 **Browse Books**: View all available books with beautiful card-based UI
- 📄 **Read PDFs**: Access PDF versions of books (login required)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Built with Tailwind CSS for a clean, modern interface

### For Registered Users
- 📚 **My Books**: Personal reading list management
- 📊 **Reading Status**: Track books as "Want to Read", "Currently Reading", or "Read"
- ⭐ **Rating System**: Rate books from 1 to 5 stars
- 👤 **User Profile**: View and manage profile information

### For Admins
- ➕ **Add Books**: Add new books to the library with cover images and PDFs
- ✏️ **Edit Books**: Update book information
- 🗑️ **Delete Books**: Remove books from the library
- 📄 **Pagination**: Manage large book collections with pagination (10 books per page)
- 📊 **Dashboard**: Comprehensive admin dashboard for book management

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)

## 🌐 Live Demo

- **Backend API**: [https://books-library-management-yga0.onrender.com](https://books-library-management-yga0.onrender.com)
- **API Health Check**: [https://books-library-management-yga0.onrender.com](https://books-library-management-yga0.onrender.com)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Books-Library-Management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend/client
npm install
```

Create a `.env` file in the `frontend/client` directory:

```env
# For local development
VITE_API_URL=http://localhost:3000/api

# For production (if deploying)
# VITE_API_URL=https://books-library-management-yga0.onrender.com/api
```

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/books-library
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/books-library

JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to connect to the backend API. Create `frontend/client/.env` for local development:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, set:
```env
VITE_API_URL=https://books-library-management-yga0.onrender.com/api
```

**Note**: The frontend will default to `http://localhost:3000/api` if `VITE_API_URL` is not set.

## 🏃 Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:3000`

### Seed Database (Optional)

To populate the database with sample books:

```bash
cd backend
npm run seed
```

### Start Frontend Development Server

```bash
cd frontend/client
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port)

## 📁 Project Structure

```
Books-Library-Management/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── bookController.js   # Book CRUD operations
│   │   └── myBookController.js # User's book list operations
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT authentication
│   │   ├── errorHandler.js     # Error handling
│   │   └── roleMiddleware.js   # Role-based access control
│   ├── models/
│   │   ├── Book.js            # Book schema
│   │   ├── MyBook.js          # User's book list schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── booksRoutes.js      # Book routes
│   │   └── mybooksRoutes.js   # User's book list routes
│   ├── utils/
│   │   └── generateToken.js   # JWT token generation
│   ├── index.js               # Server entry point
│   └── seed.js               # Database seeding script
│
└── frontend/
    └── client/
        ├── src/
        │   ├── api/
        │   │   └── axios.js          # Axios configuration
        │   ├── components/
        │   │   ├── AddBookForm.jsx   # Add book form
        │   │   ├── BookCard.jsx      # Book card component
        │   │   ├── EditBookForm.jsx  # Edit book form
        │   │   └── Navbar.jsx        # Navigation bar
        │   ├── contexts/
        │   │   ├── AdminContext.jsx  # Admin state management
        │   │   ├── AuthContext.jsx   # Authentication state
        │   │   └── BookContext.jsx   # Book state management
        │   ├── pages/
        │   │   ├── AdminDashboard.jsx # Admin dashboard
        │   │   ├── HomePage.jsx      # Home page
        │   │   ├── LoginPage.jsx     # Login page
        │   │   ├── MyBooksPage.jsx   # User's books page
        │   │   ├── PDFReaderPage.jsx # PDF reader page
        │   │   ├── ProfilePage.jsx   # User profile page
        │   │   └── RegisterPage.jsx  # Registration page
        │   ├── routes/
        │   │   └── ProtectedRoute.jsx # Route protection
        │   ├── App.jsx              # Main app component
        │   └── main.jsx             # App entry point
        └── package.json
```

## 🔌 API Endpoints

**Base URL**: `https://books-library-management-yga0.onrender.com/api` (Production)  
**Local URL**: `http://localhost:3000/api` (Development)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book (admin only)
- `PUT /api/books/:id` - Update a book (admin only)
- `DELETE /api/books/:id` - Delete a book (admin only)

### My Books
- `GET /api/mybooks` - Get user's book list (protected)
- `POST /api/mybooks/:bookId` - Add book to user's list (protected)
- `PATCH /api/mybooks/:bookId/status` - Update reading status (protected)
- `PATCH /api/mybooks/:bookId/rating` - Update book rating (protected)

## 👤 User Roles

- **Student**: Can browse books, add to reading list, track progress, and read PDFs
- **Admin**: All student privileges plus book management (add, edit, delete)

## 🎯 Key Features Explained

### Pagination
- Homepage and Admin Dashboard display 10 books per page
- Smooth navigation with Previous/Next buttons
- Page numbers with smart ellipsis for large page counts

### PDF Reading
- Books can have PDF files attached
- Only logged-in users can access PDF reading
- PDFs open in a new tab for reading

### Search & Filter
- Real-time search by title or author
- Filter by availability (All, Available, Unavailable)
- Search results are paginated

### Reading Status Tracking
- **Want to Read**: Books you plan to read
- **Currently Reading**: Books you're reading now
- **Read**: Books you've finished

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes for authenticated users
- Role-based access control for admin functions
- CORS configuration for secure API access

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check your `MONGO_URI` in `.env` file
- Verify network connectivity if using MongoDB Atlas

**Port Already in Use**
- Change `PORT` in `.env` file
- Or kill the process using port 3000

### Frontend Issues

**API Connection Error**
- Ensure backend server is running
- Check `baseURL` in `frontend/client/src/api/axios.js`
- Verify CORS settings in backend

**Build Errors**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## 🚀 Deployment

### Production Backend URL

The backend is deployed on Render:
- **Production API**: [https://books-library-management-yga0.onrender.com](https://books-library-management-yga0.onrender.com)
- **API Base URL**: `https://books-library-management-yga0.onrender.com/api`

### Connecting Frontend to Production Backend

To connect your frontend to the production backend:

1. Create `frontend/client/.env`:
```env
VITE_API_URL=https://books-library-management-yga0.onrender.com/api
```

2. Rebuild the frontend:
```bash
cd frontend/client
npm run build
```

3. The frontend will now use the production API.

### Deploying to Production

#### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - Set to `production`
   - `PORT` - Render automatically sets this
3. **Update CORS**: If deploying frontend separately, update `backend/index.js` to add your frontend URL to `allowedOrigins` array
4. Deploy!

#### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` - `https://books-library-management-yga0.onrender.com/api`
5. Deploy!

## 📝 Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample books

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ for book lovers and library management.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Tailwind CSS for the beautiful styling utilities

---

**Happy Reading! 📚✨**
