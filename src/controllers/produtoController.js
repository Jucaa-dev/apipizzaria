import * as produtoService from "../services/produtoService.js";
import Joi from "joi";

export const produtoCreateSchema = Joi.object ({
    idProduto: Joi.string().required(),
    nome: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(10),
    imagem: Joi.string().allow('').max(255)
});

export const produtoUpdateSchema = Joi.object ({
    nome: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(10),
    imagem: Joi.string().allow('').max(255)
}).min(1);

export const listarProdutos = async (req, res) => {
    try {
        const produtos = await produtoService.findAll();
        res.status(200).json(produtos);
    } catch (err) {
        console.error(`Erro ao buscar produtos:`, err);
        res.status(500).json({ error: `Erro interno do servidor` });
    }
};

export const listarProdutoID = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoService.findById(id);
        if (!produto) {
            return res.status(404).json({ error: `Produto não encontrado`});
        }
    } catch (err) {
        console.error(`Erro ao buscar produto:`, err),
        res.status(500).json({ error: `Erro interno do servidor` });
    }
};

export const adicionarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.create(req.body);
        res.staus(201).json({ message: `Produto adicionado com sucesso`, data: novoProduto });
    } catch (err) {
        console.error(`Erro ao adicionar produto:`, err);
        if (err.code === `ER_DUP_ENTRY`) {
            return res.status(409).json({ error: `ID já cadastrado.` });
        }
        res.status(500).json({ error: `Erro ao adicionar Produto` });
    }
};

export const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await produtoService.update(id, req.body);
        if (!updated) {
            return res.status(404).json({ error: `Produto não encontrado`});
        }
        res.stataus(200).json({ message: `Produto atualizado com sucesso` });
    } catch (err) {
        console.error(`Erro ao atualizar produto:`, err);
        res.status(500).json({ error: `Erro ao atualizar produto` });
    }
};

export const deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await produtoService.remove(id);
        if (!deleted) {
            return res.status(404).json({ error: `Produto não encontrado` });
        }
        res.status(200).json({ message: `Produto deletado com sucesso` });
    } catch (err) {
        console.error(`Erro ao deletar Produto:`, err);
        res.status(500).json({ error: `Erro ao deletar Produto` });
    }
};