import * as analyticsService from "./analytics.service.js";

const getAnalytics = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalytics(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export { getAnalytics };