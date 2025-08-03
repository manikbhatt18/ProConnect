const express = require("express");
const { createPost, getAllPosts, getUserPosts } = require("../controllers/postController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts);

module.exports = router;
