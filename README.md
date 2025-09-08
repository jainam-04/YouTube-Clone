# 🎥 YouTube Clone

A full-featured YouTube clone web application where users can sign in, create and manage channels, upload and interact with videos, and engage with the community through comments and likes.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🚀 Features

- 🔐 **Authentication**: Users can sign in securely using JWT/OAuth.
- 🎬 **Channel Management**:
  - Create a personal channel
  - Edit channel details
- 📤 **Video Upload & Management**:
  - Upload videos
  - View videos from all users
  - Download videos (Free users limited, Premium users unlimited)
- 💻 **Video Player Features**:
  - Play videos at multiple qualities (320p, 480p, 720p, 1080p)
  - Custom controls including speed, quality, and fullscreen
- 💰 **Subscription & Payment**:
  - Upgrade plans: Free, Bronze, Silver, Gold
  - Time-limited video access based on plan
  - Razorpay integration for test payments
  - Email invoice on successful payment
- 💬 **Comments System**:
  - Post comments on videos
  - Edit and delete your own comments
- 👍 **Engagement Features**:
  - Like or dislike videos
  - Save videos for later
- ⏱ **Watch History & Watch Later**:
  - Tracks watched videos
  - Access saved videos for later viewing
- ❤️ **Liked Videos**:
  - Easily revisit videos you've liked
- 🌐 **Dynamic Theme & OTP Verification**:
  - Website theme changes based on login time and location
  - OTP sent via email for southern India, via mobile (Fast2SMS) for other states
- 📹 **VoIP & Screen Sharing**:
  - Video calls between users
  - Share YouTube screen
  - Record video sessions locally

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js / Express / MongoDB
- **Authentication**: JWT / OAuth
- **State Management**: Redux
- **Database ORM**: Mongoose
- **Payment**: Razorpay
- **Email**: Nodemailer
- **SMS**: Fast2SMS
- **Video Features**: Custom HTML5 video player, screen recording, video call via WebRTC

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jainam-04/YouTube-Clone.git
cd YouTube-Clone

# Install dependencies
npm install

# Set up environment variables
# (e.g., .env file for DB, JWT secrets, etc.)

# Start the server
npm run dev
```

---

## ✍️ Usage

1. Sign in to create an account.
2. Create your own channel.
3. Upload and manage your videos.
4. Interact with videos using likes, comments, and save-for-later.
5. Revisit your activity via History, Liked, or Watch Later sections.

---

## 🙌 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📫 Contact

For any questions or feedback, reach out at:
📧 [jainamrupani04@gmail.com]
🔗 https://github.com/jainam-04
