const db = require('./users')
module.exports = (sequelize, DataTypes) => {
    const User = db(sequelize, DataTypes)
    const Stalk = sequelize.define(
        "stalk",
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
                beforeCreate: async function (stalk) {
                    try {

                        const userwhoStalked = await User.findByPk(stalk.userId);
                        await User.update({ xp: userwhoStalked.xp + 20, level: Math.trunc((userwhoStalked.xp / 100)) }, { where: { id: stalk.userId } });


                    } catch (e) {
                        console.log(e)
                    }
                },

            },
        }
    );
    Stalk.associate = (models) => {
        Stalk.belongsTo(models.User, {
            as: "stalking",
            foreignKey: "stalking_id",
        });
    };
    return Stalk;
};