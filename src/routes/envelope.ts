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

envelopeRouter.put("/:envelopeId", (req, res) => {
  const envelope = db.envelope.updateInstanceInDB({
    id: Number(req.params.envelopeId),
    ...JSON.parse(req.envelope),
    ...req.body,
  });

  if (!envelope) {
    return res.status(404).send({ message: "No envelope found" });
  }

  res.send(envelope);
});

envelopeRouter.delete("/:envelopeId", (req, res) => {
  const envelope = db.envelope.deleteFromDBbyId(Number(req.params.envelopeId));

  if (!envelope) {
    return res.status(404).send({ message: "No envelope found" });
  }

  res.status(204).send();
});

export default envelopeRouter;
