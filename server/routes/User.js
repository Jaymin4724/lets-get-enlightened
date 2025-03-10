import express from "express";
import { userActivitiesForCurrentMonth } from "../controllers/UserController.js";

const route = express.Router();

route.get("/userActivitiesForCurrentMonth/:id", userActivitiesForCurrentMonth);
export default route;
