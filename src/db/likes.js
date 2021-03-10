const User = require('./index').User
const Post = require('./index').Post
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        "like",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            timestamps: true,
            hooks: {
                beforeCreate: async function (like) {
                    try {
                        //find user's xp who Liked the post
                        const userwhoLiked = await User.findByPK(like.userId)
                        //find user's xp to whom the post belongs
                        const post = await Post.findByPK(like.postId, { include: User })


                        await User.update({ xp: userwhoLiked.xp + 1, level: Math.trunc((userwhoLiked.xp / 100)) }, { where: { id: like.userId } })

                        await User.update({ xp: post.user.xp + 5, level: Math.trunc((post.user.xp / 100)) }, { where: { id: post.userId } })

                    } catch (e) {
                        console.log(e)
                    }
                },

            },
        }
    );
    Like.associate = (models) => {
        Like.belongsTo(models.Post);
        Like.belongsTo(models.User);
    };
    return Like;
};