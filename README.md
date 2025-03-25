

---

### Steps to start the project:

**Clone Repository or Download the ZIP file of the project**
To Clone the project:
`git clone https://github.com/AmanKureshi06/lawsync-public.git`

**Step 1:**  
Open the terminal and open the 'Client' folder using the command:  
`cd .\Client\`  

Install client dependencies using the command:  
`npm install`  

**Step 2:**  
Open another terminal and open the 'Server' folder and perform Step 1 again.  

**Step 3:**  
In the Server's terminal, start the project using the command:  
`npm run dev`  
This will start the backend server of the project.  

**Step 4:**  
In the Client's terminal, start the project using the command:  
`npm start`  
This will start the client side of the project.  

---

### .env File:

```
PORT=5000
MONGO_URI=mongodb+srv://amankureshi060906:amankureshi@cluster0.8elu6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=c7ad0fa3a85b4a3489e7c9f83f528c55e7e0f2aafba8e9b2e3d78d08460eafc8
ENCRYPTION_KEY=f84d4cbbe3abd5d9de18b8b5362e857d96e275801e590edb0a3dc5425e32f3cc
```

The `.env` file should be placed inside the **'Server'** folder of the project.  

**Note:** Change the `MONGO_URI` value according to your MongoDB connection string.  

---
