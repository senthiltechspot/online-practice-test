import express from "express";
import userRoute from "./authRoutes.js";
import quizRoutes from "./quizRoutes.js";

const router = express.Router();

router.use("/auth", userRoute);
router.use("/quiz", quizRoutes);

router.use("/check", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is up and running!",
  });
});

export default router;