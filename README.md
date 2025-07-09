# AI-Driven Institutional Inspection System

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00)](https://www.tensorflow.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.x-5C3EE8)](https://opencv.org/)

## 🛠 Tech Stack

### Core Languages
- **Frontend**: JavaScript (React)
- **Backend**: Node.js, Python
- **AI/ML**: Python (TensorFlow, OpenCV, SpaCy, NLTK)

### Key Frameworks & Libraries
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Express.js, Flask
- **AI/ML**: TensorFlow, OpenCV, Transformers, PyTorch

## 📋 Overview

An AI-powered platform designed to automate and enhance institutional inspections using cutting-edge technologies. This system leverages Natural Language Processing (NLP), Computer Vision, and Machine Learning to provide intelligent insights and streamline compliance management.

## ✨ Features

- **User Authentication**
  - Secure OTP-based email verification
  - Role-based access control
  - Session management

- **Inspection Management**
  - Schedule and track inspections
  - Real-time status updates
  - Document management

- **AI/ML Capabilities**
  - **NLP Processing**: Text analysis of inspection reports and documents
  - **Computer Vision**: Image and video analysis using OpenCV
  - **Deep Learning**: TensorFlow-based models for pattern recognition
  - **Automated Compliance**: AI-driven compliance verification
  - **Anomaly Detection**: ML models to identify non-compliance patterns

- **Reporting**
  - Automated report generation
  - Compliance scoring
  - Historical data analysis

## 🖥️ System Architecture

### Frontend
- **Framework**: React 18
- **State Management**: React Context API
- **UI Components**: Custom components with Tailwind CSS
- **Form Handling**: React Hook Form
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Python Integration
- **Framework**: Express.js with Flask (for ML services)
- **AI/ML Services**:
  - **NLP Processing**: SpaCy, NLTK, Transformers
  - **Computer Vision**: OpenCV, TensorFlow Object Detection
  - **Deep Learning**: TensorFlow/Keras, PyTorch
- **Authentication**: JWT, OTP via Email
- **Rate Limiting**: Express Rate Limit with Redis fallback
- **Security**: Helmet, xss-clean, express-mongo-sanitize
- **Email**: Nodemailer with SMTP support

### Database
- **Primary**: MongoDB (with Mongoose ODM)
- **Caching**: Redis (optional)

## 🚀 Getting Started

### Prerequisites

- **Development Environment**:
  - Node.js 18.x or later
  - Python 3.8+ (for ML components)
  - pip (Python package manager)
  - npm 9.x or later

- **Databases**:
  - MongoDB 6.0 or later
  - Redis (for caching and rate limiting)

- **AI/ML Dependencies**:
  - TensorFlow 2.x
  - OpenCV
  - Python ML libraries (installed via requirements.txt)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SIH-2024-main.git
   cd SIH-2024-main
   ```

2. **Set up the backend**
   ```bash
   cd backend
   
   # Install Node.js dependencies
   npm install
   
   # Install Python dependencies for ML
   pip install -r requirements.txt
   
   # Set up environment
   cp .env.example .env
   # Update .env with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Update .env with your API endpoints
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API Server: http://localhost:4000

## 🔒 Environment Variables

### Backend (`.env`)
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/inspection_system
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
REDIS_HOST=localhost
REDIS_PORT=6379
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Frontend (`.env`)
```
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=Inspection System
```

## 🤖 AI/ML Components

### 1. Natural Language Processing (NLP)
- Text analysis of inspection reports
- Sentiment analysis of feedback
- Document classification and information extraction

### 2. Computer Vision
- Object detection in inspection images/videos
- Defect detection using OpenCV
- Automated compliance checking through visual inspection

### 3. Machine Learning Models
- Pre-trained models for common inspection scenarios
- Custom model training pipeline
- Model versioning and deployment

## 📚 API Documentation

API documentation is available at `/api-docs` when running the development server. This includes both RESTful endpoints and AI service endpoints.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All contributors who have helped shape this project
- Open source libraries and frameworks used in this project

---

<div align="center">
  Made with ❤️ by Your Team Name
</div>
