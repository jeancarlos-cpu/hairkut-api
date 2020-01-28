module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    date: DataTypes.DATE,
    canceled_at: DataTypes.DATE
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Appointment.belongsTo(models.User, {
      foreignKey: "provider_id",
      as: "provider"
    });
  };

  return Appointment;
};
