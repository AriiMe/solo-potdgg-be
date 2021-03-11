const db = require('./users')
module.exports = (sequelize, DataTypes) => {
    const User = db(sequelize, DataTypes)
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
                        const userwhoComment = await User.findByPk(comment.userId);
                        await User.update({ xp: userwhoComment.xp + 50, level: Math.trunc((userwhoComment.xp / 100)), coins: Math.trunc((userwhoLiked.level * 18))  }, { where: { id: comment.userId } });

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