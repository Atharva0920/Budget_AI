# 💰 Budget AI - Personal Finance Tracker

A simple and intuitive web application to track your daily expenses, income, and savings goals.  
This side project is designed to help users take control of their personal finances by categorizing transactions, setting budgets, and monitoring spending trends.

---

## 🚀 Features

- 📊 **Dashboard** – Overview of your financial health  
- 💸 **Transactions** – Track income and expenses by category  
- 🏷️ **Custom Categories** – Create and manage your own tags  
- 📅 **Filtering** – View transactions by date range  
- 🎯 **Budgets** – Set and monitor monthly spending goals  
- 🔐 **Authentication** – Secure JWT-based user login & registration  
- 🌙 **Dark Mode** – Persistent dark/light theme toggle  
- 📱 **Responsive Design** – Works seamlessly on desktop & mobile  

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – UI development  
- **Tailwind CSS** – Styling and responsive design  
- **Lucide Icons** – Iconography  

### Backend
- **Spring Boot** – RESTful API services  
- **MongoDB** – NoSQL database for transactions, categories & users  
- **Spring Security + JWT** – Authentication & authorization  

---

## 📂 Project Structure

```bash
Budget-AI/
│── client/             # React frontend
│   ├── src/            # Components, hooks, pages
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
│
│── server/             # Spring Boot backend
│   ├── src/            # Java code (controllers, services, models)
│   ├── resources/      # Config files
│   └── pom.xml         # Backend dependencies
│
└── README.md

# Clone the repository
```
git clone https://github.com/Atharva0920/Budget-AI.git
cd Budget-AI
```
# Setup frontend

```
cd client
npm install
npm run dev   # Runs on http://localhost:5173
```

# Setup backend
```
cd ../server
./mvnw spring-boot:run   # Runs on http://localhost:8080
```

## 🔑 Authentication

- Uses **JWT (JSON Web Token)** for secure user sessions  
- Passwords are **hashed** before storage  
- Token is **validated** before accessing protected routes  

---

## 📸 Screenshots (Coming Soon)

- Dashboard view  
- Transactions page with filters  
- Dark mode UI  

---

## 📌 Roadmap

- [ ] Export transactions to CSV/Excel  
- [ ] AI-powered expense categorization  
- [ ] Multi-user support with shared budgets  
- [ ] Notifications for budget overspending  

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.  

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify.  


## 👨‍💻 Author
Developed by Atharva Ganmote 🚀
