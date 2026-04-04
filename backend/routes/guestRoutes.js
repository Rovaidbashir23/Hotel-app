const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  checkIn,
  checkOut,
  myBooking,
} = require("../controllers/guestController");

router.use(protect);

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/my-booking", myBooking);

module.exports = router;
