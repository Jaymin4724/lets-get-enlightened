import Membership from "../models/MEMBERSHIP_TBL.js";
export const create = async (req, res) => {
  try {
    const MembershipsData = new Membership(req.body);
    const savedData = await MembershipsData.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.error("Failed to save :", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const MembershipData = await Membership.find();
    if (MembershipData.length === 0) {
      return res.status(404).json({ msg: "Memberships not found" });
    }
    res.status(200).json(MembershipData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const displayActive = async (req, res) => {
  try {
    const excludedId = "65de0a84596a0d4f24ec161d";
    const MembershipData = await Membership.find({ _id: { $ne: excludedId } });
    if (!MembershipData || MembershipData.length === 0) {
      return res.status(404).json({ msg: "Membership data not found" });
    }

    res.status(200).json(MembershipData);
  } catch (error) {
    console.error("Error fetching Membership:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMembership = await Membership.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMembership) {
      return res.status(500).json({ msg: "Failed to update Membership data" });
    }
    res.status(200).json(updatedMembership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMembership = async (req, res) => {
  try {
    const id = req.params.id;
    const MembershipExist = await Membership.findById(id);
    if (!MembershipExist) {
      return res.status(404).json({ msg: "Membership not found" });
    }
    await Membership.findByIdAndDelete(id);
    res.status(200).json({ msg: "Membership deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
