import express from "express";
import userLogin from "../credentialsControler/login.js";
import userRegister from "../credentialsControler/register.js";
import userUpdate from "../credentialsControler/update.js";
import changePassword from "../credentialsControler/changePassword.js";

const credentialsRouter = express.Router();

credentialsRouter.post("/register", userRegister);
credentialsRouter.post("/login", userLogin);
credentialsRouter.put("/update", userUpdate);
credentialsRouter.put("/changePassword", changePassword);
export default credentialsRouter;
