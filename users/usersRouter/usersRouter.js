import express from "express";
import getAllUsers from "../usersControler/getAllUsers.js";
import getCompleteUser from "../usersControler/getCompleteUser.js";

const usersRouter = express.Router();

usersRouter.get("/getUsers", getAllUsers);
usersRouter.get("/getCompleteUser/:username", getCompleteUser);

export default usersRouter;
