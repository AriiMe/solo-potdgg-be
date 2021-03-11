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
                        if (userwhoStalked.role === "VIP") {
                            await User.update({ xp: userwhoStalked.xp + 30, level: Math.trunc((userwhoStalked.xp / 100)), coins: Math.trunc((userwhoStalked.level * 20)) }, { where: { id: like.userId } })
                        } else {
                            await User.update({ xp: userwhoStalked.xp + 5, level: Math.trunc((userwhoStalked.xp / 100)), coins: Math.trunc((userwhoStalked.level * 10)) }, { where: { id: like.userId } })
                        }
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
