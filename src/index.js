//primeira linha do seu projeto. carrega as variaveis de ambiente antes de qualquer outro codigo
import 'dotenv/config'
// sintaxe de importação para todas as dependencias
//1. Importa a ferramenta Express
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // necessario para recriar o '_dirname'
import db from './db/db.js'; // excluir depois


// Configuração
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
const corsOptions = {
    origin: ['http://localhost3333', 'https://meudominio.com'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true,
};

//2. cria a nossa aplicação (nosso servidor)
const app = express()

//habilita o Express para entender o formato JSON no corpo das requisiçoes
// MIDDLEWARE
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
//servindo pasta public para arquivos (css,js,imagens)
app.use(express.static(path.join(_dirname, '..','public')));

//3. Define a porta em que o servidor vai 'escutar' os pedidos


//rota principal dque serve a pagina HTML
app.get('/', (request, response) => {
    //req = Requesição (dados do pedido do cliente)
    //res = Resposta (o que vamos enviar de volta)

    //estamos enviando uma resposta no formato JSON
    response.sendFile(path.join(_dirname,'..','pages','home.html'));
})

// --TRATAMENTO DE ERROS --
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('algo deu errado no servidor!')
})

//4. manda o servidor ficar "escutando" na porta definida
const PORTA = process.env.PORT || 3333;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
})

//seus dados mockados (simulando o banco de dados)
const listaDeClientes = [
    {id: 1, nome: "João Silva", email: "joao.silva@exemple.com" },
    {id: 2, nome: "Maria Santos", email: "maria.santos@exemple.com" }
]

//Rota para listar Todos os clientes (seu codigo original)
app.get('/clientes', (req, res) => {
    res.json(listaDeClientes);
});
//Nova Rota: rota para buscar UM cliente pelo id
app.get('/clientes/:id', (req, res) => {
    // captura o id da URL e converte para numero
    const idDoCliente = parseInt(req.params.id)
    // procura o cliente no array usando o metodo find()
    const cliente = listaDeClientes.find(c => c.id === idDoCliente)
    //Verifica se o cliente foi encontrado
    if (cliente) {
        //Se encontrou, retorna o cliente com status 200 (OK)
        res.json(cliente)
    } else {
        //Se não encontrar, retorna um erro 404 (Not Found)
        res.status(404).json({mensagem: "Cliente não encontrado"})
    }
})

//Rota para criar um novo cliente 
app.post('/clientes', (req, res) => {
    // o middleware express.json() pega o corpo da requisição e o coloca em req.body
    const novoCliente = req.body;

    console.log("Criamos um novo Cliente:", novoCliente)

    res.json({menssage: `Cliente ${novoCliente.novo} cadastrado com sucesso!`, data: novoCliente})
})