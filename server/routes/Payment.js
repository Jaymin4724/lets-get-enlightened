import express from "express";
import {
  createMembershipPayment,
  getAllMembershipPayments,
} from "../controllers/PaymentController.js";

const route = express.Router();

route.post("/create", createMembershipPayment);
route.get("/getall", getAllMembershipPayments);

// route.get("/getone/:id", getOne)
// route.put("/update/:id", update)
// route.delete("/delete/:id", deleteAffirmation)
export default route;
