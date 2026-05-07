import { Router } from "express";
import { getAllEjemplo , getEjemploById, postEjemplo,putEjemplo,deleteEjemplo} from '../controllers/ejemplo.controllers.js';
const ejemplo = Router();

ejemplo.get('/', getAllEjemplo);

ejemplo.get('/:id', getEjemploById);

ejemplo.post('/', postEjemplo);

ejemplo.put('/:id', putEjemplo);

ejemplo.delete('/:id', deleteEjemplo);

ejemplo.post('/', (req, res) => {
    const body = req.body;
    res.json({
        msg: 'post API',
        body
    });
});


ejemplo.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'delete API',
        id
    });
});

export default ejemplo;