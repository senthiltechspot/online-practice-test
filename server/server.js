import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import mongooseConnection from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Use the mongooseConnection for any operations requiring a database connection
mongooseConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Optional: You can add additional event listeners to mongooseConnection if needed
mongooseConnection.once("open", () => {
  console.log("MongoDB connection established successfully");
});
