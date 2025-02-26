import express from "express";
import {
  create,
  userMeditationDuration,
  reportGetDuration,
  ReportsgetAll,
} from "../controllers/MeditationActivityController.js";

const route = express.Router();

route.post("/create", create);
route.get("/userMeditationDuration/:id", userMeditationDuration);
route.get("/reportGetDuration", reportGetDuration);
route.get("/ReportsgetAll", ReportsgetAll);
export default route;
