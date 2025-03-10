import express from "express";
import {
  create,
  getAll,
  getMessagesForUser,
} from "../controllers/ChallengesRequestController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getMessagesForUser/:id", getMessagesForUser);
// route.put("/update/:id", update)
// route.delete("/delete/:id", deleteAffirmation)
export default route;
