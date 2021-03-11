const dbuser = require('./users')
module.exports = (sequelize, DataTypes) => {
    const User = dbuser(sequelize, DataTypes)
    console.log(User)
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
                        const userwhoLiked = await User.findByPk(like.userId)
                        //find user's xp to whom the post belongs
                        // const post = await Post.findByPk(like.postId, { include: User })



                        if (userwhoLiked.role === "VIP") {
                            await User.update({ xp: userwhoLiked.xp + 100, level: Math.trunc((userwhoLiked.xp / 100)), coins: Math.trunc((userwhoLiked.level * 20)) }, { where: { id: like.userId } })
                        } else {
                            await User.update({ xp: userwhoLiked.xp + 10, level: Math.trunc((userwhoLiked.xp / 100)), coins: Math.trunc((userwhoLiked.level * 10)) }, { where: { id: like.userId } })
                        }

                        // await User.update({ xp: post.user.xp + 50, level: Math.trunc((post.user.xp / 100)) }, { where: { id: post.userId } })

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