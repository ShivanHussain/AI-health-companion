# AI Health Companion

A full-stack **AI-health Companion** built using the MERN stack and Machine Learning. This application allows users to track their health records and receive intelligent insights, risk analysis, and recommendations powered by an AI model.

---

## Features

- **User Authentication**: Secure JWT-based login/register system
- **Health Records Management**: Track checkups, symptoms, medications, exercise, diet
- **AI-Powered Insights**: Automatic recommendations based on health data
- **Dashboard**: Comprehensive health records management
- **Responsive Design**: Mobile-friendly interface
- **Secure**: Password hashing aur protected routes


###  AI-Powered Analysis

* ML model predicts **Risk Level (Low / Medium / High)**
* Generates **Health Score**
* Provides **Smart Recommendations**

###  Dashboard

* Clean and responsive UI
* View all records with AI insights
* Modern card-based design

###  Responsive UI

* Mobile-friendly design
* Smooth UX with React

---

##  System Architecture

```
Frontend (React)
      ↓
Backend (Node.js + Express)
      ↓
AI Service (FastAPI + ML Model)
      ↓
MongoDB Database
      ↓
Frontend Display (AI Cards)
```

---

##  Project Structure

```
ai-health-companion/
│
├──frontend/               # React frontend
|   ├── public/            # Static files
|   ├── src/
|   │   ├── components/    
|   │   ├── context/       
|   │   ├── pages/      
|   │   ├── App.jsx        
|   │   ├── App.css   
|   │   └── main.jsx
|   ├── package.json       
|   └── vite.config.js     
│
├── backend/                 
│   ├── config/             
│   ├── controllers/       
│   ├── middleware/         
│   ├── models/        
│   ├── routes/    
│   ├── utils/            
│   ├── .env.example      
│   ├── package.json       
│   └── server.js          
│
├── ai-model/               # ML Model + FastAPI
│   ├── train_model.py
│   ├── ai_api.py
│   ├── dataset.csv
│   ├── model.pkl
│   ├── type_encoder.pkl
│   ├── risk_encoder.pkl
│   └── requirements.txt
│
└── README.md
```

---

##  Tech Stack

###  Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

###  Frontend

- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

###  AI / ML

* Python
* FastAPI
* Scikit-learn
* Pandas
* Joblib

---

## ⚙️ Installation & Setup

---

###  Step 1: Clone Repository

```bash
git clone https://github.com/your-username/ai-health-companion.git
cd ai-health-companion
```

---

###  Step 2: Setup AI Model

```bash
cd ai-model

pip install -r requirements.txt

# Train model
python train_model.py

# Start AI API
uvicorn ai_api:app --reload --port 5001
```

👉 Test API:
http://localhost:5001/docs

---

### ⚙️ Step 3: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-health
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

---

###  Step 4: Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

---

##  API Flow

```
Frontend Form Submit
        ↓
POST /api/health
        ↓
Backend → FastAPI (/predict)
        ↓
AI Model → Prediction + Recommendation
        ↓
MongoDB Save
        ↓
Frontend Display
```

---

##  API Endpoints

###  Auth

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

###  Health Records

```
GET    /api/health
POST   /api/health
GET    /api/health/:id
PUT    /api/health/:id
DELETE /api/health/:id
```

---

##  Sample Input

```json
{
  "type": "checkup",
  "bloodPressure": "150/95",
  "heartRate": 105,
  "temperature": 38.2,
  "weight": 75
}
```

---

##  Sample AI Output

```json
{
  "riskLevel": "Medium",
  "healthScore": 80,
  "recommendations": [
    "High blood pressure detected",
    "High heart rate detected",
    "Fever detected",
    "Monitor your health"
  ]
}
```

---

##  Security Features

* Password hashing (bcrypt)
* JWT authentication
* Protected API routes
* Environment variables

---

##  Common Errors & Fixes

###  AI API not working

```
ECONNREFUSED localhost:5001
```

✔ Fix:

```bash
uvicorn ai_api:app --reload --port 5001
```

##  Deployment

### Backend

* Render / Railway / AWS

### Frontend

* Vercel / Netlify

### AI Model

* Render (Python service)

---

##  Future Improvements

* NLP-based symptom analysis
* AI Chatbot integration
* Real medical dataset training
* Graph analytics dashboard
* Wearable device integration

---

##  Author

**Shivan Hussain**
B.Tech CSE | MERN Stack Developer | AI Enthusiast

---

##  Contribution

Feel free to fork this repo and contribute!

---

##  License

MIT License

---

##  Disclaimer

This project is for educational purposes only.
Not intended for real medical diagnosis.
