module.exports = (sequelize, DataTypes) => {
    const Award = sequelize.define(
        "award",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            imgurl: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
        },
        { timestamps: true }
    );
    Award.associate = (models) => {
        Award.belongsTo(models.Post);
        Award.belongsTo(models.User);
    };
    return Award;
};