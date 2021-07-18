import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import pool from './db/dbConnector';

// Routes
import envelopeRouter from './routes/envelope';

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' }));
  }

  private routerConfig() {
    this.app.get('/', (req, res) => {
      res.send({
        message: 'Welcome to Personal Budget Manager API'
      });
    });

    this.app.use('/envelope', envelopeRouter);
  }

  private dbConnect() {
    pool.connect((err, client, done) => {
      if (err) throw err;
      console.log('DB successfully Connected');
    });
  }

  public start(port: number) {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on('error', (err) => reject(err));
    });
  }
}

export default Server;
