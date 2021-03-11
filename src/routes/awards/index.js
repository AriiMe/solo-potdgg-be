const express = require("express");
const Awards = require("../../db").Awards;

const router = express.Router();

router.post("/:userId/:postId", async (req, res) => {
    try {
        const award = await Awards.findOne({
            where: { userId: req.params.userId, postId: req.params.postId },
        });

        const newAward = await Awards.create({
            userId: req.params.userId,
            postId: req.params.postId,
        });

        res.status(201).send("ok");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/:userId/:postId/awards", async (req, res) => {
    try {
        const awards = await Awards.count({ where: { postId: req.params.postId } });
        const award = await Awards.findOne({
            where: { userId: req.params.userId, postId: req.params.postId },
        });
        const data = {
            total: awards,
        };
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});
