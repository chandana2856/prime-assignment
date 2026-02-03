const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
