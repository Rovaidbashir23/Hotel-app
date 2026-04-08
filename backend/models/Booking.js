const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Room = require("./Room");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: { model: Room, key: "id" },
    },
    check_in: {
      type: DataTypes.DATE,
    },
    check_out: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "booked",
    },
  },
  {
    tableName: "bookings",
    timestamps: false,
  },
);

Booking.belongsTo(User, { foreignKey: "user_id" });
Booking.belongsTo(Room, { foreignKey: "room_id" });

module.exports = Booking;
