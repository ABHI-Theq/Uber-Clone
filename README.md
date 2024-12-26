# 📱 Mobile-Only Uber Clone

A MERN stack ride-sharing application designed exclusively for mobile screens (320px - 428px). This is not a responsive website - it's purposefully built to work only on mobile devices.

## 📱 Features

- **Mobile-Only Design**
  - Fixed mobile viewport (320px - 428px)
  - No desktop or tablet layouts
  - Portrait orientation optimized
  - Native-like mobile experience

- **Core Features**
  - User authentication
  - Real-time ride tracking
  - Interactive maps using Leaflet
  - Location services via GOMaps Pro
  - Ride booking and history

## 🛠️ Tech Stack

- **Frontend**
  - React.js
  - Redux for state management
  - Tailwind CSS (mobile-only utilities)
  - Leaflet for maps
  - Socket.io client

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Socket.io

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uber-clone.git
   cd uber-clone
   ```

2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Environment setup:
   ```bash
   # Backend .env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOMAPS_API_KEY=your_gomaps_api_key

   # Frontend .env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

## 📱 Mobile Design Specifications

- **Viewport**
  - Width: 320px - 428px
  - Orientation: Portrait
  - No landscape support
  - No desktop/tablet views

- **UI Elements**
  - Large touch targets (min 44px)
  - Bottom navigation bar
  - Full-width buttons
  - Native-like bottom sheets
  - Mobile-optimized forms

## 🗺️ Features

- Real-time location tracking
- Interactive map interface
- Ride booking system
- Driver matching
- Trip history
- User profiles
- Payment integration

## 📱 API Endpoints

### Auth
- POST user/register
- POST user/login
- GET user/profile

### Rides
- POST /rides/createride
- GET /rides/start-ride
- PUT rides/end-ride
- GET /api/rides/history

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request


## 👥 Author

- Your Name - [GitHub Profile](https://github.com/ABHI-Theq)

## 🙏 Acknowledgments

- GOMaps Pro SDK
- Leaflet
- MongoDB team
- Express.js community
