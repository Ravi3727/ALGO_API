## Algo Api's 🚀  
### A full-stack web application with an Express.js backend and a Vite + TailwindCSS frontend. This guide will help you set up the project locally, both normally and using Docker. 

### 🛠️ Tech Stack 
#### Frontend: 
Vite ⚡ 
React 
TailwindCSS 🎨 
#### Backend: 
Node.js 
Express.js 
MongoDB (via Mongoose) 
dotenv (for environment variables) 

### 🚀 Getting Started 
#### 1️⃣ Clone the Repository 
```git clone https://github.com/Ravi3727/ALGO_API.git``` 
```cd ALGO_API``` 

#### 📦 Backend Setup  
##### 🔹 Running the Backend Normally 
###### 1. Navigate to the backend directory: 
```cd backend``` 
###### Install dependencies: 
```npm install``` 

#### Set up environment variables: 
Create a .env file in the backend folder. 
Add the following (update values as needed): 
```PORT=3000``` 
```MONGO_URI=your_mongodb_connection_string``` 
#### Start the server: 
```npm run dev``` 
The backend will start on http://localhost:5000. 


##### 🎨 Frontend Setup 
###### 🔹 Running the Frontend Normally 
###### 1. Navigate to the frontend directory: 
```cd frontend``` 
###### Install dependencies: 
```npm install``` 
###### Start the frontend server: 
```npm run dev``` 
The frontend will be available at http://localhost:5173 


### 🐳 Running the Project with Docker 
#### 🔹 Using Docker Compose 
Ensure you have Docker installed. 
Create a .env file in the backend directory (same as above). 
Run the project using Docker Compose: 
```docker-compose up --build``` 
###### Access the application: 
Backend: ```http://localhost:3000```  
Frontend: ```http://localhost:5173``` 

To stop the containers, use: 
```docker-compose down``` 


#### 📁 Project Structure  
ALGO_API/ 
│── backend/       # Express.js Backend 
│── frontend/      # Vite + TailwindCSS Frontend 
│── docker-compose.yml 
│── README.md 











