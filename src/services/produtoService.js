import db from '../db/db.js';
import crypt from 'bcrypt';

export const findAll = async () => {
    const [result] = await db.query('SELECT * FROM produto');
    return result;
};

export const findById = async (idproduto) => {
    const [result] = await db.query('SELECT * FROM produto WHERE idProduto = ?', [idproduto]);
    //return result.length > 0 ? result[0] : null;
    return result[0]
};

export const create = async (idproduto) => {
    await db.query('INSERT INTO produto SET ?', idproduto);
};

export const update = async (idproduto, produtoData) => {
    await db.query('UPDATE produto SET ? WHERE idProduto = ?'[produtoData, idproduto]);
}

export const remove = async (idproduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?'[idproduto]);
    return result.affectedRows > 0;
};  