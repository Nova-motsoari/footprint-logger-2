const express = require("express");
const Activity = require("../models/Activity");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ADD ACTIVITY */
router.post("/", auth, async (req, res) => {
  const activity = await Activity.create({
    ...req.body,
    user: req.user.id,
  });
  res.json(activity);
});

/* USER DASHBOARD */
router.get("/my", auth, async (req, res) => {
  const activities = await Activity.find({ user: req.user.id });
  const total = activities.reduce((s, a) => s + a.co2, 0);
  res.json({ activities, total });
});

/* WEEKLY SUMMARY */
router.get("/weekly", auth, async (req, res) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const activities = await Activity.find({
    user: req.user.id,
    date: { $gte: weekAgo },
  });

  res.json(activities);
});

/* AVERAGE EMISSIONS */
router.get("/average", async (req, res) => {
  const avg = await Activity.aggregate([
    { $group: { _id: "$user", total: { $sum: "$co2" } } },
    { $group: { _id: null, avg: { $avg: "$total" } } },
  ]);
  res.json({ average: avg[0]?.avg || 0 });
});

/* LEADERBOARD */
router.get("/leaderboard", async (req, res) => {
  const leaderboard = await Activity.aggregate([
    { $group: { _id: "$user", total: { $sum: "$co2" } } },
    { $sort: { total: 1 } },
    { $limit: 5 },
  ]);
  res.json(leaderboard);
});

module.exports = router;
