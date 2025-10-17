// Atualizar o index.js

// Importa a ferramenta Express
import express from 'express'

// Cria a nossa aplicação (nosso servidor)
const app = express();

// Habilita o Express para entender o formato JSON no corpo das requisições
app.use(express.json());

// Define a porta em que o servidor vai "escutar" os pedidos
const PORTA = 3333;

// Rota principal da aplicação
app.get('/', (request, response) => {
    // req = Requisição (dados do pedido do cliente)
    // res = Resposta (o que vamos enviar de volta)

    // Estamos enviando uma resposta no formato JSON
    response.json({message: `Bem vindo à API da Pizzaria Palestra!`});  
});

// Manda o servidor ficar "escutando" na porta definida
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}. Acesse http://localhost:${PORTA}`);
});

// Seus dados mockados (simulando o banco de dados)
const listaDeClientes = [
    {id: 1, nome: `João Silva`, email: `joao.silva@example.com`},
    {id: 2, nome: `Maria Santos`, email: `maria.santos@example.com`},
    {id: 3, nome: `Pedro Almeira`, email: `pedro.almeida@example.com`}
];

// Rota para listar TODOS os clientes (seu código original)
app.get(`/clientes`, (req, res) => {
res.json(listaDeClientes);
}); 

// NOVA ROTA: Rota para buscar UM cliente pelo ID
app.get(`/clientes/:id`, (req, res) => {
    // 1. Captura o ID da URL e converte para número
    const idDoCliente = parseInt(req.params.id);
    // 2. Procura o cliente no array usando o método find()
    const cliente = listaDeClientes.find(c => c.id === idDoCliente);
    // 3. Verifica se o cliente foi encontrado
    if (cliente) {
        // Se encontrou, retorna o cliente com status 200 (OK)
        res.json(cliente);
    } else {
        // Se não encontrou, retorna um erro 404 (Not Found)
        res.status(404).json({mensagem: `Cliente não encontrado.`})
    }
})

app.post(`/clientes`, (req, res) => {
    // O middleware express.json() pega o corpo requisição e o coloca em req.body
    const novoCliente = req.body;

    console.log(`Recebemos um novo cliente:`, novoCliente);

    res.json({ message: `Cliente ${novoCliente.nome} cadastrado com sucesso!`, data: novoCliente});

});
