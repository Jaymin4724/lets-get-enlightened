import ChallengeActivity from "../models/CHALLENGE_ACTIVITY_TBL.js";
import Registration from "../models/REGISTRATION_TBL.js";
import Challenges from "../models/CHALLENGES_TBL.js";
import ChallengeResult from "../models/CHALLENGE_RESULT_TBL.js";

export const create = async (req, res) => {
  try {
    const { u_id, ch_id, s_date, e_date, cs_id } = req.body;

    await ChallengeActivity.create({ u_id, ch_id, s_date, e_date, cs_id });

    res.status(201).json({ message: "Record created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllData = async (req, res) => {
  try {
    const challengeActivities = await ChallengeActivity.find();

    if (!challengeActivities || challengeActivities.length === 0) {
      return res.status(404).json({ msg: "Challenge activities not found" });
    }

    const promises = challengeActivities.map(async (activity) => {
      const user = await Registration.findById(activity.u_id);
      const challenge = await Challenges.findById(activity.ch_id);
      const result = await ChallengeResult.findById(activity.cs_id);

      if (!user || !challenge || !result) {
        return null;
      }

      return {
        _id: activity._id,
        user: {
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          dob: user.dob,
          gender: user.gender,
          mem_id: user.mem_id,
          last_login: user.last_login,
          reg_date: user.reg_date,
          longest_streak: user.longest_streak,
          curr_streak: user.curr_streak,
          credit_points: user.credit_points,
        },
        challenge: {
          _id: challenge._id,
          name: challenge.name,
          description: challenge.description,
          duration: challenge.duration,
          image: challenge.image,
          credit_points: challenge.credit_points,
        },
        result: {
          _id: result._id,
          result_status: result.result_status,
        },
        s_date: activity.s_date,
        e_date: activity.e_date,
      };
    });

    const results = await Promise.all(promises.filter(Boolean));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
