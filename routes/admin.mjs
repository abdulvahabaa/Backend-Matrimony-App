import express from "express";
import { adminLogin } from "../controllers/adminController.mjs";

const adminRoutes = express.Router({ mergeParams: true });

adminRoutes.post("/login", adminLogin);

export default adminRoutes;