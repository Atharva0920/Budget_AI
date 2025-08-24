# 💰 Budget AI – Personal Finance Tracker

A simple and intuitive web application to track your **expenses, income, and savings goals**.
Budget AI empowers users to take control of their personal finances by categorizing transactions, setting budgets, and monitoring spending trends in an easy-to-use dashboard.

---

## 🚀 Features

* 📊 **Dashboard** – Overview of financial health
* 💸 **Transactions** – Track income & expenses with categories
* 🏷️ **Custom Categories** – Add and manage tags for transactions
* 📅 **Filtering** – View transactions by date range
* 🎯 **Budgets** – Set monthly spending limits & track progress
* 🔐 **Authentication** – Secure JWT-based login & registration
* 🌙 **Dark Mode** – Persistent theme toggle (light/dark)
* 📱 **Responsive UI** – Optimized for desktop & mobile

---

## 🛠️ Tech Stack

### **Frontend**

* ⚛️ React.js – Component-based UI development
* 🎨 Tailwind CSS – Utility-first styling & responsive design
* 🖼️ Lucide Icons – Lightweight icon library

### **Backend**

* ☕ Spring Boot – RESTful API services
* 🗄️ MongoDB – NoSQL database for users, categories & transactions
* 🔐 Spring Security + JWT – Authentication & authorization

---

## 📂 Project Structure

```bash
Budget-AI/
│── client/             # React frontend
│   ├── src/            # Components, hooks, pages
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
│
│── budget-backend/             # Spring Boot backend
│   ├── src/            # Controllers, services, models
│   ├── resources/      # Config files
│   └── pom.xml         # Backend dependencies
│
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Atharva0920/Budget-AI.git
cd Budget-AI
```

### 2. Setup Frontend

```bash
cd client
npm install
npm run dev   # Runs on http://localhost:5173
```

### 3. Setup Backend

```bash
cd ../budget-backend
./mvnw spring-boot:run   # Runs on http://localhost:8080
```

---

## 🔑 Authentication

* **JWT (JSON Web Token)** for secure sessions
* **Password hashing** for safe storage
* **Protected routes** – API endpoints require a valid token

---

## 📸 Screenshots *(Coming Soon)*

* ✅ Dashboard overview
* ✅ Transactions page with filters
* ✅ Dark mode UI

---

## 📌 Roadmap

* [ ] Export transactions to CSV/Excel
* [ ] AI-powered expense categorization
* [ ] Multi-user shared budgets
* [ ] Notifications for budget overspending
* [ ] Mobile app version

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repository
2. Create a new branch (`feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 🧪 Testing (Planned)

* ✅ Unit tests for services
* ✅ Integration tests for APIs
* 🚧 E2E tests for frontend

---

## 📜 License

Licensed under the **MIT License** – free to use & modify.

---

## 👨‍💻 Author

Developed with ❤️ by **Atharva Ganmote** 🚀
