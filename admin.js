// Define o endereço da api
const API_URL = 'http://localhost:3333/api';

$(document).ready(function () {

    // Função auxiliar para alternar as telas
    function alternarTelas(estaLogado) {
        if (estaLogado) {
            $('#login-admin').hide(); // Esconde
            $('#painel-administrativo').fadeIn(); // Mostra
            carregarProdutosAdmin(); // Mostra os produtos
        } else {
            $('#login-admin').show(); // Mostra
            $('#painel-administrativo').hide(); // Esconde
        }
    }

    // Função para verificar a sessão do administrador
    function verificarSessaoAdmin() {
        const token = localStorage.getItem('token');
        const ClienteRaw = localStorage.getItem('cliente');
        try {
            if (token && ClienteRaw && ClienteRaw !== "undefined") {
                const cliente = JSON.parse(ClienteRaw);
                if (cliente.tipo === 'admin') return alternarTelas(true);
            }
        } catch (error) {
            localStorage.clear();
        }
        alternarTelas(false);
    }

    // Login
    $('#btn-login-admin').click(function () {
        const dados = { //DADOS ENVIADOS PARA O LOGIN
            cpf: $('#admin-cpf').val(), // Pega o CPF
            senha: $('#admin-senha').val() // Pega a senha
        }

        $.ajax({ // Envia a requisição para a API
            url: `${API_URL}/login`, // Rota
            type: 'POST', // Tipo de Requisição
            contentType: 'application/json', // Conteúdo da Requisição (JSON)
            data: JSON.stringify(dados), // Converte os dados para JSON
            success: function (res) {
                localStorage.setItem('token', res.token); // Armazena o token localmente
                localStorage.setItem('cliente', JSON.stringify(res.cliente)); // Armazena os dados do cliente
                alert('Login efetuado com sucesso!'); // Emite uma mensagem
                alternarTelas(true);
            },
            error: function (err) {
                alert('Usuário ou senha incorretos.')
                console.log(err)
            }
        })
    });


    $('#btn-logout').click(function () {
        localStorage.removeItem('token');
        localStorage.removeItem('cliente');
        location.reload();
    })

    function carregarProdutosAdmin() {
        $.get(`${API_URL}/produtos`, function (produtos) {
            console.log(produtos)
            let linhas = "";
            produtos.forEach(prod => {
                linhas += `
                    <tr>
                        <td class="fw-bold">${prod.idProduto}</td>

                        <td><img src="${prod.imagem}" width="50" height="50" class="rounded object-fit-cover"></td>

                        <td>
                            <div class="fw-bold">${prod.nome}</div>

                            <div class="small text-muted text-truncate" style="max-width: 200px;">${prod.descricao}</div>
                        </td>

                        <td>
                            <div class="fw-bold">${prod.tipo}</div>
                        </td>

                        <td class="fw-medium">${Number(prod.valor).toFixed(2).replace('.', ',')}</td>

                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-primary" data-id="${prod.idProduto}" id="btn-editar">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" id="btn-excluir" data-id="${prod.idProduto}">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </td>

                    </tr>
                `
            });
            $('#tabela-admin').html(linhas)

        })
    }


    // EVENTO: Cadastro novo produto
    $('#form-admin').on("submit", function (e) {
        e.preventDefault(); // Previne enviar o formulário vazio

        const novoProduto = {

            idProduto: $('#cadastro-id').val(),
            nome: $('#cadastro-nome').val(),
            descricao: $('#cadastro-descricao').val(),
            tipo: $('#cadastro-tipo').val(),
            valor: $('#cadastro-valor').val(),
            imagem: $('#cadastro-imagem').val()

        }

        // Envia os dados > Requisição POST

        $.ajax({
            url: `${API_URL}/produtos`,
            type: `POST`,
            contentType: 'application/json',
            data: JSON.stringify(novoProduto),
            headers: { "Authorization": "Bearer" + localStorage.getItem('token') },
            success: function () {
                alert('Produto cadastrado com sucesso!'); // Envia uma mensagem de ok
                $('#adminModalCadastrar').modal('hide'); // Esconde o modal
                $('#form-admin')[0].reset(); // Limpa o formulário
                carregarProdutosAdmin(); // Carrega os produtos atualizados
            },
            error: function (err) {
                alert('Não foi possível cadastrar o produto.');
                console.log(err);
            }
        })
    })

    // Excluindo um produto - DELETE
    $(document).on('click', '#btn-excluir', function () {

        const id = $(this).data("id");
        if (confirm("Tem certeza que deseja excluir o produto?")) {
            $.ajax({
                url: `${API_URL}/produtos/${id}`,
                type: `DELETE`,
                headers: { "Authorization": "Bearer" + localStorage.getItem('token') },
                success: function () {
                    alert("Produto removido com sucesso");
                    carregarProdutosAdmin();
                },
                error: function (err) {
                    alert("Não foi possível excluir o produto");
                    console.log(err)
                }
            })
        }
    })






    verificarSessaoAdmin()

})



