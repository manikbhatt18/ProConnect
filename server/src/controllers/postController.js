const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      author: req.user.id,
    });

    // Populate the newly created post with author's name
    const populatedPost = await post.populate("author", "name");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};

// Get All Posts (feed)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

// Get Posts of a Specific User
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).populate("author", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts", error: error.message });
  }
};
