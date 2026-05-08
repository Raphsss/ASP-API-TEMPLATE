const apiUrl = 'http://localhost:5115/api/agencia'; // Ajuste a URL se necessário
const form = document.getElementById('agencia-form');

// Carregar agência ao iniciar
document.addEventListener('DOMContentLoaded', loadAgencia);

// Evento de submit do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('agencia-id').value;
    const agencia = {
        codigo: parseInt(id),
        nome: document.getElementById('nome').value,
        cidade: document.getElementById('cidade').value,
        estadoUF: document.getElementById('estadoUF').value
    };

    await updateAgencia(id, agencia);
    window.location.href = 'list.html';
});

// Funções API
async function loadAgencia() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        alert('ID da agência não fornecido.');
        window.location.href = 'list.html';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error('Agência não encontrada');
        const agencia = await response.json();
        populateForm(agencia);
    } catch (error) {
        console.error('Erro ao carregar agência:', error);
        alert('Erro ao carregar agência.');
        window.location.href = 'list.html';
    }
}

async function updateAgencia(id, agencia) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agencia)
        });
        if (!response.ok) throw new Error('Erro ao atualizar agência');
    } catch (error) {
        console.error('Erro ao atualizar agência:', error);
        alert('Erro ao atualizar agência.');
    }
}

// Função de UI
function populateForm(agencia) {
    document.getElementById('agencia-id').value = agencia.codigo;
    document.getElementById('nome').value = agencia.nome;
    document.getElementById('cidade').value = agencia.cidade;
    document.getElementById('estadoUF').value = agencia.estadoUF;
}