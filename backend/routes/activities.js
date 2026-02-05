const express = require("express");
const Activity = require("../models/Activity");
const auth = require("../middleware/auth");

const router = express.Router();

/* ADD ACTIVITY */
router.post("/", auth, async (req, res) => {
  const activity = new Activity({
    userId: req.userId,
    label: req.body.label,
    category: req.body.category,
    co2: req.body.co2,
  });

  await activity.save();
  res.json(activity);
});

/* GET USER ACTIVITIES */
router.get("/", auth, async (req, res) => {
  const activities = await Activity.find({ userId: req.userId }).sort({
    date: -1,
  });
  res.json(activities);
});

/* USER SUMMARY */
router.get("/summary", auth, async (req, res) => {
  const activities = await Activity.find({ userId: req.userId });
  const total = activities.reduce((sum, a) => sum + a.co2, 0);

  res.json({
    totalEmissions: total,
    count: activities.length,
  });
});

/* COMMUNITY AVERAGE */
router.get("/community-average", async (req, res) => {
  const result = await Activity.aggregate([
    { $group: { _id: "$userId", total: { $sum: "$co2" } } },
    { $group: { _id: null, average: { $avg: "$total" } } },
  ]);

  res.json({ average: result[0]?.average || 0 });
});

/* WEEKLY SUMMARY */
router.get("/weekly", auth, async (req, res) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const weekly = await Activity.aggregate([
    {
      $match: {
        userId: req.userId,
        date: { $gte: weekAgo },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$date" },
        total: { $sum: "$co2" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(weekly);
});

/* LEADERBOARD */
router.get("/leaderboard", async (req, res) => {
  const leaders = await Activity.aggregate([
    { $group: { _id: "$userId", total: { $sum: "$co2" } } },
    { $sort: { total: 1 } },
    { $limit: 10 },
  ]);

  res.json(leaders);
});

module.exports = router;
