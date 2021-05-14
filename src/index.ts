import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import envelopeRouter from "./routes/envelope";

// initialize configuration
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Personal Budget Manager API",
  });
});

app.use("/envelope", envelopeRouter);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
