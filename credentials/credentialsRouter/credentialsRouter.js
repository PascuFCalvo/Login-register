import express from "express";
import userLogin from "../credentialsControler/login.js";
import userRegister from "../credentialsControler/register.js";

const credentialsRouter = express.Router();

credentialsRouter.post("/register", userRegister);
credentialsRouter.post("/login", userLogin);

export default credentialsRouter;
