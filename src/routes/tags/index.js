const express = require("express");
const Post = require("../../db").Post;
const Tagged = require("../../db").Tagged;

const router = express.Router();

router.post("/:postId/:userId", async (req, res) => {
    try {
        const postToTag = await Post.findByPk(req.params.postId);
        if (postToTag.dataValues.userId === req.user.dataValues.id) {
            const isItTagged = await Tagged.findOne({
                where: { postId: req.params.postId, userId: req.params.userId },
            });
            if (isItTagged) {
                await Tagged.destroy({
                    where: { postId: req.params.postId, userId: req.params.userId },
                });
                res.send("Removed Tag!");
            } else {
                await Tagged.create({
                    postId: req.params.postId,
                    userId: req.params.userId,
                });
                res.send("Added Tag");
            }
        } else {
            res.status(401).send("Unauthorized: This is not your post!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

module.exports = router;