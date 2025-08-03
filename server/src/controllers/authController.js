const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../utils/otpGenerator");
const { mailSender } = require("../config/mailSender");

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Set expiry (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP to DB
    await OTP.create({ email, otp, expiresAt });

    // Send email
    await mailSender(
      email,
      "Verify your Email",
      `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes</p>`
    );

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};
// Verify OTP and Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, bio, otp } = req.body;

    const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOTP || recentOTP.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, bio });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await OTP.deleteMany({ email });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Return token and user (excluding password)
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user }); // Always return { user }
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};