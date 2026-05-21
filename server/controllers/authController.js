// server/controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, voterId, aadhaarNumber, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check duplicate voterId / aadhaar
    const existingVoter = await User.findOne({ voterId });
    if (existingVoter) {
      return res.status(400).json({ message: "Voter ID already registered" });
    }

    const existingAadhaar = await User.findOne({ aadhaarNumber });
    if (existingAadhaar) {
      return res.status(400).json({ message: "Aadhaar number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      voterId,
      aadhaarNumber,
      role,
    });

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      hasVoted: user.hasVoted,
    };

    res.status(201).json({
      user: userObj,             // ✅ context needs this
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      const userObj = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasVoted: user.hasVoted,
      };

      res.status(200).json({
        user: userObj,           // ✅ context needs this
        token: generateToken(user._id),
      });

    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};