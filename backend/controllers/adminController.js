const { poolPromise, sql } = require("../config/db");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .input("role", sql.NVarChar, "user")
      .query(
        "INSERT INTO users (name, email, password, role) VALUES (@name, @email, @password, @role)",
      );
    res.json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .query(
        "UPDATE users SET name=@name, email=@email, password=@password WHERE id=@id",
      );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM bookings WHERE user_id = @id");
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM users WHERE id = @id");
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addRoom = async (req, res) => {
  const { room_number, room_type } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("room_number", sql.NVarChar, room_number)
      .input("room_type", sql.NVarChar, room_type)
      .query(
        "INSERT INTO rooms (room_number, room_type) VALUES (@room_number, @room_type)",
      );
    res.json({ message: "Room added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const editRoom = async (req, res) => {
  const { id } = req.params;
  const { room_number, room_type } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("room_number", sql.NVarChar, room_number)
      .input("room_type", sql.NVarChar, room_type)
      .query(
        "UPDATE rooms SET room_number=@room_number, room_type=@room_type WHERE id=@id",
      );
    res.json({ message: "Room updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM bookings WHERE room_id = @id");
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM rooms WHERE id = @id");
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const assignRoom = async (req, res) => {
  const { user_id, room_id } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("room_id", sql.Int, room_id)
      .query(
        "INSERT INTO bookings (user_id, room_id, status) VALUES (@user_id, @room_id, 'booked')",
      );
    await pool
      .request()
      .input("room_id", sql.Int, room_id)
      .query("UPDATE rooms SET is_available = 0 WHERE id = @room_id");
    res.json({ message: "Room assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT id, name, email, role FROM users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM rooms");
    res.json(result.recordset);
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
