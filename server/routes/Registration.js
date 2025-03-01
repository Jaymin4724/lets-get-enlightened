import express from "express";
import {
  create,
  getOne,
  getAll,
  update,
  adminAllUsers,
  adminAllPremiumUsers,
  reportsGetAll,
} from "../controllers/RegistrationController.js";

const route = express.Router();

route.post("/register", create);
route.post("/login", getOne);
route.patch("/editProfile/:id", update);
route.get("/getall", getAll);

//ADMIN DASHBOARD ROUTES
route.get("/adminAllUsers", adminAllUsers);
route.get("/adminAllPremiumUsers", adminAllPremiumUsers);

//REPORTS
route.get("/reportsGetAll", reportsGetAll);

export default route;
