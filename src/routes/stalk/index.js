const express = require("express");
const Stalk = require("../../db").Stalk;
const Stalker = require("../../db").Stalker;

const router = express.Router();

router.post("/:userId/", async (req, res) => {
    try {
        const stalk = await Stalk.findOne({
            where: {
                userId: req.user.dataValues.id,
                stalking_id: req.params.userId,
            },
        });
        if (stalk) {
            await Stalk.destroy({
                where: {
                    userId: req.user.dataValues.id,
                    stalking_id: req.params.userId,
                },
            });
            await Stalker.destroy({
                where: {
                    userId: req.params.userId,
                    stalker_id: req.user.dataValues.id,
                },
            });
            res.status(201).send("Stalk removed!");
        } else {
            await Stalk.create({
                userId: req.user.dataValues.id,
                stalking_id: req.params.userId,
            });
            await Stalker.create({
                userId: req.params.userId,
                stalker_id: req.user.dataValues.id,
            });
            res.status(201).send("Stalk created!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/:userId/:stalkId", async (req, res) => {
    try {
        const stalks = await Stalk.count({
            where: { stalkId: req.params.stalkId },
        });
        const stalk = await Stalk.findOne({
            where: { userId: req.params.userId, stalkId: req.params.stalkId },
        });
        const data = {
            total: stalks,
        };
        if (stalk) {
            data.isStalked = true;
        } else {
            data.isStalked = false;
        }

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Stalk.destroy({
            where: {
                userId: req.user.dataValues.id,
                stalking_id: req.params.userId,
            },
        });
        await Stalker.destroy({
            where: {
                userId: req.params.userId,
                stalker_id: req.user.dataValues.id,
            },
        });
        res.send("stalk removed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

module.exports = router;