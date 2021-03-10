const express = require("express");
const Like = require("../../db").Like;

const router = express.Router();

router.post("/:userId/:postId", async (req, res) => {
    try {
        const like = await Like.findOne({
            where: { userId: req.params.userId, postId: req.params.postId },
        });
        if (like) {
            await Like.destroy({
                where: { userId: req.params.userId, postId: req.params.postId },
            });
        } else {
            const newLike = await Like.create({
                userId: req.params.userId,
                postId: req.params.postId,
            });
        }

        res.status(201).send("ok");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/:userId/:postId/posts", async (req, res) => {
    try {
        const likes = await Like.count({ where: { postId: req.params.postId } });
        const like = await Like.findOne({
            where: { userId: req.params.userId, postId: req.params.postId },
        });
        const data = {
            total: likes,
        };
        if (like) {
            data.isLiked = true;
        } else {
            data.isLiked = false;
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Like.destroy({ where: { id: req.params.id } });
        res.send("like removed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

module.exports = router;