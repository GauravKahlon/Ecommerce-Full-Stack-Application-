# Ecommerce App using MERN Stack

This project is a Ecommerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse products, add them to cart, and place orders.

## Features

- User authentication (signup, login, logout)
- Browse products by category
- Add products to cart
- Edit cart (update quantity, remove items)
- Place orders
- View order history
- Responsive design for mobile and desktop

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces, used for the frontend.
- **RTK Query**: A latest promise-based HTTP client for making requests to the backend API.
- **Redux Toolkit**: A predictable state container for JavaScript apps, used for managing global state in the frontend.
- **MongoDB**: A NoSQL database for storing product data and user information.
- **Express.js**: A backend web application framework for Node.js to handle HTTP requests and responses.
- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside of a web browser, used for the backend.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Bcrypt.js**: A library to hash passwords before storing them in the database.


## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account (or locally installed MongoDB)

### Installation

1. Clone the repository:
   
 ```
 git clone https://github.com/yourusername/Ecommerce-Full-Stack-Application-.git
 ```

2. Navigate to the project directory:

```
cd ecommerce-app
```

3. Install dependencies:
4. 
```
npm install
```

4. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Replace `your_mongodb_uri` with your MongoDB connection string and `your_secret_key` with a secret key for JWT token generation.

5. Start the development server:
   
```
npm run dev
```

6. Navigate to `http://localhost:3000` in your browser to view the app.
