import express from "express";
import { auth } from "../../middleware/authMiddleware.js";
import User from "../../models/user.js";
const router = express.Router();

// Start quiz route
router.get("/details", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findOne({ _id: id });
  const response = {
    name: user.name,
    email: user.email,
    id: user._id,
  };
  res.status(200).json(response);
});

export default router;
