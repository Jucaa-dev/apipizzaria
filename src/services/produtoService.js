import { join } from 'path';
import db from '../db/db.js';

export const findAll = async (minValor, maxValor, nome, id, tipo) => {
    // 1. Defina a consulta SQL base
    let sql = 'SELECT * FROM produto';
    // 2. Cria um array para as condições WHERE
    const conditions = [];
    // 3. Cria um array para os valores (para prevenir SQL Injection)
    const values = [];
    // 4. Adiciona as condições dinamicamente
    // Adicionamos o filtro de menor valor
    if (minValor) {
        conditions.push('valor >= ?');
        values.push(minValor);
    }
    // Adicionamos o fitro de maior valor
    if (maxValor) {
        conditions.push('valor <= ?');
        values.push(maxValor);
    }
    // Adicionamos o filtro buscar por id
    if (id) {
        conditions.push('idProduto = ?');
        values.push(id);
    }
    // Adicionamos o filtro buscar por nome
    if (nome) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }
    // Adicionamos o filtro por tipo
    if (tipo) {
        conditions.push('LOWER(tipo) LIKE ?');
        values.push(`%${tipo.toLowerCase()}%`); 
    }

    // 5. Se houver condições, anexa elas à consulta SQL
    if (conditions.length > 0) {
        sql += ' Where ' + conditions.join(' AND ');
    }
    // 6. Executa a consulta final
    const [rows] = await db.query(sql, values);
    return rows

};

// Agora você pode combinar todos os filtros na mesma URL
// Buscar por nome (pizza) e preço (entre 30 e 50): GET http://localhost:3333/api/produtos?nome=pizza&minValor=30&maxValor=50
// Buscar por nome (borda) e preço (abaixo de 15): GET http://localhost:3333/api/produtos?nome=borda&maxValor=15
// Buscar por nome (calabresa): GET http://localhost:3333/api/produtos?nome=calabresa

export const create = async (produto) => {
    await db.query('INSERT INTO produto SET ?', produto);
    return produto
};

export const update = async (idproduto, produtoData) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?'[produtoData, idproduto]);
    // Retorna true se uma linha foi afetada (produto existia), false caso contrário
    return result.affectedRows > 0;
}

export const remove = async (idproduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?'[idproduto]);
    return result.affectedRows > 0;
};  