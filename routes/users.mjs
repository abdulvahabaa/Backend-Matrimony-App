import express from "express";
import { verifyToken } from "../middleware/verifyToken.mjs";
import {
  deleteProfile,
  getUser,
  reportProfile,
  updateUserData,
} from "../controllers/usersController.mjs";

const usersRoutes = express.Router({ mergeParams: true });

usersRoutes.get("/:id", getUser);

usersRoutes.post("/:id/report", reportProfile);

usersRoutes.patch("/:id", updateUserData);

usersRoutes.delete("/:id", deleteProfile);

export default usersRoutes;
