


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
        listaDisciplinas.innerHTML = disciplinas.map(d => `<label><input type="checkbox" name="disciplina" value="${d.nome}"> ${d.nome}</label>`).join('<br>');
    } catch (error) {
        console.error('Erro ao carregar disciplinas');
    }
}

async function carregarAlunos() {
    try {
        let response = await axios.get(`${baseUrl}/alunos`);
        const alunos = response.data;
        const listaAlunos = document.getElementById('listaAlunos');
        listaAlunos.innerHTML = alunos.map(aluno => `<li>${aluno.nome} - ${aluno.disciplinas.join(', ')} <button onclick="removerAluno('${aluno.id}')">Remover</button></li>`).join('');
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


