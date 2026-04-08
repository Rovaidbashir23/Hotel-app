const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    room_type: {
      type: DataTypes.STRING(50),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "rooms",
    timestamps: false,
  },
);

module.exports = Room;
