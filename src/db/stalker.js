const User = require('./index').User
module.exports = (sequelize, DataTypes) => {
    const Stalker = sequelize.define(
        "stalker",
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
                beforeCreate: async function (stalker) {
                    try {
                        const userwhoStalked = await User.findByPk(stalker.userId)
                        await User.update({ xp: userwhoStalked.xp + 5, level: Math.trunc((userwhoStalked.xp / 100)) }, { where: { id: stalker.userId } })

                    } catch (e) {
                        console.log(e)
                    }
                },

            },
        }
    );
    Stalker.associate = (models) => {
        Stalker.belongsTo(models.User, {
            as: "stalker",
            foreignKey: "stalker_id",
        });
    };
    return Stalker;
};
