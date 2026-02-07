![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/License-ISC-blue)

# ShopHub — Full-Stack E-Commerce Application

A full-stack e-commerce platform with user authentication, admin dashboard, product catalog, and order management. Built with Node.js, Express, MongoDB, and React.

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Axios, CSS3 |
| **Backend** | Node.js (ESM), Express.js |
| **Database** | MongoDB with Mongoose |
| **Auth** | JWT, bcrypt |
| **Validation** | Joi |

---

## Features

### Customer
- Browse products (Cars, Electronics, Clothing)
- Filter by category
- Add items to cart
- Sign up / Login
- Checkout and place orders

### Admin
- Admin dashboard with restricted access
- View all registered users
- View all checked-out orders with customer details
- User and order management

### API
- RESTful endpoints
- JWT authentication
- Role-based access (admin / user)
- CORS enabled

---

### Authentication & Authorization

- Passwords are hashed using `bcrypt`.
- JWT is issued on login and sent in the `Authorization` header.
- Protected routes validate JWT.
- Admin routes require `admin` role; users cannot access.

---


## Project Structure

```
ecommerce/
├── client/                          # React frontend
│   ├── public/
│   │   ├── favicon.svg              # App icon
│   │   ├── index.html
│   │   └── images/                  # Product images
│   └── src/
│       ├── components/
│       │   ├── AdminDashboard.js    # Admin: users & orders
│       │   ├── AuthForm.js
│       │   ├── Cart.js
│       │   ├── Header.js
│       │   ├── ProductCard.js
│       │   ├── ProductList.js
│       │   └── ...
│       ├── services/
│       │   ├── api.js               # Product & order API
│       │   └── authAPI.js           # Auth & admin API
│       ├── App.js
│       └── index.js
│
├── server/                          # Node.js backend
│   ├── script/
│   │   ├── adminSeed.js             # Seed admin user
│   │   └── productSeed.js           # Seed products
│   └── src/
│       ├── database/
│       │   ├── connection.js        # Product & Order ops
│       │   ├── userConnection.js    # User ops
│       │   ├── mongoConnection.js   # MongoDB connect
│       │   └── models/
│       │       ├── User.js
│       │       ├── Product.js
│       │       └── Order.js
│       ├── middleware/
│       │   ├── auth.js              # JWT, requireAdmin
│       │   ├── errorHandler.js
│       │   └── validation.js
│       ├── modules/
│       │   ├── products/            # Products & orders
│       │   ├── users/               # Auth & admin
│       │   └── cars/
│       ├── utils/
│       └── index.js
│
└── README.md
```

---

## Screenshots

### Customer Pages

**Login Page**  
![Login Page](screenshots/login-page.png)

**Sign Up Page**  
![SignUp Page](screenshots/signup-page.png)

**Validation Page (Email & Password)**  
![Validation Page](screenshots/validation-page.png)

**Products Page**  
![Products Page](screenshots/products-page.png)

**Categorized Products**  
![Categorized Products](screenshots/categorized-products.png)

**Add to Cart**  
![Add To Cart](screenshots/add-to-cart-page.png)

**Cart Overview**  
![Cart Page](screenshots/cart-products-page.png)

**Checkout Attempt Without Login**  
![Checkout Failure](screenshots/failure-without-login-page.png)

**Order Checkout Successful**  
![Order Checkout](screenshots/correct-checkout-page.png)

### Admin Pages

**Users Dashboard**  
![Users Dashboard](screenshots/adminUsersDashBoard.png)

**Orders Dashboard**  
![Orders Dashboard](screenshots/adminOrdersDashBoard.png)


## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/shophub.git
cd shophub
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `.env` in the `server` folder:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your-jwt-secret-key-here
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

Start the server:

```bash
npm start
# or: npm run dev   (with auto-reload)
```

Server runs at `http://localhost:5000`

### 3. Seed data (optional)

```bash
cd server
npm run seed:admin      # Creates admin: admin@example.com / 123456
npm run seed:products   # Creates sample products
```

### 4. Frontend setup

```bash
cd client
npm install
npm start
```

Frontend runs at `http://localhost:3000`

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Register user |
| POST | `/login` | — | Login |
| GET | `/me` | Yes | Current user |
| GET | `/users` | Admin | All users |
| GET | `/orders` | Admin | All orders |

### Products (`/api/products`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | All products |
| GET | `/:id` | — | Product by ID |
| POST | `/` | Yes | Create product |
| PUT | `/:id` | Yes | Update product |
| DELETE | `/:id` | Yes | Delete product |
| POST | `/orders` | Yes | Create order |
| GET | `/orders` | Yes | User orders |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | `development` / `production` |
| `FRONTEND_URL` | Allowed CORS origin |
| `SECRET_KEY` | JWT signing secret |
| `MONGODB_URI` | MongoDB connection string |
| `BCRYPT_SALT_ROUNDS` | Cost factor for bcrypt password hashing |


---

## Deployment

### GitHub

1. Create a new repository on GitHub.
2. Add a `.gitignore` (if missing) with:
   ```
   node_modules/
   .env
   client/build/
   ```
3. Initialize git (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ShopHub e-commerce"
   ```
4. Add remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/shophub.git
   git branch -M main
   git push -u origin main
   ```

### Frontend build

```bash
cd client
npm run build
```

Serve the `build` folder via any static host (Vercel, Netlify, etc.).

### Production backend

- Set `NODE_ENV=production`
- Use MongoDB Atlas for database
- Set `FRONTEND_URL` to your deployed frontend URL
- Use a strong `SECRET_KEY`

---

## License

ISC
