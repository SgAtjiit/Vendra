# 🛒 Vendra - Multi Vendor E-Commerce Platform

![Java](https://img.shields.io/badge/Java-21%20%7C%2017-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3+-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6.3-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Hibernate JPA](https://img.shields.io/badge/Hibernate-JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-v7-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Gateway-0C2340?style=for-the-badge&logo=razorpay&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Checkout-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

---

## ✨ Key Features

### 👤 Customer Experience
* **Vendra AI Assistant**: Interactive assistant for real-time order status tracking, shopping cart updates, and AI recommendations.
* **Product Catalog & Search**: Advanced product search with multi-faceted filtering, sorting, category navigation, and pagination.
* **Smart Cart & Wishlist**: Real-time price calculation, dynamic item quantity updates, and persistent wishlist item management.
* **Dual Payment Gateway**: Flexible checkout supporting **Razorpay** (domestic) and **Stripe** (international) card payments.
* **Order & Review System**: Comprehensive order history tracking, order cancellation workflows, and product ratings/reviews.

### 🛍️ Vendor / Seller Hub
* **Analytics Dashboard**: Interactive visual sales charts (Today, Last 7 Days, Last 12 Months) powered by Recharts.
* **Inventory Control**: Full CRUD management for vendor products, stock updates, category tagging, and pricing rules.
* **Order Processing**: Real-time order fulfillment pipeline and status progression updates.
* **Financial Reports & Payouts**: Clear earnings summaries, transaction histories, refund management, and payout requests.

### 🛠️ Admin Control Center
* **Seller Moderation**: Vendor onboarding verification, account suspension, and ban enforcement.
* **Coupons & Promotions Engine**: Create, manage, and monitor promotional discount codes and platform deals.
* **Category & Homepage Management**: Customize homepage deal banners, featured collections, and category hierarchies.

---

## 📁 Repository Structure

```
vendra/
├── backend/    # Spring Boot 3.3 REST API (Java 21/17, Spring Security, JWT, JPA, MySQL)
└── frontend/   # React 19 Client (Redux Toolkit, Tailwind CSS, Material UI, Vite)
```

---



## 🚀 Getting Started

### Prerequisites
* **Java Development Kit**: JDK 21 or JDK 17
* **Node.js**: v18.x or higher
* **MySQL Database**: v8.0 or higher

---

### 1️⃣ Backend Setup (`backend/`)

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Configure Database & Secrets**:
   Create or edit `src/main/resources/application.properties`:
   ```properties
   # Server Configuration
   server.port=8080

   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/vendra_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   # Security & JWT
   app.jwt.secret=YOUR_SUPER_SECRET_JWT_KEY_MIN_32_CHARS
   app.jwt.expiration-ms=86400000

   # Mail Service (OTP Verification)
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=YOUR_EMAIL@gmail.com
   spring.mail.password=YOUR_GMAIL_APP_PASSWORD
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true

   # Payment Gateway Keys
   razorpay.key_id=YOUR_RAZORPAY_KEY_ID
   razorpay.key_secret=YOUR_RAZORPAY_SECRET_KEY
   stripe.secret_key=YOUR_STRIPE_SECRET_KEY
   ```

3. **Run the Spring Boot Application**:
   ```bash
   # Windows
   mvn spring-boot:run

   # Linux / macOS
   ./mvnw spring-boot:run
   ```

---

### 2️⃣ Frontend Setup (`frontend/`)

1. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside `frontend/`:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   VITE_RAZORPAY_KEY_ID=YOUR_RAZORPAY_PUBLIC_KEY
   VITE_STRIPE_PK=YOUR_STRIPE_PUBLISHABLE_KEY
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *Access the web app at `http://localhost:5173`*

---

## 🛠️ Scripts & Commands Reference

| Directory | Command | Description |
| :--- | :--- | :--- |
| `frontend/` | `npm run dev` | Starts Vite hot-reload development server |
| `frontend/` | `npm run build` | Compiles & builds production bundle |
| `frontend/` | `npm run preview` | Previews local production build |
| `frontend/` | `npm run lint` | Runs ESLint analysis |
| `backend/` | `mvn spring-boot:run` | Runs Spring Boot API server |
| `backend/` | `mvn test` | Runs backend test suite |
| `backend/` | `mvn clean package` | Packages executable JAR file |

---

## 📄 License

MIT License — see `LICENSE` for details.
