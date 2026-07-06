# ✨ Scriptora

Scriptora is a modern, full-stack social storytelling platform where users can create, share, and manage their posts with a clean Instagram-like interface.

Built with a focus on **beautiful UI, smooth UX, and scalable architecture**, Scriptora combines authentication, profile management, notifications, and security settings into one seamless experience.

---

## 🚀 Features

### 👤 User System
- User authentication (Login / Signup)
- Profile management
- Avatar upload & update
- Secure session handling

### 📝 Posts System
- Create, edit, and delete posts
- Image upload support
- Clean feed-style layout

### 🔔 Notifications
- Email notifications toggle
- New follower alerts
- Simple and intuitive settings UI

### 🔐 Security
- Change password feature
- Email verification status
- Two-factor authentication (UI ready / extendable)

### 🎨 Appearance
- Light / Dark mode toggle
- Persistent theme using `localStorage`
- Instagram-style UI system

---

## 🧑‍💻 Tech Stack

- ⚛️ React.js
- 🎨 Tailwind CSS
- 🔥 Lucide Icons
- 🌐 React Router DOM
- 🗄️ Appwrite (Auth + Database + Storage)

---

## 📁 Project Structure

src/
│
├── components/
│ ├── AvatarSettings.jsx
│ ├── NotificationSettings.jsx
│ ├── SecuritySettings.jsx
│ ├── AppearanceSettings.jsx
│
├── pages/
│ ├── Home.jsx
│ ├── Profile.jsx
│ ├── Settings.jsx
│
├── appwrite/
│ ├── config.js
│ ├── auth.js
│
├── redux/
│ ├── store.js
│ ├── authSlice.js
│
└── App.jsx
