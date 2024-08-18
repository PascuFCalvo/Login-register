import express from "express";
import getAllUsers from "../usersControler/getAllUsers.js";

const usersRouter = express.Router();

usersRouter.get("/getUsers", getAllUsers);

export default usersRouter;
