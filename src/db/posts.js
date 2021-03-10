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

                        const user = await User.findByPk(post.userId)

                        await User.update({ xp: user.xp + 5, level: Math.trunc((user.xp / 100)) }, { where: { id: post.userId } })

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