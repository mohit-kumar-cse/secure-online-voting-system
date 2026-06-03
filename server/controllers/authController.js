// server/controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, voterId, aadhaarNumber, constituency } = req.body;

     
    if (!name || !email || !password || !voterId || !aadhaarNumber || !constituency) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({ message: "Aadhaar must be exactly 12 digits." });
    }

    
    const existingUser = await User.findOne({
      $or: [{ email }, { voterId }, { aadhaarNumber }],
    });

    if (existingUser) {
      if (existingUser.email === email)
        return res.status(409).json({ message: "Email already registered." });
      if (existingUser.voterId === voterId)
        return res.status(409).json({ message: "Voter ID already registered." });
    
      return res.status(409).json({ message: "Account already exists with provided details." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  
    const hashedAadhaar = await bcrypt.hash(aadhaarNumber, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      voterId: voterId.trim().toUpperCase(),
      aadhaarNumber: hashedAadhaar,
      constituency: constituency.trim(),
    });

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      hasVoted: user.hasVoted,
      constituency: user.constituency,
    };

    
    res.status(201).json({ user: userObj, token: generateToken(user._id) });

  } catch (error) {
    console.error("Register error:", error);
    
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
 
    const DUMMY_HASH = "$2a$10$dummyhashfordummypasswordtopreventtiming";
    const passwordToCompare = user ? user.password : DUMMY_HASH;
    const isMatch = await bcrypt.compare(password, passwordToCompare);

    if (!user || !isMatch) {
  
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const userObj = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      hasVoted: user.hasVoted,
      constituency: user.constituency,
    };

    res.status(200).json({ user: userObj, token: generateToken(user._id) });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};