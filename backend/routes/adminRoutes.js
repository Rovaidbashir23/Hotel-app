const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  addUser,
  editUser,
  deleteUser,
  addRoom,
  editRoom,
  deleteRoom,
  assignRoom,
  getUsers,
  getRooms,
} = require("../controllers/adminController");

router.use(protect);
router.use(adminOnly);

router.post("/add-user", addUser);
router.put("/edit-user/:id", editUser);
router.delete("/delete-user/:id", deleteUser);

router.post("/add-room", addRoom);
router.put("/edit-room/:id", editRoom);
router.delete("/delete-room/:id", deleteRoom);

router.post("/assign-room", assignRoom);
router.get("/users", getUsers);
router.get("/rooms", getRooms);

module.exports = router;
