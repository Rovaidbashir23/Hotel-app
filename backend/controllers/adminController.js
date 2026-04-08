const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await User.create({ name, email, password, role: "user" });
    res.json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    await User.update({ name, email, password }, { where: { id } });
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.destroy({ where: { user_id: id } });
    await User.destroy({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addRoom = async (req, res) => {
  const { room_number, room_type } = req.body;
  try {
    await Room.create({ room_number, room_type });
    res.json({ message: "Room added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const editRoom = async (req, res) => {
  const { id } = req.params;
  const { room_number, room_type } = req.body;
  try {
    await Room.update({ room_number, room_type }, { where: { id } });
    res.json({ message: "Room updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.destroy({ where: { room_id: id } });
    await Room.destroy({ where: { id } });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const assignRoom = async (req, res) => {
  const { user_id, room_id } = req.body;
  try {
    await Booking.create({ user_id, room_id, status: "booked" });
    await Room.update({ is_available: false }, { where: { id: room_id } });
    res.json({ message: "Room assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  addRoom,
  editRoom,
  deleteRoom,
  assignRoom,
  getUsers,
  getRooms,
};
