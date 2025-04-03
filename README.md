# Blogger Application

A full-stack blog application built with Angular, Spring Boot, and MySQL that allows users to create, read, update, and delete blog posts. This application includes user authentication and responsive design.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**: Register and login using JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Public Viewing**: Blogs are viewable by everyone, even without authentication
- **Author Controls**: Only authors can edit or delete their own blogs
- **Pagination**: Support for paginated blog listing
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack

- **Frontend**: 
  - Angular 14
  - TypeScript
  - HTML/CSS
  - Bootstrap (UI components)

- **Backend**:
  - Spring Boot 2.7
  - Spring Security
  - Spring Data JPA
  - JWT Authentication

- **Database**:
  - MySQL

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** 11 or higher
- **Node.js** (v14 or higher) and npm
- **MySQL** (v5.7 or higher)
- **Maven** (for building the Java backend)
- **Git** (optional, for cloning the repository)

## Setup Instructions

### Database Setup

1. **Install MySQL** if not already installed.

2. **Create a MySQL database**:
   ```sql
   CREATE DATABASE blogger_db;
   ```

3. **Create a MySQL user** (optional, you can use root):
   ```sql
   CREATE USER 'blogger_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON blogger_db.* TO 'blogger_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Backend Setup

1. **Clone or download the repository**:
   ```bash
   git clone https://github.com/yourusername/blogger-app.git
   cd blogger-app
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd blogger-backend
   ```

3. **Configure database connection**:
   
   Open `src/main/resources/application.properties` and update the following properties:
   
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/blogger_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=blogger_user
   spring.datasource.password=your_password
   ```

4. **Configure JWT secret**:
   
   In the same `application.properties` file, set a secret key for JWT:
   
   ```properties
   jwt.secret=your_secret_key_for_local_development
   jwt.expiration=86400000
   ```

5. **Build the backend**:
   ```bash
   mvn clean install
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../blogger-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure backend API URL**:
   
   Open `src/environments/environment.ts` and ensure the `apiUrl` is set correctly:
   
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'
   };
   ```

## Running the Application

### Start the Backend

1. **Navigate to the backend directory**:
   ```bash
   cd blogger-backend
   ```

2. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

3. **Verify the backend is running** by accessing:
   http://localhost:8000/api/blogs

### Start the Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd blogger-frontend
   ```

2. **Run the development server**:
   ```bash
   ng serve
   ```

3. **Access the application** by opening:
   http://localhost:4200

## Using the Application

1. **Register a new account** by clicking "Sign Up" and providing an email and password.

2. **Login with your credentials**.

3. **Create a new blog post** by clicking the "New Blog" button.

4. **View all blog posts** on the homepage.

5. **Edit or delete your own blog posts** by clicking the respective buttons on your posts.

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/auth/login** - Login and get JWT token
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Blogs

- **GET /api/blogs** - Get all blogs (paginated)
  - Query params: `page` (default: 0), `size` (default: 5)

- **GET /api/blogs/{id}** - Get a specific blog

- **POST /api/blogs** - Create a new blog (requires authentication)
  ```json
  {
    "title": "Blog Title",
    "content": "Blog content goes here..."
  }
  ```

- **PUT /api/blogs/{id}** - Update a blog (requires authentication, only for author)
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content..."
  }
  ```

- **DELETE /api/blogs/{id}** - Delete a blog (requires authentication, only for author)

- **GET /api/blogs/my-blogs** - Get all blogs of the authenticated user (paginated)
  - Query params: `page` (default: 0), `size` (default: 5)

## Project Structure

### Backend Structure

```
blogger-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── blogger/
│   │   │           ├── config/
│   │   │           ├── controller/
│   │   │           ├── exception/
│   │   │           ├── model/
│   │   │           ├── repository/
│   │   │           ├── security/
│   │   │           ├── service/
│   │   │           └── BloggerApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-prod.properties
│   └── test/
└── pom.xml
```

### Frontend Structure

```
blogger-frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── core/
│   │   ├── shared/
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── assets/
│   └── index.html
├── angular.json
└── package.json
```

## Troubleshooting

### Common Backend Issues

1. **Database connection error**:
   - Verify MySQL is running
   - Check your database credentials in `application.properties`
   - Ensure the database `blogger_db` exists

2. **Port already in use**:
   - Change the port in `application.properties`: `server.port=8001`

### Common Frontend Issues

1. **API connection error**:
   - Verify the backend is running
   - Check that `apiUrl` in `environment.ts` matches your backend URL
   - Check browser console for CORS errors

2. **Module not found errors**:
   - Run `npm install` to ensure all dependencies are installed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Spring Boot for the robust backend framework
- Angular team for the frontend framework
- All contributors who have helped with this project
