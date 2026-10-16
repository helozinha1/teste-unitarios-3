const sistema = require('./sistema');

// 1. Verificador de Palíndromo
describe('Verificador de Palíndromo', () => {
  test('deve reconhecer palavras válidas', () => {
    expect(sistema.ehPalindromo('radar')).toBe(true);
    expect(sistema.ehPalindromo('arara')).toBe(true);
    expect(sistema.ehPalindromo('javascript')).toBe(false);
  });
});

// 2. Contador de Vogais
describe('Contador de Vogais', () => {
  test('deve contar vogais', () => {
    expect(sistema.contarVogais('escola')).toBe(3);
    expect(sistema.contarVogais('aluno')).toBe(3);
    expect(sistema.contarVogais('javascript')).toBe(3);
    expect(sistema.contarVogais('xyz')).toBe(0);
  });
});

// 3. Calculadora de Fatorial
describe('Calculadora de Fatorial', () => { 
  test('deve calcular fatorial', () => { 
    expect(sistema.calcularFatorial(5)).toBe(120); 
    expect(sistema.calcularFatorial(0)).toBe(1); 
    expect(() => { 
      sistema.calcularFatorial(-2); 
    }).toThrow('Não existe fatorial de número negativo'); 
  }); 
});

// 4. Removedor de Duplicatas
describe('Removedor de Duplicatas', () => {
  test('deve remover duplicatas', () => {
    expect(sistema.removerDuplicatas([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
    expect(sistema.removerDuplicatas([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

// 5. Validador de Agendamento 
describe('Agendamento de Consulta', () => {
  test('deve agendar consulta', () => {
    expect(sistema.agendarConsulta(new Date('2026-10-16T10:00:00'))).toBe('Consulta agendada com sucesso');
    expect(() => {
      sistema.agendarConsulta(new Date('2026-10-17T10:00:00'));
    }).toThrow('Clínica fechada aos finais de semana');
  });
});

// 6. Formatador de Moeda Brasileira 
describe('Formatador de Moeda', () => {
  test('deve formatar moeda', () => {
    expect(sistema.formatarMoeda(15.5)).toBe('R$ 15,50');
    expect(sistema.formatarMoeda(15)).toBe('R$ 15,00');
    expect(sistema.formatarMoeda(0)).toBe('R$ 0,00');
    expect(sistema.formatarMoeda(1000)).toBe('R$ 1000,00');
  });
});

// 7. Validador de CPF Básico
describe('Validador de CPF Básico', () => {
  test('deve validar CPF', () => {
   
    expect(sistema.validarCpfBasico('123.456.789-01')).toBe(true); 
    expect(sistema.validarCpfBasico('12345678901')).toBe(true);    

    expect(sistema.validarCpfBasico('111.111.111-11')).toBe(false);
    expect(sistema.validarCpfBasico('11111111111')).toBe(false);

    expect(sistema.validarCpfBasico('12345')).toBe(false);
    expect(sistema.validarCpfBasico('1111111111111')).toBe(false); 
  });
});

//8 - Cálculo de Ingresso 
describe('Cálculo de Ingresso', () => {
  test('deve calcular ingresso aplicando regras de meia-entrada sem acumular', () => {
    expect(sistema.calcularIngresso(65, true, 3)).toBe(20); 
    expect(sistema.calcularIngresso(65, false, 3)).toBe(20); 
    expect(sistema.calcularIngresso(65, false, 0)).toBe(20);
    expect(sistema.calcularIngresso(25, true, 0)).toBe(20);  
    expect(sistema.calcularIngresso(25, false, 3)).toBe(20); 
    expect(sistema.calcularIngresso(25, false, 0)).toBe(40); 
  });
});

//9 - Conta Bancária
describe('Conta Bancária', () => {
  let conta;
  beforeEach(() => {
    conta = new sistema.ContaBancaria();
  });

  test('deve depositar valor', () => {
    conta.depositar(100);
    expect(conta.obterSaldo()).toBe(100);
  });

  test('deve sacar valor', () => {
    conta.depositar(100);
    conta.sacar(50);
    expect(conta.obterSaldo()).toBe(50);
  });

  test('deve retornar erro ao sacar valor sem dinheiro', () => {
    conta.depositar(100);
    expect(() => {
      conta.sacar(200);
    }).toThrow('Saldo insuficiente');
  });
});

// 10 - Consulta de Clima
describe('Consulta de Clima', () => {
  test('deve obter clima', async () => {
    const api = {
      buscar: async (cidade) => {
        return { temperatura: 28 };
      },
    };
    await expect(sistema.obterClima('São Paulo', api)).resolves.toBe('A temperatura em São Paulo é de 28°C');
  });

  test('deve retornar erro ao falhar na API', async () => {
    const api = {
      buscar: async () => {
        throw new Error('Falha ao buscar dados climáticos');
      },
    };
    await expect(sistema.obterClima('São Paulo', api)).rejects.toThrow('Falha ao buscar dados climáticos');
  });
});