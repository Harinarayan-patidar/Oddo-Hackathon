# ReWear – Community Clothing Exchange 👕♻️

### 🧩 Problem Statement 3:
**Build a web-based platform to exchange unused clothing through direct swaps or a point-based system, promoting sustainable fashion.**

---

## 👥 Team Members

| Name               | Role           |
|--------------------|----------------|
| Harinarayan Patidar | Team Leader & Backend Lead |
| Kavendra Kumar | Frontend Developer |
| Rajni Rajawat | UI/UX Designer |
| Karan Sahu | Full Stack Developer |

---

## 🌍 Project Overview

**ReWear** is a community-driven clothing exchange platform designed to reduce textile waste and promote sustainable fashion. Users can swap clothes directly with others or redeem them using a point-based system.

---

## 🚀 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB             |
| Auth        | JWT, bcrypt         |
| Image Upload| Cloudinary          |
| Deployment  | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

### 👤 User
- Email/password signup & login
- Dashboard with profile, points, and swap status
- Add and list new clothing items
- Browse and request swaps
- Redeem items using points

### 🎨 Landing Page
- Platform introduction
- CTA buttons: “Start Swapping”, “Browse Items”, “List an Item”
- Featured items carousel

### 👕 Item Details
- View item description and images
- Swap directly or redeem via points
- Item status (Available/Swapped)

### 🧑‍⚖️ Admin Panel
- Approve/reject new item listings
- Remove spam/inappropriate content
- Lightweight, secure dashboard

---

## 🛠️ Installation & Setup

### Backend
```bash
git clone https://github.com/your-username/rewear-backend.git
cd rewear-backend
npm install

# Create .env file
touch .env