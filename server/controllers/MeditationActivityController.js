import MeditationActivity from "../models/MEDITATION_ACTIVITY_TBL.js";
import Registration from "../models/REGISTRATION_TBL.js";
import MeditationTypes from "../models/MEDITATION_TYPES_TBL.js";

export const create = async (req, res) => {
  try {
    const { u_id, med_id } = req.body;
    const usage_duration = 10;

    await MeditationActivity.create({ u_id, med_id, usage_duration });

    const user = await Registration.findById(u_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.credit_points += 10;
    await user.save();

    res.status(201).json({ message: "Record created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userMeditationDuration = async (req, res) => {
  try {
    const u_id = req.params.id;
    if (!u_id) {
      return res.status(400).json({ error: "User ID (u_id) is required" });
    }

    const userActivities = await MeditationActivity.find({ u_id });
    if (!userActivities || userActivities.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found for the user" });
    }

    const meditationTypePromises = userActivities.map((activity) =>
      MeditationTypes.findById(activity.med_id)
    );
    const meditationTypes = await Promise.all(meditationTypePromises);

    const filteredActivities = userActivities.filter(
      (activity, index) => meditationTypes[index] !== null
    );

    const totalDuration = filteredActivities.reduce(
      (acc, curr) => acc + curr.usage_duration,
      0
    );

    res.status(200).json({ totalDuration });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reportGetDuration = async (req, res) => {
  try {
    const meditationActivities = await MeditationActivity.find();

    if (!meditationActivities) {
      return res.status(404).json({ msg: "Meditation activities not found" });
    }

    const medIdMap = new Map();
    meditationActivities.forEach((activity) => {
      const medId = activity.med_id.toString();
      if (medIdMap.has(medId)) {
        const currentDuration = medIdMap.get(medId).duration;
        medIdMap.set(medId, {
          ...medIdMap.get(medId),
          duration: currentDuration + activity.usage_duration,
        });
      } else {
        medIdMap.set(medId, {
          duration: activity.usage_duration,
        });
      }
    });

    const promises = [];
    medIdMap.forEach((value, key) => {
      promises.push(
        MeditationTypes.findOne({ _id: key }).then((meditationType) => {
          if (meditationType) {
            return {
              name: meditationType.name,
              duration: value.duration,
            };
          }
          return null;
        })
      );
    });

    let results = await Promise.all(promises);
    results = results.filter((result) => result !== null);

    results.sort((a, b) => b.duration - a.duration);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ReportsgetAll = async (req, res) => {
  try {
    const MeditationActivityData = await MeditationActivity.find();

    if (!MeditationActivityData || MeditationActivityData.length === 0) {
      return res.status(404).json({ msg: "MeditationActivity data not found" });
    }
    const promises = MeditationActivityData.map(async (activity) => {
      const user = await Registration.findById(activity.u_id, "fname lname");

      const meditationType = await MeditationTypes.findById(
        activity.med_id,
        "name"
      );
      if (user && meditationType) {
        return {
          _id: activity._id,
          user: { fname: user.fname, lname: user.lname },
          meditationType: { name: meditationType.name },
          timestamp: activity.timestamp,
        };
      }
      return null;
    });
    let results = await Promise.all(promises);
    results = results.filter((result) => result !== null);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
