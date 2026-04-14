// Define o endereço da api
const API_URL = 'https://localhost:3333/api';

$(document).ready(function(){

    // Função auxiliar para alternar as telas
    function alternarTelas(estaLogado){
        if (estaLogado){
            $('#login-admin').hide(); // Esconde
            $('#painel-administrativo').fadeIn(); // Mostra
            carregarProdutosAdmin(); // Mostra os produtos
        }else{
            $('#login-admin').show(); // Mostra
            $('#painel-administrativo').hide(); // Esconde
        }
    }

    // Função para verificar a sessão do administrador
    function verificarSessaoAdmin(){
        const token = localStorage.getItem('token');
        const ClienteRaw = localStorage.getItem('cliente');
        try {
            if (token && ClienteRaw && ClienteRaw !== "undefined") {
                const cliente = JSON.parse(ClienteRaw);
                if (cliente.tipo === 'admin') return alternarTelas (true);
            }
        } catch (error) {
            localStorage.clear();
        }
        alternarTelas(false);
    }
})