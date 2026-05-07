import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from  '../db/cnn_mongodb.js';

 export default class Server{
    constructor()
    {
      this.app = express();
      this.port= process.env.PORT || 3000;
      this.generalRoute= '/api';

    this.connectarDBMongo();

      //Middlewares
      this.middlewares();

      // Rutas de mi app
      this.routes();

      // Middleware 404
      this.notFound();
    }
            
     async connectarDBMongo(){
      if (!db.isConnected) {
        await db.connectarMongoDB();
      }
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

    notFound()
    {
      this.app.use((req, res) => {
        res.status(404).json({
          msg: 'No se encontro la ruta'
        });
      });
    }

    listen()
    {
         this.app.listen(this.port, '127.0.0.1', ()=> { console.log('Servidor corriendo en puerto', this.port);})
    }

 }
