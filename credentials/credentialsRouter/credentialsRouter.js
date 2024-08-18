import express from "express";
import userLogin from "../credentialsControler/login.js";
import userRegister from "../credentialsControler/register.js";
import userUpdate from "../credentialsControler/update.js";

const credentialsRouter = express.Router();

credentialsRouter.post("/register", userRegister);
credentialsRouter.post("/login", userLogin);
credentialsRouter.put("/update", userUpdate); // Cambiado a PUT para coincidir con el frontend

export default credentialsRouter;
