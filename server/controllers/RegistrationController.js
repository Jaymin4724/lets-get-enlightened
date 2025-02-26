import Registration from "../models/REGISTRATION_TBL.js";
import Membership from "../models/MEMBERSHIP_TBL.js";

export const create = async (req, res) => {
  try {
    const registrationData = new Registration(req.body);
    if (!registrationData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    const savedData = await registrationData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const Users = await Registration.find().sort({ curr_streak: -1 });
    if (!Users) {
      return res.status(404).json({ msg: "Affirmations not found" });
    }
    console.log(Users);
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Registration.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const currentDate = new Date();
    const lastLoginDate = new Date(user.last_login);

    // Calculate streak based on your desired rules
    let streakCount = 0;
    const daysDifference = Math.abs(
      Math.floor((currentDate - lastLoginDate) / (1000 * 60 * 60 * 24))
    );

    if (daysDifference === 0) {
      // Same day, keep current streak
      streakCount = user.curr_streak || 0;
    } else if (daysDifference === 1) {
      // Logged in yesterday or today, increment streak
      streakCount = user.curr_streak || 0;
      streakCount++;
    } else {
      // Didn't log in for more than 1 day, break streak
      streakCount = 0;
    }

    // Update user's streak and last login date
    await Registration.updateOne(
      { email },
      {
        curr_streak: streakCount,
        last_login: currentDate.toISOString(),
        $max: { longest_streak: streakCount },
      }
    );
    const updatedUser = await Registration.findOne({ email });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { curr_streak, longest_streak, ...userData } = req.body;
    const updatedUser = await Registration.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DASHBOARD ADMIN
export const adminAllUsers = async (req, res) => {
  try {
    const users = await Registration.find({
      mem_id: { $eq: "65de0a84596a0d4f24ec161d" },
    });
    if (!users) {
      return res.status(404).json({ msg: "Users not found" });
    }
    const userCount = users.length;
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const adminAllPremiumUsers = async (req, res) => {
  try {
    const users = await Registration.find({
      mem_id: { $ne: "65de0a84596a0d4f24ec161d" },
    });
    if (!users) {
      return res.status(404).json({ msg: "Users not found" });
    }
    const userCount = users.length;
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REPORTS
export const reportsGetAll = async (req, res) => {
  try {
    const Users = await Registration.find().sort({ curr_streak: -1 });

    if (!Users) {
      return res.status(404).json({ msg: "users not found" });
    }

    const promises = Users.map(async (user) => {
      const membership = await Membership.findOne({ _id: user.mem_id });
      return {
        ...user.toObject(),
        membershipPlan: membership ? membership.plan : "",
      };
    });

    const results = await Promise.all(promises);
    console.log(results);

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
