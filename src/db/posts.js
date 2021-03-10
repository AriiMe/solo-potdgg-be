const User = require('./index').User
module.exports = (sequelize, DataTypes) => {
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

                        const post = await Post.findByPK(post.postId, { include: User })

                        await User.update({ xp: post.user.xp + 5, level: Math.trunc((post.user.xp / 100)) }, { where: { id: post.userId } })

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