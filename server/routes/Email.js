import express from "express";
import { sendEmail, updatePassword } from "../controllers/EmailController.js";

const route = express.Router();

route.post("/sendEmail", sendEmail);
route.post("/updatePassword", updatePassword);

export default route;
