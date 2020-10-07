import dotenv from 'dotenv';
import App from './app';
import WagaController from './controllers/waga.controller';

dotenv.config({ path: './env/development.env' });

const app = new App(
  [
    new WagaController(),
  ],
);
 
app.listen();