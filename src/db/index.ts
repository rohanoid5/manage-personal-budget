import { Envelope } from "type/model";
import faker from "faker";
import Database from "./Database";

const createEnvelope = (): Envelope => {
  return {
    authorName: faker.name.findName(),
    envelopeName: faker.lorem.words(),
    balance: +faker.finance.account(),
  };
};

const envelopeDatabase = new Database<Envelope>();

const seedEnvelopes = () => {
  const allEnvelopes = new Array(10).fill(0).map(createEnvelope);

  allEnvelopes.forEach((envelope) => {
    envelopeDatabase.addToDB(envelope);
  });
};

seedEnvelopes();

const db = {
  envelope: envelopeDatabase,
};

export default db;
