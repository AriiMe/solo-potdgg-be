module.exports = (sequelize, DataTypes) => {
    const ReplyLike = sequelize.define(
        "replylike",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        { timestamps: true }
    );
    ReplyLike.associate = (models) => {
        ReplyLike.belongsTo(models.Post);
        ReplyLike.belongsTo(models.User);
    };
    return ReplyLike;
};