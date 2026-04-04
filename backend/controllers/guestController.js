const { poolPromise, sql } = require("../config/db");

const checkIn = async (req, res) => {
  const userId = req.user.id;
  try {
    const pool = await poolPromise;

    const booking = await pool
      .request()
      .input("user_id", sql.Int, userId)
      .query(
        "SELECT * FROM bookings WHERE user_id = @user_id AND status = 'booked'",
      );

    if (booking.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "No booking found for this user" });
    }

    await pool
      .request()
      .input("user_id", sql.Int, userId)
      .query(
        "UPDATE bookings SET status = 'checked_in', check_in = GETDATE() WHERE user_id = @user_id AND status = 'booked'",
      );

    res.json({ message: "Checked in successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const checkOut = async (req, res) => {
  const userId = req.user.id;
  try {
    const pool = await poolPromise;

    const booking = await pool
      .request()
      .input("user_id", sql.Int, userId)
      .query(
        "SELECT * FROM bookings WHERE user_id = @user_id AND status = 'checked_in'",
      );

    if (booking.recordset.length === 0) {
      return res.status(404).json({ message: "No active check-in found" });
    }

    const roomId = booking.recordset[0].room_id;

    await pool
      .request()
      .input("user_id", sql.Int, userId)
      .query(
        "UPDATE bookings SET status = 'checked_out', check_out = GETDATE() WHERE user_id = @user_id AND status = 'checked_in'",
      );

    await pool
      .request()
      .input("room_id", sql.Int, roomId)
      .query("UPDATE rooms SET is_available = 1 WHERE id = @room_id");

    res.json({ message: "Checked out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const myBooking = async (req, res) => {
  const userId = req.user.id;
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", sql.Int, userId)
      .query(`SELECT b.id, b.status, b.check_in, b.check_out,
              r.room_number, r.room_type
              FROM bookings b
              JOIN rooms r ON b.room_id = r.id
              WHERE b.user_id = @user_id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { checkIn, checkOut, myBooking };
