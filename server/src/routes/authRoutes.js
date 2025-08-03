const express = require("express");
const { sendOTP, register, login, getProfile } = require("../controllers/authController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);

module.exports = router;
