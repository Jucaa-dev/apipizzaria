import {validarCpf} from './validador'; //vai falhar, ainda não existe
 
describe("testes do validador de CPF", () => {
    it("deve retornar true para um CPF válido (11 dígitos)", () => {
        const resultado = validarCpf("12345678901");
        expect(resultado).toBeTruthy(); // mais idiomático
    });
 
    it("deve retornar false para um CPF com menos de 11 dígitos", () => {
        const resultado = validarCpf("123");
        expect(resultado).toBeFalsy();
    });
 
    it("deve retornar false para um CPF nulo ou undefined", () => {
        expect(validarCpf(null)).toBeFalsy();
        expect(validarCpf(undefined)).toBeFalsy();
    });
});