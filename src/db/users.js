const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
                get() {
                    return () => this.getDataValue('name');
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                get() {
                    return () => this.getDataValue('password');
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                get() {
                    return () => this.getDataValue('email');
                }
            },
            phonenumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
                get() {
                    return () => this.getDataValue('phonenumber');
                }
            },
            imgurl: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            xp: { type: DataTypes.INTEGER, defaultValue: 0 },
            level: { type: DataTypes.INTEGER, defaultValue: 0 }
        },
        {
            hooks: {
                beforeCreate: async function (user) {
                    const salt = await bcrypt.genSalt(12);
                    user.password = await bcrypt.hash(user.password, salt);
                },
                beforeBulkUpdate: async function (user) {
                    console.log(user);
                    if (user.attributes.password) {
                        const salt = await bcrypt.genSalt(12);
                        user.attributes.password = await bcrypt.hash(
                            user.attributes.password,
                            salt
                        );
                    }
                },
            },
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Post);
        User.hasMany(models.Comment);
        User.hasMany(models.Reply);
        User.hasMany(models.Like);
        User.hasMany(models.Stalk);
        User.hasMany(models.Stalker);
        User.hasMany(models.Tagged);
        User.hasMany(models.SavedPost);
    };
    return User;
};
