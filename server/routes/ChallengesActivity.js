import express from "express";
import {
  create,
  getAllData,
} from "../controllers/ChallengesActivityController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getAllData", getAllData);

export default route;
