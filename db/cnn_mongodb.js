import dns from 'dns';
import mongoose from 'mongoose';

// Usar DNS públicos para resolver registros SRV cuando el DNS local rechaza la consulta
dns.setServers(['8.8.8.8', '1.1.1.1']);

let isConnected = false;

const connectarMongoDB = async () => {
  if (isConnected) {
    console.log('Ya estás conectado a MongoDB'.green);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('Conectado a MongoDB'.green);
  } catch (error) {
    console.error('Error al conectar a MongoDB'.red, error);
  }
};

const db = mongoose.connection;
db.on('error', (error) => console.error('Error en la conexión a MongoDB'.red, error));
db.once('open', () => console.log('Conexión a MongoDB establecida'.green));
db.on('disconnected', () => {
  isConnected = false;
  console.log('Desconectado de MongoDB'.yellow);
});
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Conexión a MongoDB cerrada por la aplicación'.yellow);
  process.exit(0);
});

export  {connectarMongoDB,isConnected};
