const express = require("express");
const { authenticate } = require("../auth");
const router = express.Router();
const userRoute = require("./users");
const postRoute = require("./posts");
const replyRoute = require("./reply");
// const replyLikeRoute = require("./replylike");
const commentRoute = require("./comments");
const likeRoute = require("./like");
const stalkRoute = require("./stalk");
const stalkerRoute = require("./stalker");
const commentLikeRoute = require("./commentlikes");
const savedPostRoute = require("./savedposts");
const taggedRoute = require("./tags");

router.use("/users", userRoute);
router.use("/posts", authenticate, postRoute);
router.use("/reply", authenticate, replyRoute);
// router.use("/replylike", authenticate, replyLikeRoute);
router.use("/comments", authenticate, commentRoute);
router.use("/like", authenticate, likeRoute);
router.use("/stalk", authenticate, stalkRoute);
router.use("/stalker", authenticate, stalkerRoute);
router.use("/commentlike", authenticate, commentLikeRoute);
router.use("/savedposts", authenticate, savedPostRoute);
router.use("/tags", authenticate, taggedRoute);
module.exports = router;