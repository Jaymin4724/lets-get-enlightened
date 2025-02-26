import mongoose from "mongoose";

const AffirmationsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model(
  "AFFIRMATIONS_TBL",
  AffirmationsSchema,
  "AFFIRMATIONS_TBL"
);
