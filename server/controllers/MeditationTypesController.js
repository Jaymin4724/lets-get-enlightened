import MeditationTypes from "../models/MEDITATION_TYPES_TBL.js";

export const create = async (req, res) => {
  try {
    const meditationTypesData = new MeditationTypes(req.body);
    console.log(meditationTypesData);
    if (!meditationTypesData) {
      return res.status(404).json({ msg: "Meditation types data not found" });
    }
    const savedData = await meditationTypesData.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.error("Failed to save Meditation Type:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const MeditationTypesData = await MeditationTypes.find();
    if (!MeditationTypesData) {
      return res.status(404).json({ msg: "Meditation types data not found" });
    }
    res.status(200).json(MeditationTypesData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const displayActive = async (req, res) => {
  try {
    const s_id = "65ae6d7937e1e60e7c1b0097";
    const MeditationTypesData = await MeditationTypes.find({ s_id: s_id });
    if (!MeditationTypesData || MeditationTypesData.length === 0) {
      return res.status(404).json({ msg: "Meditation types data not found" });
    }
    res.status(200).json(MeditationTypesData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const MeditationTypeExist = await MeditationTypes.findById(id);
    if (!MeditationTypeExist) {
      return res.status(404).json({ msg: "MeditationTypes not found" });
    }
    res.status(200).json(MeditationTypeExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const MeditationTypeExist = await MeditationTypes.findById(id);
    if (!MeditationTypeExist) {
      return res.status(404).json({ msg: "Meditation types data not found" });
    }
    const updatedMeditationType = await MeditationTypes.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedMeditationType) {
      return res
        .status(500)
        .json({ msg: "Failed to update meditation type data" });
    }
    res.status(200).json(updatedMeditationType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteMeditationTypes = async (req, res) => {
  try {
    const id = req.params.id;
    const MeditationTypeExist = await MeditationTypes.findById(id);
    if (!MeditationTypeExist) {
      return res
        .status(404)
        .json({ msg: "Meditation types data not found types data not found" });
    }
    await MeditationTypes.findByIdAndDelete(id);
    res.status(200).json({ msg: "Meditation type deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//ADMIN DASHBOARD
export const adminAllMeditationTypes = async (req, res) => {
  try {
    const count = await MeditationTypes.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
