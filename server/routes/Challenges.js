import express from "express";
import {
  create,
  getAll,
  displayActive,
  update,
  deleteChallenge,
  getOne,
} from "../controllers/ChallengesController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/display-active", displayActive);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteChallenge);
export default route;
