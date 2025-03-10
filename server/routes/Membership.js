import express from "express";
import {
  create,
  getAll,
  update,
  deleteMembership,
  displayActive,
} from "../controllers/MembershipController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/displayActive", displayActive);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteMembership);
export default route;
