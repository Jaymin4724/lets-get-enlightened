import MeditationActivity from "../models/MEDITATION_ACTIVITY_TBL.js";
import MeditationTypes from "../models/MEDITATION_TYPES_TBL.js";
import moment from "moment";

//USER INSIGHT
export const userActivitiesForCurrentMonth = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentDate = new Date();
    const startOfMonth = moment(currentDate).startOf("month");
    const endOfMonth = moment(currentDate).endOf("month");

    const meditationActivities = await MeditationActivity.find({
      u_id: userId,
      timestamp: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() },
    });

    const activitiesWithNames = await Promise.all(
      meditationActivities.map(async (activity) => {
        const meditationType = await MeditationTypes.findById(activity.med_id);
        return `${meditationType ? meditationType.name : "Unknown"} : ${
          activity.usage_duration
        }`;
      })
    );

    const last5Activities = activitiesWithNames.slice(-7);

    res.status(200).json({ meditationActivities: last5Activities });
  } catch (error) {
    console.error("Error fetching activities for current month:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
