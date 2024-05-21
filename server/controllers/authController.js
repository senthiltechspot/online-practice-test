import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import keys from "../config/keys.js";
import axios from "axios";

const saltRounds = 10; // Define salt rounds for bcrypt hashing

// Sign up
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        return res.status(500).json({ msg: "Server error" });
      }
      res.status(200).json({ token });
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        return res.status(500).json({ msg: "Server error" });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Google OAuth
const googleOAuth = async (req, res) => {
  const { access_token } = req.body;

  try {
    // Get user info from Google OAuth
    const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { name, email, sub: googleId } = response.data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "No User Found" });
    }

    // Update or create user with Google ID
    user.googleId = googleId;
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        return res.status(500).json({ msg: "Server error" });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error("Google OAuth error:", err.response ? err.response.data : err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export { signup, login, googleOAuth };
