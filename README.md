# BlueMart

A modern full-stack grocery and snack delivery application built by Rahul Dhakad.

---

## 🚀 Features

* Fresh groceries and snacks delivered to your door
* Seamless and fast shopping experience
* Secure payments integration
* Scalable full-stack architecture

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, TailwindCSS
* **Backend:** Node.js, Express, MongoDB
* **Payments:** Stripe
* **Media:** Cloudinary
* **DevOps:** Docker, GitHub Actions (CI/CD)

---

## ⚙️ DevOps Workflow

```text
👨‍💻 Developer (You)
   │
   ▼
Write Code (client/src OR server/*)
   │
   ▼
Git Add → Commit (<500 lines)
   │
   ▼
Push to GitHub (main / PR)
   │
   ▼
⚙️ GitHub Actions Triggered
   │
   ├───────────────┐
   ▼               ▼

🟦 Client Build    🟩 Server Build
- Install deps     - Install deps
- Lint             - Basic checks
- Test             - Validation
- Build           

   │
   └───────┬───────┘
           ▼

🐳 Docker Build
- Client image (Nginx)
- Server image

           │
           ▼

📦 docker-compose
- Runs full application

           │
           ▼

🚀 Deployment (AWS EC2)
- Automated via CI/CD

           │
           ▼

🌐 Live Application
```

---

## ▶️ Getting Started

Run the project locally:

```bash
bash start.sh
```

---

## 🧪 Testing

* Unit testing using Jest
* Integration testing for API and backend
* (Optional) End-to-End testing using Cypress

---

## 📦 Deployment

* Dockerized application
* CI/CD pipeline using GitHub Actions
* Ready for deployment on AWS EC2

---

## 📚 Project Explanation

This project follows a CI/CD-based DevOps workflow where every code push triggers automated builds, lint checks, and tests. Docker is used for containerization, ensuring consistency across environments. The system is designed to be scalable, maintainable, and production-ready.

---

## 👨‍💻 Author

* Rahul Dhakad
