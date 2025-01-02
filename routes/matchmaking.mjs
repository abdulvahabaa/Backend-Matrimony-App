import express from "express";
import { verifyToken } from "../middleware/verifyToken.mjs";
import { createMatchmakingPost } from "../controllers/matchmakingController.mjs";

const matchmakingRoutes = express({ mergeParmas: true });

matchmakingRoutes.post("/", createMatchmakingPost);

export default matchmakingRoutes;
