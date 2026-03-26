import Task from "../../models/Task.js";
import mongoose from "mongoose";

const getAnalytics = async (userId) => {
  const id = new mongoose.Types.ObjectId(userId);

  const [statusStats, priorityStats, overdue, recentActivity] = await Promise.all([

    Task.aggregate([
      { $match: { userId: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),

    Task.aggregate([
      { $match: { userId: id } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]),

    Task.countDocuments({
      userId: id,
      dueDate: { $lt: new Date() },
      isCompleted: false,
    }),

    Task.aggregate([
      {
        $match: {
          userId: id,
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const total = statusStats.reduce((sum, s) => sum + s.count, 0);
  const completed = statusStats.find((s) => s._id === "Done")?.count || 0;
  const inProgress = statusStats.find((s) => s._id === "In Progress")?.count || 0;
  const todo = statusStats.find((s) => s._id === "Todo")?.count || 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    overview: { total, completed, inProgress, todo, overdue, completionRate },
    byStatus: statusStats,
    byPriority: priorityStats,
    recentActivity,
  };
};

export { getAnalytics };