import express from "express";
import credentialsRouter from "../credentials/credentialsRouter/credentialsRouter.js";
import usersRouter from "../users/usersRouter/usersRouter.js";

const router = express.Router();

router.use("/credentials", credentialsRouter);
router.use("/users", usersRouter);

export default router;
