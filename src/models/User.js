const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        async beforeCreate(user) {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        async beforeUpdate(user) {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    }
  );

  User.associate = function(models) {
    User.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
  };

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
