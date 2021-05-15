import express from "express";
import db from "../db";

const envelopeRouter = express.Router();

envelopeRouter.param("envelopeId", (req, res, next, id) => {
  const envelope = db.envelope.getFromDBById(Number(id));

  if (envelope) {
    req.envelope = JSON.stringify(envelope);
    next();
  } else {
    res.status(404).send({ message: "No envelope found" });
  }
});

envelopeRouter.get("/", (req, res) => {
  res.send(db.envelope.getAllFromDB());
});

envelopeRouter.post("/", (req, res) => {
  const body = req.body;

  if (!body || !body.balance || !body.authorName || !body.envelopeName) {
    return res.status(400).send({ message: "One or more properties missing" });
  }

  const newEnvelope = db.envelope.addToDB(body);
  res.status(201).send(newEnvelope);
});

envelopeRouter.get("/:envelopeId", (req, res) => {
  res.send(JSON.parse(req.envelope));
});

export default envelopeRouter;
