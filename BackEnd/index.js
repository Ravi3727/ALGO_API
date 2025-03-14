require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const algorithmRoutes = require("./routes/algorithms");
const logRoutes = require("./routes/logRoutes");

const app = express();
connectDB();

const corsOptions = {
  origin: "https://algo-api-sigma.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the algorithms API!");
});
app.use("/api/v1", logRoutes);
app.use("/api/v1", algorithmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
