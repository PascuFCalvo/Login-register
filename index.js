import express from "express";
import router from "./router/router.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

// Aplicar el middleware correctamente
app.use(express.json());
app.use("/v1", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
