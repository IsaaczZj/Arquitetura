// const axios = require('axios');

// class Disciplina {
//     constructor(nome) {
//         this.nome = nome;
//     }
// }

// class Aluno {
//     constructor(nome) {
//         this.nome = nome;
//         this.disciplinas = [];
//     }

//     adicionarDisciplina(disciplina) {
//         this.disciplinas.push(disciplina);
//     }

//     limparDisciplinas() {
//         this.disciplinas = [];
//     }
// }

// class EscolaFacade {
//     constructor() {
//         this.baseUrl = 'http://localhost:3000';
//         this.disciplinas = [];
//         this.alunos = [];
//         this.carregarAlunos(); // Carrega os alunos inicialmente ao criar a instância
//     }

//     async carregarAlunos() {
//         try {
//             let response = await axios.get(`${this.baseUrl}/alunos`);
//             this.alunos = response.data;
//             console.log("Alunos carregados com sucesso!");
//         } catch (error) {
//             console.error("Erro ao carregar alunos:", error.response ? error.response.data : error.message);
//         }
//     }

//     async adicionarAluno(nome, disciplinasAluno) {
//         try {
//             let response = await axios.post(`${this.baseUrl}/alunos`, { nome, disciplinas: disciplinasAluno });
//             console.log("Aluno adicionado com sucesso!");
//             await this.carregarAlunos(); // Recarrega alunos após adição
//         } catch (error) {
//             console.error("Erro ao adicionar aluno:", error.response ? error.response.data : error.message);
//         }
//     }

//     // async atualizarDisciplinasAluno(nomeAluno, novasDisciplinas) {
//     //     if (!this.alunos || this.alunos.length === 0) {
//     //         await this.carregarAlunos(); // Assegura que os alunos estão carregados
//     //     }
//     //     let aluno = this.alunos.find(a => a.nome === nomeAluno);
//     //     if (aluno) {
            
//     //         console.log("Disciplinas do aluno atualizadas com sucesso!");
//     //     } else {
//     //         console.log("Aluno não encontrado!");
//     //     }
//     // }

    

//     async removerAluno(nomeAluno) {
//         try {
//             let response = await axios.delete(`${this.baseUrl}/alunos?nome=${nomeAluno}`);
//             console.log("Aluno removido com sucesso!");
//         } catch (error) {
//             console.error("Erro ao remover aluno:", error.response ? error.response.data : error.message);
//         }
//     }
    
//     async adicionarDisciplina(nomeDisciplina) {
//         try {
//             let response = await axios.post(`${this.baseUrl}/disciplinas`, { nome: nomeDisciplina });
//             console.log("Disciplina adicionada com sucesso!");
//             this.disciplinas.push(response.data); // Assumindo que `response.data` contém a disciplina adicionada
//         } catch (error) {
//             if (error.response) {
//                 console.error("Erro ao adicionar disciplina:", error.response.data);
//             } else {
//                 console.error("Erro ao adicionar disciplina:", error.message);
//             }
//         }
//     }
      
//     async listarAlunos() {
//         try {
//             let response = await axios.get(`${this.baseUrl}/alunos`);
//             console.log("Lista de Alunos:");
//             response.data.forEach(aluno => {
//                 console.log(`- ${aluno.nome}`); // Certifique-se de que 'nome' é a propriedade correta
//                 if (aluno.disciplinas && aluno.disciplinas.length > 0) {
//                     console.log("  Disciplinas:");
//                     aluno.disciplinas.forEach(disciplina => {
//                         console.log(`    - ${disciplina.nome}`); // Certifique-se de que 'nome' é a propriedade correta
//                     });
//                 } else {
//                     console.log("  Sem disciplinas cadastradas.");
//                 }
//             });
//         } catch (error) {
//             console.error("Erro ao listar alunos:", error.response ? error.response.data : error.message);
//         }
//     }
    


//     async atualizarDisciplinasAluno(aluno, novasDisciplinas) {
//         try {
//             let response = await axios.put(`${this.baseUrl}/alunos/${aluno.id}`, { nome: aluno.nome, disciplinas: novasDisciplinas });
//             console.log("Disciplinas do aluno atualizadas com sucesso!");
//         } catch (error) {
//             console.error("Erro ao atualizar disciplinas do aluno:", error.response.data);
//         }
//     }
    
