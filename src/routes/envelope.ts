import express from "express";
import db from "../db";

const envelopeRouter = express.Router();

envelopeRouter.get("/", (req, res) => {
  res.send(db.envelope.getAllFromDB());
});

export default envelopeRouter;
