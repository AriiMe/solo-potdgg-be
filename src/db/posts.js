const db = require('./users')

module.exports = (sequelize, DataTypes) => {
    const User = db(sequelize, DataTypes)
    const Post = sequelize.define(
        "post",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imgurl: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
        },
        {
            timestamps: true,
            hooks: {
                beforeCreate: async function (post) {
                    try {

                        const userwhoPosted = await User.findByPk(post.userId)





                        if (userwhoPosted.role === "VIP") {
                            await User.update({ xp: userwhoPosted.xp + 10, level: Math.trunc((userwhoPosted.xp / 100)), coins: Math.trunc((userwhoPosted.level * 20)) }, { where: { id: like.userId } })
                        } else {
                            await User.update({ xp: userwhoPosted.xp + 2, level: Math.trunc((userwhoPosted.xp / 100)), coins: Math.trunc((userwhoPosted.level * 10)) }, { where: { id: like.userId } })
                        }

                    } catch (e) {
                        console.log(e)
                    }
                },

            },
        }
    );
    Post.associate = (models) => {
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment);
        Post.hasMany(models.Like);
    };
    return Post;
};