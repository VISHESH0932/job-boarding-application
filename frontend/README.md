# Full-Stack Job Board Application

This is a complete job board application built with a modern tech stack, allowing admins to post jobs and applicants to apply for them.

## Technologies Used

-   **Frontend:**
    -   Next.js 14 (App Router)
    -   React 18
    -   TypeScript
    -   TailwindCSS
    -   Axios

-   **Backend:**
    -   Node.js
    -   Express.js
    -   TypeScript
    -   Prisma (ORM)
    -   JSON Web Tokens (JWT) for authentication
    -   Multer for file uploads

-   **Database:**
    -   PostgreSQL

## Features

### Admin
-   Secure login via `/admin/login`.
-   Dashboard to create new job listings.
-   View all submitted applications in a central table.
-   Accept or Reject applications, updating their status.

### Applicant
-   Publicly view all open job positions.
-   View detailed information for each job.
-   Apply for a job via a simple form.
-   Upload a resume (PDF only) and an optional cover letter.
-   **Application Rules:**
    -   An applicant can only apply once per job.
    -   A job can only receive a maximum of 5 applications.
    -   An applicant cannot apply for more than 5 jobs within a 24-hour period (rejected applications do not count towards this limit).

## Admin Credentials

-   **Email:** `admin@example.com`
-   **Password:** `admin123`

## Project Structure
/
├── backend/ # Node.js + Express + Prisma
├── frontend/ # Next.js + React
└── README.md
## Setup and Installation

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   PostgreSQL database server

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up your PostgreSQL database and get the connection URL.

4.  Create a `.env` file in the `backend` directory by copying the example:
    ```bash
    cp .env.example .env 
    # (or create it manually)
    ```

5.  Update the `.env` file with your PostgreSQL connection URL and a JWT secret:
    ```
    DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DB_NAME?schema=public"
    JWT_SECRET="CHOOSE_A_STRONG_SECRET_KEY"
    ```

6.  Run Prisma to create the database tables:
    ```bash
    npx prisma migrate dev --name init
    ```

7.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:5001`. The `/uploads` directory will be created automatically when the first file is uploaded.

### 2. Frontend Setup

1.  In a new terminal, navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env.local` file in the `frontend` directory. It should contain the URL of your backend server:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:5001
    ```

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

### How to Run

1.  Make sure your PostgreSQL server is running.
2.  Start the backend server with `npm run dev` in the `/backend` directory.
3.  Start the frontend server with `npm run dev` in the `/frontend` directory.
4.  Open your browser and go to `http://localhost:3000`.