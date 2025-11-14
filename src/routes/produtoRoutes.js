import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';

const router = express.Router();

router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);

router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.listarProdutoID);

router.put('/:id', validate(produtoUpdateSchema), produtoController.atualizarProduto); // Rota final: PUT /api/produtos/:id
router.delete('/:id', produtoController.deletarProduto); // Rota final: DELETE /api/produtos/:id
export default router;