const express = require("express");
const Stalk = require("../../db").Stalk;
const Stalker = require("../../db").Stalker;

const router = express.Router();

router.post("/:userId/", async (req, res) => {
    try {
        const stalker = await Stalker.findOne({
            where: {
                userId: req.user.dataValues.id,
                stalker_id: req.params.userId,
            },
        });
        if (stalker) {
            await Stalker.destroy({
                where: {
                    userId: req.user.dataValues.id,
                    stalker_id: req.params.userId,
                },
            });
            await Stalk.destroy({
                where: {
                    userId: req.params.userId,
                    stalking_id: req.user.dataValues.id,
                },
            });
            res.status(201).send("Stalker removed!");
        } else {
            await Stalker.create({
                userId: req.user.dataValues.id,
                stalker_id: req.params.userId,
            });
            await Stalk.create({
                userId: req.params.userId,
                stalking_id: req.user.dataValues.id,
            });
            res.status(201).send("Stalker created!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        res.send("stalk removed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

module.exports = router;