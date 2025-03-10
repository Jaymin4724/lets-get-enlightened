import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  deleteMood,
  displayActive,
  submit,
  adminAvgMood,
  userMood,
  reportGetAll,
} from "../controllers/MoodDataController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteMood);
route.get("/displayActive", displayActive);
//REAL MOOD TRACKING TABLE
route.post("/submit", submit);

//ADMIN DASHBOARD
route.get("/adminAvgMood", adminAvgMood);

//USER INSIGHT
route.get("/userMood/:u_id", userMood);

//REPORT
route.get("/reportGetAll", reportGetAll);

export default route;
