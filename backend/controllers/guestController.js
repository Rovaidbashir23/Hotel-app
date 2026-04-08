const Booking = require("../models/Booking");
const Room = require("../models/Room");

const checkIn = async (req, res) => {
  const userId = req.user.id;
  try {
    const booking = await Booking.findOne({
      where: { user_id: userId, status: "booked" },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "No booking found for this user" });
    }

    await Booking.update(
      { status: "checked_in", check_in: new Date() },
      { where: { user_id: userId, status: "booked" } },
    );

    res.json({ message: "Checked in successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const checkOut = async (req, res) => {
  const userId = req.user.id;
  try {
    const booking = await Booking.findOne({
      where: { user_id: userId, status: "checked_in" },
    });

    if (!booking) {
      return res.status(404).json({ message: "No active check-in found" });
    }

    await Booking.update(
      { status: "checked_out", check_out: new Date() },
      { where: { user_id: userId, status: "checked_in" } },
    );

    await Room.update(
      { is_available: true },
      { where: { id: booking.room_id } },
    );

    res.json({ message: "Checked out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const myBooking = async (req, res) => {
  const userId = req.user.id;
  try {
    const booking = await Booking.findOne({
      where: { user_id: userId },
      include: [{ model: Room, attributes: ["room_number", "room_type"] }],
    });

    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.json({
      id: booking.id,
      status: booking.status,
      check_in: booking.check_in,
      check_out: booking.check_out,
      room_number: booking.Room.room_number,
      room_type: booking.Room.room_type,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { checkIn, checkOut, myBooking };
