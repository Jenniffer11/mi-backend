import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';

 export default class Server{
    constructor()
    {
      this.app = express();
      this.port= '3001';
      this.generalRoute= '/api';

      //Middlewares
      this.middlewares();

      // Rutas de mi app
      this.routes();

    }

    middlewares()
    {
          // Cors
          this.app.use(cors());
          
          // Lectura y parseo del body
          this.app.use(express.json());

          //Directorio publico
          this.app.use(express.static('public'));
    }
    routes()
    {
      //localhost:3000/api/ejemplo
      this.app.use(this.generalRoute, indexRoutes);
    }

    listen()
    {
         this.app.listen(this.port, '127.0.0.1', ()=> { console.log('Servidor corriendo en puerto', this.port);})
    }

 }
