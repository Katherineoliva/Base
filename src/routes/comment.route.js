import {
  createCommentController,
  getCommentsController,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const commentRoute = Router();

commentRoute.post("/", authMiddleware, createCommentController);
commentRoute.get("/:undertakingId", getCommentsController);

export default commentRoute;
