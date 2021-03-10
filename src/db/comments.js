const User = require('./index').User
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            hooks: {
                beforeCreate: async function (comment) {
                    try {
                        const userwhoComment = await User.findByPK(comment.userId);
                        await User.update({ xp: userwhoComment.xp + 1, level: Math.trunc((userwhoComment.xp / 100)) }, { where: { id: comment.userId } });

                    } catch (e) {
                        console.log(e)
                    }
                },

            },
        }
    );
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post);
        Comment.belongsTo(models.User);
        Comment.hasMany(models.Reply);
        Comment.hasMany(models.CommentLike);
        Comment.hasMany(models.Tagged);
    };
    return Comment;
};