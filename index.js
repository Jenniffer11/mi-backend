import Server from './server/server.js';
import colores from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const server= new Server();
server.listen();