// }

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const facade = new EscolaFacade();
// const disciplinas = facade.disciplinas;

// console.log("Digite o nome das disciplinas disponíveis (digite 'fim' para terminar):");
// rl.prompt();

// rl.on('line', (input) => {
//   if (input.trim() !== 'fim') {
//       facade.adicionarDisciplina(input.trim());
//   } else {
//       rl.removeListener('line', () => {});
//       rl.removeAllListeners('line');
//       menuPrincipal();
//   }
// });

// function menuPrincipal() {
//     console.log("\nEscolha uma opção:");
//     console.log("1. Adicionar Aluno");
//     console.log("2. Remover Aluno");
//     console.log("3. Listar Alunos");
//     console.log("4. Para refazer disciplina do aluno");
//     console.log("0. Sair");

//     rl.question('', (opcao) => {
//         switch (parseInt(opcao)) {
//             case 1:
//                 console.log("Digite o nome do aluno (ou 'fim' para sair):");
//                 rl.question('', (nomeAluno) => {
//                     if (nomeAluno.trim() !== 'fim') {
//                         if (disciplinas && disciplinas.length > 0) {
//                             console.log("Selecione as disciplinas que o aluno irá fazer (digite o número da disciplina, 'fim' para terminar):");
//                             disciplinas.forEach((disciplina, index) => {
//                                 console.log((index + 1) + ". " + disciplina.nome);
//                             });
//                             let disciplinasAluno = [];
//                             escolherDisciplinas(disciplinasAluno, nomeAluno); // Passar nomeAluno
//                         } else {
//                             console.log("Nenhuma disciplina disponível.");
//                             menuPrincipal();
//                         }
//                     } else {
//                         console.log("Encerrando o programa...");
//                         rl.close();
//                     }
//                 });
//                 break;
//           case 2:
//               console.log("Digite o nome do aluno que deseja remover:");
//               rl.question('', (alunoRemover) => {
//                   facade.removerAluno(alunoRemover.trim());
//                   menuPrincipal();
//               });
//               break;
//           case 3:
//               facade.listarAlunos();
//               menuPrincipal();
//               break;
//           case 4:
//               console.log("Digite o nome do aluno para atualizar suas disciplinas:");
//               rl.question('', (alunoAtualizar) => {
//                   let aluno = facade.alunos.find(a => a.nome === alunoAtualizar.trim());
//                   if (aluno) {
//                       console.log("Selecione as novas disciplinas que o aluno irá fazer (digite o número da disciplina, 'fim' para terminar):");
//                       disciplinas.forEach((disciplina, index) => {
//                           console.log((index + 1) + ". " + disciplina.nome);
//                       });
//                       let novasDisciplinas = [];
//                       escolherDisciplinas(novasDisciplinas, aluno);
//                   } else {
//                       console.log("Aluno não encontrado!");
//                       menuPrincipal();
//                   }
//               });
//               break;
//           case 0:
//               console.log("Encerrando o programa...");
//               rl.close();
//               break;
//           default:
//               console.log("Opção inválida!");
//               menuPrincipal();
//       }
//   });
// }

// function escolherDisciplinas(listaDisciplinas, nomeAluno, aluno = null) {
//     rl.question('', (escolha) => {
//         if (parseInt(escolha) > 0 && parseInt(escolha) <= disciplinas.length) {
//             listaDisciplinas.push(disciplinas[parseInt(escolha) - 1]);
//             console.log("Digite o número da próxima disciplina (ou 0 para terminar):");
//             escolherDisciplinas(listaDisciplinas, nomeAluno, aluno);
//         } else if (parseInt(escolha) === 0) {
//             if (aluno) {
//                 facade.atualizarDisciplinasAluno(aluno, listaDisciplinas);
//             } else {
//                 facade.adicionarAluno(nomeAluno, listaDisciplinas); // Usar nomeAluno aqui
//             }
//             menuPrincipal();
//         } else {
//             console.log("Opção inválida! Digite o número da disciplina novamente:");
//             escolherDisciplinas(listaDisciplinas, nomeAluno, aluno);
//         }
//     });
// }

