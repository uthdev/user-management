# **User Management API** 🚀  

This is a **User Management API** built with **Node.js**, **Express**, **Knex.js**, and **SQLite**. It provides endpoints for managing users, addresses, and posts with proper validation using **Zod** and testing with **Jest + Supertest**.

---

## **📌 Features**

✅ **User Management**: Create, retrieve, and manage users.  
✅ **Address Management**: Each user has a single associated address.  
✅ **Post Management**: Users can create and delete posts.  
✅ **Validation**: Uses **Zod** for request validation.  
✅ **Database**: Uses **Knex.js** with SQLite for persistence.  
✅ **Testing**: Fully tested with **Jest** and **Supertest**.  
✅ **Pagination**: Supports pagination for fetching users.  

---

## **⚙️ Prerequisites**

Before running the project, ensure you have the following installed:

- [Node.js (>=18.x)](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [SQLite](https://www.sqlite.org/download.html)

---

## **🚀 Setup Instructions**

### **1️⃣ Clone the Repository**

```sh
git clone  https://github.com/uthdev/user-management.git
cd user-management
```

### **2️⃣ Install Dependencies**

```sh
pnpm install
```

### **3️⃣ Configure Environment Variables**

Create a **`.env`** file in the root directory and add the following:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=sqlite://./database.sqlite
```

### **4️⃣ Run Database Migrations**

```sh
pnpm knex migrate:latest
```

### **5️⃣ Seed the Database (Optional)**

```sh
pnpm knex seed:run
```

### **6️⃣ Start the Server**

```sh
pnpm dev
```

The API will be running at: **<http://localhost:3000>**

---

## **📌 API Endpoints**

### **User Management**

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/users`           | Get paginated users list       |
| GET    | `/users/count`     | Get total user count           |
| GET    | `/users/:id`       | Get user details (with address) |
| POST   | `/users`           | Create a new user              |

### **Address Management**

| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/addresses/:userId` | Get user address               |
| POST   | `/addresses`         | Create an address for a user   |
| PATCH  | `/addresses/:userId` | Update user address            |

### **Post Management**

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/posts?userId=1`  | Get all posts for a user        |
| POST   | `/posts`           | Create a new post               |
| DELETE | `/posts/:id`       | Delete a post                   |

---

## **🧪 Running Tests**

To run tests, use:

```sh
pnpm test
```

For debugging async issues:

```sh
pnpm test --detectOpenHandles
```

---

## **📌 Project Structure**

```
📂 user-management/
│-- 📂 src/
│   │-- 📂 controllers/    # API controllers
│   │-- 📂 models/         # Database models
│   │-- 📂 repositories/   # Database interaction
│   │-- 📂 routes/         # Express routes
│   │-- 📂 middlewares/     # Middleware (Validation, Auth, etc.)
│   │-- 📂 db/             # Knex configuration & migrations
│   │-- 📂 tests/          # Unit & integration tests
│   │-- server.ts          # Express server entry point
│-- knexfile.ts            # Knex database configuration
│-- package.json           # Project dependencies
│-- README.md              # Project documentation
```

---

## **👥 Contributors**

- **[Gbolahan Adeleke](https://github.com/uthdev)**  
- Open a PR if you want to contribute! 🚀
