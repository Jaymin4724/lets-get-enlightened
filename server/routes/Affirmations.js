import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  deleteAffirmation,
} from "../controllers/AffirmationsController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.patch("/update/:id", update);
route.delete("/delete/:id", deleteAffirmation);
export default route;
