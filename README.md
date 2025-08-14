# 📚 My Digital Library

A full-stack digital library web application where users can browse, track, and rate books — and read PDFs online. Admins can efficiently manage the book catalog through a dashboard.

---

## 🛠 Tech Stack

### 🌐 Frontend
- **React.js** (Hooks, Context API)
- **Tailwind CSS** (for UI styling)
- **React Router DOM** (for routing)
- **Axios** (for API requests)

### 🔗 Backend
- **Node.js**
- **Express.js**

### 🗃 Database
- **MongoDB** with **Mongoose** (Schema modeling)

### 🔐 Authentication
- **JWT (JSON Web Tokens)**
- **bcryptjs** (for password hashing)

---

## 🚀 Features

### 👤 User Features
- 🔐 Register / Login
- 📖 Browse all available books
- 📌 "Want to Read" button to save books to **My Books**
- 🔄 Update reading status:
  - Want to Read
  - Currently Reading
  - Read
- ⭐ Rate books (1 to 5 stars)
- 📄 Preview PDF books in-browser (no downloads)
- 👤 View profile info (name, email)

### 🛠 Admin Features
- ➕ Add new books with:
  - Title
  - Author
  - Cover Image URL
  - Availability status
  - *(Future: Upload PDF)*
- ✏️ Edit and ❌ Delete books
- 🧾 Admin Dashboard to manage the book collection

---

## 🧠 Project Logic

### 📦 Book Schema

```js
{
  title: String,
  author: String,
  coverImage: String,
  isAvailable: Boolean,
  pdfUrl: String (optional)
}
✅ User Book Status Schema
js
Copy
Edit
{
  userId: ObjectId,
  bookId: ObjectId,
  status: 'Want to Read' | 'Currently Reading' | 'Read',
  rating: 1 to 5
}
🔐 Auth Flow
JWT token stored in localStorage

Auth-protected routes based on user role (user or admin)

Navbar dynamically updates based on user session

📁 Folder Structure
perl
Copy
Edit
my-digital-library/
│
├── client/               # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── contexts/     # Auth and Book context
│       ├── pages/        # Page views (Home, Admin, Login, etc.)
│       └── App.jsx
│
├── server/               # Express backend
│   ├── controllers/      # Route handlers
│   ├── routes/           # API routes
│   ├── models/           # Mongoose models
│   └── index.js          # Server entry point
🛠 Setup Instructions
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/yourusername/my-digital-library.git
cd my-digital-library
2. Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
The backend server will start on http://localhost:2025

3. Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev
The React app will start on http://localhost:5173

✅ To Do / Future Improvements
 PDF Upload via Admin Panel

 Filter/Search books

 Pagination support

 UI enhancements and animations

 Mobile responsiveness polish

 Admin user management
