const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  addUser,
  addRoom,
  assignRoom,
  getUsers,
  getRooms,
} = require("../controllers/adminController");

router.use(protect);
router.use(adminOnly);

router.post("/add-user", addUser);
router.post("/add-room", addRoom);
router.post("/assign-room", assignRoom);
router.get("/users", getUsers);
router.get("/rooms", getRooms);

module.exports = router;
