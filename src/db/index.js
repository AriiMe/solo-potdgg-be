
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("./users");
const Post = require("./posts");
const Stalk = require("./stalk");
const Comment = require("./comments");
const Like = require("./likes");
const CommentLike = require("./commentlikes");
const ReplyLike = require("./replylike");
const Stalker = require("./stalker");
const SavedPost = require("./savedposts");
const Reply = require("./reply");
const Tagged = require("./tagged");
const Award = require("./awards")
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: "postgres",
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
    }
);

const models = {
    User: User(sequelize, DataTypes),
    Post: Post(sequelize, DataTypes),
    Stalk: Stalk(sequelize, DataTypes),
    Stalker: Stalker(sequelize, DataTypes),
    Comment: Comment(sequelize, DataTypes),
    Like: Like(sequelize, DataTypes),
    ReplyLike: ReplyLike(sequelize, DataTypes),
    Award: Award(sequelize, DataTypes),
    Reply: Reply(sequelize, DataTypes),
    Tagged: Tagged(sequelize, DataTypes),
    SavedPost: SavedPost(sequelize, DataTypes),
    CommentLike: CommentLike(sequelize, DataTypes),
};
Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
models.sequelize = sequelize;

module.exports = models;
