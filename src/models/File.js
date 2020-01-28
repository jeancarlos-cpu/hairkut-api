module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("File", {
    name: DataTypes.STRING,
    filename: DataTypes.STRING,
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `http://localhost:4000/files/${this.filename}`;
      }
    }
  });

  return File;
};
