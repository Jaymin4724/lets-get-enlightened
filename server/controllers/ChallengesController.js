import Challenges from "../models/CHALLENGES_TBL.js";

export const create = async (req, res) => {
  try {
    const ChallengesData = new Challenges(req.body);
    if (!ChallengesData) {
      return res.status(404).json({ msg: "Challenge type data not found" });
    }
    const savedData = await ChallengesData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const ChallengesData = await Challenges.find();
    if (!ChallengesData) {
      return res.status(404).json({ msg: "Challenge type data not found" });
    }
    res.status(200).json(ChallengesData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const displayActive = async (req, res) => {
  try {
    const s_id = "65ae6d7937e1e60e7c1b0097";
    const ChallengesData = await Challenges.find({ s_id: s_id });
    if (!ChallengesData || ChallengesData.length === 0) {
      return res.status(404).json({ msg: "Challenge type data not found" });
    }
    res.status(200).json(ChallengesData);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const ChallengeExist = await Challenges.findById(id);
    if (!ChallengeExist) {
      return res.status(404).json({ msg: "MeditationTypes not found" });
    }
    res.status(200).json(ChallengeExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const ChallengeExist = await Challenges.findById(id);
    if (!ChallengeExist) {
      return res.status(404).json({ msg: "Challenge type data not found" });
    }
    const updatedChallenges = await Challenges.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedChallenges) {
      return res
        .status(500)
        .json({ msg: "Failed to update Challenges type data" });
    }
    res.status(200).json(updatedChallenges);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    const id = req.params.id;
    const ChallengeExist = await Challenges.findById(id);
    if (!ChallengeExist) {
      return res
        .status(404)
        .json({ msg: "Challenge type data not found types data not found" });
    }
    await Challenges.findByIdAndDelete(id);
    res.status(200).json({ msg: "Challenge type deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
