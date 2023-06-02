import { Router } from "express";
import MessageController from "../controller/MessageController";
const messageRoutes = Router();

messageRoutes.get("/message-user/:id", MessageController.onGetMessageForUser());
messageRoutes.post("/create-message", MessageController.onCreateMessage());

export = messageRoutes;