const baseUrl = 'http://localhost:3000';

async function adicionarDisciplina() {
    const nomeDisciplina = document.getElementById('nomeDisciplina').value;
    try {
        await axios.post(`${baseUrl}/disciplinas`, { nome: nomeDisciplina });
        alert('Disciplina adicionada com sucesso!');
        carregarDisciplinas();
    } catch (error) {
        alert('Erro ao adicionar disciplina!');
    }
}

async function adicionarAluno() {
    const nomeAluno = document.getElementById('nomeAluno').value;
    let disciplinas = Array.from(document.querySelectorAll('input[name="disciplina"]:checked')).map(el => el.value);
    try {
        await axios.post(`${baseUrl}/alunos`, { nome: nomeAluno, disciplinas: disciplinas });
        alert('Aluno adicionado com sucesso!');
        carregarAlunos();
    } catch (error) {
        alert('Erro ao adicionar aluno!');
    }
}

async function carregarDisciplinas() {
    try {
        let response = await axios.get(`${baseUrl}/disciplinas`);
        const disciplinas = response.data;
        const listaDisciplinas = document.getElementById('listaDisciplinas');
        listaDisciplinas.innerHTML = disciplinas.map(d => `<label><input type="checkbox" name="disciplina" value="${d.id}"> ${d.nome}</label>`).join('<br>');
    } catch (error) {
        console.error('Erro ao carregar disciplinas');
    }
}

async function carregarAlunos() {
    try {
        let response = await axios.get(`${baseUrl}/alunos`);
        const alunos = response.data;
        const listaAlunos = document.getElementById('listaAlunos');
        listaAlunos.innerHTML = alunos.map(aluno => `<li>${aluno.nome} - ${aluno.disciplinas.map(d => d.nome).join(', ')} <button onclick="removerAluno('${aluno.id}')">Remover</button></li>`).join('');
    } catch (error) {
        console.error('Erro ao carregar alunos');
    }
}

async function carregarAlunosSelect() {
    try {
        const response = await axios.get(`${baseUrl}/alunos`);
        const alunos = response.data;
        const selecaoAluno = document.getElementById('selecaoAluno');
        selecaoAluno.innerHTML = '<option>Selecione um aluno</option>';
        alunos.forEach(aluno => {
            selecaoAluno.innerHTML += `<option value="${aluno.id}">${aluno.nome}</option>`;
        });
    } catch (error) {
        console.error('Erro ao carregar alunos para seleção:', error);
    }
}

document.getElementById('selecaoAluno').addEventListener('change', async (e) => {
    const alunoId = e.target.value;
    if (!alunoId) return; // Adicione esta linha para evitar chamadas desnecessárias
    const response = await axios.get(`${baseUrl}/alunos/${alunoId}`);
    const aluno = response.data;
    const disciplinasAluno = document.getElementById('disciplinasAluno');
    disciplinasAluno.innerHTML = '';
    aluno.disciplinas.forEach(disciplina => {
        disciplinasAluno.innerHTML += `<label><input type="checkbox" name="disciplina" value="${disciplina.id}" checked> ${disciplina.nome}</label><br>`;
    });
    carregarDisciplinas();
});

async function atualizarDisciplinasAluno() {
    const alunoId = document.getElementById('selecaoAluno').value;
    const disciplinasSelecionadas = Array.from(document.querySelectorAll('#disciplinasAluno input[name="disciplina"]:checked')).map(el => el.value);
    try {
        await axios.put(`${baseUrl}/alunos/${alunoId}`, { disciplinas: disciplinasSelecionadas });
        alert('Disciplinas atualizadas com sucesso!');
        carregarAlunos();
        carregarAlunosSelect();
    } catch (error) {
        alert('Erro ao atualizar disciplinas do aluno!');
    }
}

async function removerAluno(alunoId) {
    try {
        await axios.delete(`${baseUrl}/alunos/${alunoId}`);
        alert('Aluno removido com sucesso!');
        carregarAlunos();
        carregarAlunosSelect();
    } catch (error) {
        alert('Erro ao remover aluno!');
    }
}

carregarAlunosSelect();
carregarDisciplinas();
carregarAlunos();
