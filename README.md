# Course Selling Application

A full-stack **Course Selling Platform** built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. This application allows users to sign up as instructors or students, add and purchase courses, and manage course content efficiently. 

## Features

### Instructor Panel
- Instructor registration & login
- Add new courses with title, description, price, and image
- Upload video lectures
- View and manage uploaded courses

### Student Panel
- Student registration & login
- Browse and search available courses
- View course details and preview content
- Purchase courses (dummy payment for demo)
- Access purchased courses

### Authentication
- JWT-based secure login system
- Role-based access control for instructor and student
- Middleware for protecting routes

### Backend (Node.js + Express)
- RESTful API endpoints for courses, users, and authentication
- MongoDB database with Mongoose schemas
- Error handling and validation

### Frontend (React + Tailwind CSS)
- Responsive and clean UI
- React Context API for global state management
- React Router for navigation
- Axios for API communication
- Toast notifications for feedback

## Tech Stack

| Technology        | Use Case                      |
|------------------|-------------------------------|
| React            | Frontend UI                   |
| Tailwind CSS     | Styling                       |
| Node.js          | Backend server                |
| Express.js       | REST API                      |
| MongoDB          | Database                      |
| Mongoose         | ODM for MongoDB               |
| JWT              | Authentication                |
| Cloudinary       | Course image/video uploads    |
| Vite             | Fast frontend bundling        |

## Installation & Run Locally

### Backend
```bash
cd backend
npm install
# Add your MongoDB URI and JWT_SECRET to .env
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
### Environment Variables
Create a .env file inside the backend folder and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### Project Structure
```bash
Course-Selling-Application/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── main.jsx

```
### Deployment
- Frontend: Vercel / Netlify
- Backend: Render / Railway / Cyclic
- Database: MongoDB Atlas
- Media: Cloudinary
- Remember to exclude sensitive data (e.g., API keys, secrets) from public repos.

## 📸 Screenshots
![Home Page](https://res.cloudinary.com/dccuxjsor/image/upload/v1754217059/Screenshot_2025-08-03_155959_rpp3kf.png)
![Login Page](https://res.cloudinary.com/dccuxjsor/image/upload/v1754216318/Screenshot_2025-08-03_153942_mqcbwl.png)
![Show Courses](https://res.cloudinary.com/dccuxjsor/image/upload/v1754216317/Screenshot_2025-08-03_153925_dfcdic.png)

## Author
- Aditya Kumar
- GitHub: @Aditya754194
