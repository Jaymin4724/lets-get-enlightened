import Affirmations from "../models/AFFIRMATIONS_TBL.js";

export const create = async (req, res) => {
  try {
    const affirmationsData = new Affirmations(req.body);
    if (!affirmationsData) {
      return res.status(404).json({ msg: "Affirmations not found" });
    }
    const savedData = await affirmationsData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const AffirmationsData = await Affirmations.find();
    if (!AffirmationsData) {
      return res.status(404).json({ msg: "Affirmations not found" });
    }
    res.status(200).json(AffirmationsData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const AffirmationExist = await Affirmations.findById(id);
    if (!AffirmationExist) {
      return res.status(404).json({ msg: "Affirmations not found" });
    }
    res.status(200).json(AffirmationExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const AffirmationExist = await Affirmations.findById(id);
    if (!AffirmationExist) {
      return res.status(404).json({ msg: "Affirmations not found" });
    }
    const updatedAffirmation = await Affirmations.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedAffirmation) {
      return res.status(500).json({ msg: "Failed to update Affirmation data" });
    }
    res.status(200).json(updatedAffirmation);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteAffirmation = async (req, res) => {
  try {
    const id = req.params.id;
    const AffirmationExist = await Affirmations.findById(id);
    if (!AffirmationExist) {
      return res.status(404).json({ msg: "Affirmations not found" });
    }
    await Affirmations.findByIdAndDelete(id);
    res.status(200).json({ msg: "Affirmation deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
