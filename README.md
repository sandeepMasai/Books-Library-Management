📚 My Digital Library
A full-stack web application where users can browse, add to "My Books", update status, rate books, and read PDF files online. Admins can manage the collection.

🛠 Tech Stack
🌐 Frontend
React.js (with Hooks and Context API)

Tailwind CSS (for UI styling)

React Router DOM (for routing)

Axios (HTTP requests)

🔗 Backend
Node.js

Express.js

🗃 Database
MongoDB with Mongoose (Schema modeling)

🔐 Auth
JWT (JSON Web Tokens)

bcryptjs (for password hashing)

🚀 Features
👤 User Features
Register / Login

Browse all books (Home)

"Want to Read" button to add books to "My Books"

Update book status (Want to Read, Currently Reading, Read)

Add ratings (1 to 5 stars)

View and read uploaded PDF books online (no download)

Profile page (shows name and email)

🛠 Admin Features
Add new books with:

Title

Author

Cover Image URL

Availability status (true/false)

(Future) Upload PDF

Edit and delete books (with confirmation prompt)

Manage book catalog via Admin Dashboard

🧠 Project Logic
📦 Book Management
Each book document contains:

js
Copy
Edit
{
  title: String,
  author: String,
  coverImage: String,
  isAvailable: Boolean,
  pdfUrl: String (optional)
}
✅ User Book Status
Stored in a separate collection like:

js
Copy
Edit
{
  userId,
  bookId,
  status: 'Want to Read' | 'Currently Reading' | 'Read',
  rating: 1-5
}
🔐 Auth Flow
JWT token stored in localStorage

Protected routes based on role (admin/user)

Navbar conditionally renders based on user context

📄 Folder Structure
pgsql
Copy
Edit
client/
  ├── src/
  │   ├── components/
  │   ├── contexts/
  │   ├── pages/
  │   └── App.jsx
server/
  ├── controllers/
  ├── routes/
  ├── models/
  └── index.js
🛠 Setup Instructions
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/yourname/my-digital-library.git
cd my-digital-library
2. Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
3. Frontend Setup
bash
Copy
Edit
cd client
npm install
npm run dev
