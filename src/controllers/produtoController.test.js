import { produtoCreateSchema } from '../controllers/produtoController.js';

// 2. Agrupamos nossos testes com 'describe'

describe("Testes de Validação do Schema de Produto (Joi)", () => {
    // 3. Teste 1: O "caminho feliz"
    it("deve validar um produto com todos os dados corretos", () => {
        // Preparação (Arrange)
        const produtoValido = {
            idPedido: "1000",
            nome: "Pizza 4 queijos",
            descricao: "quatro queijos diferentes",
            tipo: "Pizza",
            valor: 49.90,
            imagem: "4queijos.jpg"
        };
        // Execução (Act)
        const { error } = produtoCreateSchema.validate(produtoValido);
        // Verificação (Assert)
        // Se 'error' for undefined (ou nulo), a validação passou
        expect(error).toBeFalsy(); // .toBeFalsy() checa se o valor é nulo ou undefined
    });

    // 4. Teste 2 Permitindo campos opcionais
    it("deve permitir um produto com o campo imagem em branco", () => {
        // Preparação (Arrange)
        const produtoSemImagem = {
            idPedido: "1001",
            nome: "Pizza Doritos",
            descricao: "Magnifica pizza de doritos SEM PIMENTA",
            tipo: "Pizza",
            valor: 52.90,
            imagem: "" // O schema permite isso com .allow('')
        };

        // Execução (Act)
        const { error } = produtoCreateSchema.validate(produtoSemImagem);

        // Verificação (Assert)
        expect(error).toBeFalsy();
    });

    // 5. Teste 3: Cenário de Falha (Campo Obrigatório)
    it("deve rejeitar um produto sem o campo nome", () => {
        const produtoSemNome = {
            idPedido: "1002",
            descricao: "Magnifica pizza de Calabresa",
            tipo: "Pizza",
            valor: 49.90,
            imagem: "calabresa.jpg" // 
        };

        const { error } = produtoCreateSchema.validate(produtoSemNome);

        // Agora, esperamos que 'error' exista!
        expect(error).toBeTruthy(); // .toBeTruthy checa se o valor não é nulo/undefined
        // Teste Bônus: Podemos até verificar a mensagem de erro específica
        expect(error.details[0].message).toBe('"nome" is required');
    });

    // 6. Teste 4: Cenário de Falha (Regra de Tipo/Valor)
    it("deve rejeitar um produto com valor negativo", () => {
        const produtoValorNegativo = {
            idPedido: "1003",
            nome: "Pizza de Brócolis",
            descricao: "Magnifica pizza de Brócolis",
            tipo: "Pizza",
            valor: -49.90,
            imagem: "brocolis.jpg" // O schema exige .positive()
        };

        const { error } = produtoCreateSchema.validate(produtoValorNegativo);

        expect(error).toBeTruthy();
        expect(error.details[0].message).toBe('"valor" must be a positive number');
    });

    // 7. Teste 5: Cenário de Falha (Tipo errado)
    it("deve rejeitar um produto com valor que não é um número", () => {

        const produtoValorErrado = {
        idPedido: "1004",
        nome: "Pizza de String",
        descricao: "Magnifica pizza de string",
        tipo: "Pizza",
        valor: "Qualquer valor ai", // O schema exige Joi.number()
        imagem: "string.jpg" 
        };

        const { error } = produtoCreateSchema.validate(produtoValorErrado);
        
        expect(error).toBeTruthy();
        expect(error.details[0].message).toBe('"valor" must be a number');
    });
});
