import express from "express";
import {
  create,
  update,
  deleteMeditationTypes,
  getAll,
  getOne,
  displayActive,
  adminAllMeditationTypes,
} from "../controllers/MeditationTypesController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll); //for admin (to display alll the types)
route.get("/display-active/", displayActive); //for users (to hide inactive mediation types)
route.get("/getone/:id", getOne);
route.patch("/update/:id", update);
route.delete("/delete/:id", deleteMeditationTypes);

//ADMIN DASHBOARD
route.get("/adminAllMeditationTypes", adminAllMeditationTypes);
export default route;
