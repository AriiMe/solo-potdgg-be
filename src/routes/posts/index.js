const express = require("express");
const Post = require("../../db").Post;
const User = require("../../db").User;
const Comment = require("../../db").Comment;
const Like = require("../../db").Like;
const CommentLike = require("../../db").CommentLike;
const Reply = require("../../db").Reply;
const ReplyLike = require("../../db").ReplyLike;
const Tagged = require("../../db").Tagged;
const multer = require("multer");
const cloudinary = require("../../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "potd-posts",
    },
});
const cloudinaryMulter = multer({ storage: storage });

const router = express.Router();

router.post("/", cloudinaryMulter.single("PostImage"), async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.user.dataValues.id,
            imgurl: req.file.path,
        });
        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [
                User,
                { model: Comment, include: [User, CommentLike, Reply] },
                Like,
                Tagged,
            ],
        });
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            include: [
                User,
                { model: Comment, include: [User, CommentLike, Reply] },
                Like,
                Tagged,
            ],
        });
        res.send(singlePost);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const postToDelete = await Post.findByPk(req.params.id);
        console.log(postToDelete);
        console.log(req.user);
        if (postToDelete.dataValues.userId === req.user.dataValues.id) {
            await Post.destroy({ where: { id: req.params.id } });
            res.send("Post destroyed");
        } else {
            res
                .status(401)
                .send("Unauthorized: You cannot delete other peoples posts!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const postToDelete = await Post.findByPk(req.params.id);
        if (postToDelete.dataValues.userId === req.user.dataValues.id) {
            const alteredPosts = await Post.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            res.send(alteredPosts);
        } else {
            res.status(401).send("Unauthorized: This is not your post!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

module.exports = router;