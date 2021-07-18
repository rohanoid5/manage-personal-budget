import dotenv from 'dotenv';
import server from './server';

// initialize configuration
dotenv.config();

const PORT = Number(process.env.SERVER_PORT);

new server()
  .start(PORT)
  .then((port) => console.log(`Running on port ${port}`))
  .catch((error) => {
    console.log(error);
  });
