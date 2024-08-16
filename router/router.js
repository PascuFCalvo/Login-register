import express from "express";
import credentialsRouter from "../credentials/credentialsRouter/credentialsRouter.js";

const router = express.Router();

router.use("/credentials", credentialsRouter);

export default router;
