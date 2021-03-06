const express = require("express");

const postController = require("../controllers/post");
const extractFile = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, extractFile, postController.addPost);

router.put("/:id", checkAuth, extractFile, postController.updatePost);

router.get("", postController.getPosts);

router.get("/:id", postController.getPost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
