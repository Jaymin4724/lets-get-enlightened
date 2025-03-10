import "dotenv/config";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import registrationRoute from "./routes/Registration.js";
import affirmationsRoute from "./routes/Affirmations.js";
import meditationTypesRoute from "./routes/MeditationTypes.js";
import meditationActivityRoute from "./routes/MeditationActivity.js";
import challengesRoute from "./routes/Challenges.js";
import challengesActivityRoute from "./routes/ChallengesActivity.js";
import challengesRequestRoute from "./routes/ChallengesRequest.js";
import membershipRoute from "./routes/Membership.js";
import moodDataRoute from "./routes/MoodData.js";
import userRoute from "./routes/User.js";
import emailRoute from "./routes/Email.js";
import membershipPaymentRoute from "./routes/Payment.js";

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGOURL;

main().catch((error) => {
  console.error("DB Connection failed: ", error);
});

async function main() {
  try {
    await connect(MONGOURL);
    console.log("mongooseBumps --> DB Connected!!");
  } catch (error) {
    console.error("Database connection error: ", error);
  }
}

app.use(cors());
app.use(express.json());
app.use("/api", registrationRoute);
app.use("/api/affirmations", affirmationsRoute);
app.use("/api/meditation-types", meditationTypesRoute);
app.use("/api/meditationActivity", meditationActivityRoute);
app.use("/api/challenges", challengesRoute);
app.use("/api/membership", membershipRoute);
app.use("/api/mood", moodDataRoute);
app.use("/api/", userRoute);
app.use("/api/email", emailRoute);
app.use("/api/challengesActivity", challengesActivityRoute);
app.use("/api/challengesRequest", challengesRequestRoute);
app.use("/api/membershipPayment", membershipPaymentRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
