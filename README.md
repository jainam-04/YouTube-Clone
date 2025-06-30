# 🎥 YouTube Clone

A full-featured YouTube clone web application where users can sign in, create and manage channels, upload and interact with videos, and engage with the community through comments and likes.

---

## 📚 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🚀 Features

- 🔐 **Authentication**: Users can sign in securely.
- 🎬 **Channel Management**:
  - Create a personal channel
  - Edit channel details
- 📤 **Video Upload**:
  - Upload videos
  - View videos from all users
- 💬 **Comments System**:
  - Post comments on videos
  - Edit and delete your own comments
- 👍 **Engagement Features**:
  - Like or dislike videos
  - Save videos for later
- ⏱ **Watch History**:
  - Tracks watched videos
- 🕒 **Watch Later**:
  - Access saved videos for later viewing
- ❤️ **Liked Videos**:
  - Easily revisit videos you've liked

---

## 📸 Screenshots

1. **Home Page**

![image](https://github.com/user-attachments/assets/86d3f3d6-939d-465d-a4f9-f2dbf291f9a7)

2. **Channel Page**

![image](https://github.com/user-attachments/assets/14cc1e4f-e057-4cbf-94a8-b20ff74debc2)

3. **Video Page**

![image](https://github.com/user-attachments/assets/4f30d898-fb6d-4fa9-a119-83b2239e572c)
![image](https://github.com/user-attachments/assets/38354a12-e39b-4c02-8fea-b2d325b01ffd)

4. **Library Page**

![image](https://github.com/user-attachments/assets/1e14c6e9-5bfe-4038-b70a-529bce261ee9)
![image](https://github.com/user-attachments/assets/67dfd3f8-4809-4de5-ab25-d815c6fda089)

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js / Express / MongoDB
- **Authentication**: JWT / OAuth
- **Other**: Redux / Mongoose

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

## 🛠️ Future Enhancements

1. **Task 1** : Add a video player that supports playing same video at different qualities eg 320p, 480p, 720p, 1080p etc.

2. **Task 2** : Create a feature to upgrade the plan to Bronze, silver and Gold. For free plan user can only watch videos for 5 mins. For Bronze plan user can watch videos for 7 mins. For Silver plan they can watch videos for 10 mins and for gold plan they can watch videos unlimited time. Bronze cost 10rs, silver cost 50rs and gold cost 100rs. We should trigger an email to user once payment is succesful and share an invoice.

3. **Task 3** : Create a feature to download the video on website itself and show it on user profile under download option. We should be able to download only one video per day. If they want to download more than one video they should go for premium plan where they can click on premium option and setup the Razorpay payment gateway for test payment. If the payment is successful they can downlod as much as video possible.

4. **Task 4** : Change the website color or theme according to time of login and location. If we access the website between 10 AM to 12 Pm as well as if the location is south india (Tamil nadu, Kerala, karnataka, Andhra and Telungana) we should keep white theme and for other timing and other states we should keep dark theme. If the user login from southern states(Tamil nadu, Kerala, karnataka, Andhra and Telungana) we should trigger an email for OTP Verification if the user login from other states we should trigger an OTP through mobile number.

5. **Task 5** : Incorporate a feature into the web app that allows users to make video calls to their friends and share screen of youtube website and we should have option to record the video session and save it in local.

---

## 🙌 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📫 Contact

For any questions or feedback, reach out at:
📧 [jainamrupani04@gmail.com]
🔗 https://github.com/jainam-04
