import Mood from "../models/MOOD_QUESTIONAIRE_TBL.js";
import result from "../models/MOOD_TRACKING_TBL.js";

export const create = async (req, res) => {
  try {
    const MoodData = new Mood(req.body);
    if (!MoodData) {
      return res.status(404).json({ msg: "mood data not found" });
    }
    const savedData = await MoodData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const MoodData = await Mood.find();
    if (!MoodData) {
      return res.status(404).json({ msg: "mood data not found" });
    }
    res.status(200).json(MoodData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const displayActive = async (req, res) => {
  try {
    const s_id = "65ae6d7937e1e60e7c1b0097";
    const MoodData = await Mood.find({ s_id: s_id });
    if (!MoodData || MoodData.length === 0) {
      return res.status(404).json({ msg: "Meditation types data not found" });
    }
    res.status(200).json(MoodData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const MoodDataExist = await Mood.findById(id);
    if (!MoodDataExist) {
      return res.status(404).json({ msg: "mood data not found" });
    }
    res.status(200).json(MoodDataExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const MoodDataExist = await Mood.findById(id);
    if (!MoodDataExist) {
      return res.status(404).json({ msg: "mood data not found" });
    }
    const updatedMoodData = await Mood.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMoodData) {
      return res.status(500).json({ msg: "Failed to update mood data" });
    }
    res.status(200).json(updatedMoodData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteMood = async (req, res) => {
  try {
    const id = req.params.id;
    const MoodDataExist = await Mood.findById(id);
    if (!MoodDataExist) {
      return res.status(404).json({ msg: "mood data not found" });
    }
    await Mood.findByIdAndDelete(id);
    res.status(200).json({ msg: "mood data deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//REAL MOOD TRACKING TABLE
export const submit = async (req, res) => {
  try {
    const resultData = new result(req.body);
    if (!resultData) {
      return res.status(404).json({ msg: "mood data not found" });
    }
    const savedData = await resultData.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//ADMIN DASHBOARD
export const adminAvgMood = async (req, res) => {
  try {
    const moodData = await result.find();
    if (moodData.length === 0) {
      return res.status(404).json({ msg: "No mood data found" });
    }

    const total = moodData.reduce((acc, cur) => acc + cur.result, 0);
    const averageResult = total / moodData.length;

    // Convert average to a 5-point scale
    const scaleValue = (averageResult / 5) * 5; // Assuming mood values range from 0 to 5

    res.status(200).json({ avgResult: scaleValue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//USER INSIGHT
export const userMood = async (req, res) => {
    try {
      const u_id = req.params.u_id;
  
      const allMoodData = await result.find({ u_id: u_id });
  
      if (!allMoodData || allMoodData.length === 0) {
        return res.status(404).json({ msg: "Mood data not found" });
      }
  
      const last7MoodData = allMoodData.slice(-7);
  
      res.status(200).json(last7MoodData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const reportGetAll = async (req, res) => {
    try {
      const MoodData = await result.find();
      if (!MoodData) {
        return res.status(404).json({ msg: "mood data not found" });
      }
      res.status(200).json(MoodData);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  };

  
  