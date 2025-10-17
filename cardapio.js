import fs from 'node:fs/promises';
import chalk from 'chalk';

async function lerCardapio() {
    
    try {
        console.log(chalk.bold.green`Pizzaria do Palestra`);

        const cardapio = await fs.readFile('pizzas.txt', 'utf-8');  

        console.log(cardapio);
    } catch (error) {
        console.error(`Teu código ta errado chefia`);
    }
};
lerCardapio();