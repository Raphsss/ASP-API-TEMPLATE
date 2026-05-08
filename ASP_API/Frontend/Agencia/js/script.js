const apiUrl = 'http://localhost:5115/api/agencia'; // Ajuste a URL se necessário
const form = document.getElementById('agencia-form');
const tableBody = document.querySelector('#agencias-table tbody');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
let editingId = null;

// Carregar agências ao iniciar
document.addEventListener('DOMContentLoaded', loadAgencias);

// Evento de submit do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const agencia = {
        nome: document.getElementById('nome').value,
        cidade: document.getElementById('cidade').value,
        estadoUF: document.getElementById('estadoUF').value
    };

    if (editingId) {
        await updateAgencia(editingId, agencia);
    } else {
        await createAgencia(agencia);
    }

    resetForm();
    loadAgencias();
});

// Evento de cancelar edição
cancelBtn.addEventListener('click', resetForm);

// Funções API
async function loadAgencias() {
    try {
        const response = await fetch(apiUrl);
        const agencias = await response.json();
        renderTable(agencias);
    } catch (error) {
        console.error('Erro ao carregar agências:', error);
        alert('Erro ao carregar agências. Verifique se o backend está rodando.');
    }
}

async function createAgencia(agencia) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agencia)
        });
        if (!response.ok) throw new Error('Erro ao criar agência');
    } catch (error) {
        console.error('Erro ao criar agência:', error);
        alert('Erro ao criar agência.');
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

async function deleteAgencia(id) {
    if (!confirm('Tem certeza que deseja excluir esta agência?')) return;
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir agência');
        loadAgencias();
    } catch (error) {
        console.error('Erro ao excluir agência:', error);
        alert('Erro ao excluir agência.');
    }
}

// Funções de UI
function renderTable(agencias) {
    tableBody.innerHTML = '';
    agencias.forEach(agencia => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${agencia.codigo}</td>
            <td>${agencia.nome}</td>
            <td>${agencia.cidade}</td>
            <td>${agencia.estadoUF}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editAgencia(${agencia.codigo}, '${agencia.nome}', '${agencia.cidade}', '${agencia.estadoUF}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteAgencia(${agencia.codigo})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editAgencia(id, nome, cidade, estadoUF) {
    editingId = id;
    document.getElementById('agencia-id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('cidade').value = cidade;
    document.getElementById('estadoUF').value = estadoUF;
    formTitle.textContent = 'Editar Agência';
    submitBtn.textContent = 'Atualizar';
    cancelBtn.style.display = 'inline-block';
}

function resetForm() {
    editingId = null;
    form.reset();
    formTitle.textContent = 'Adicionar Nova Agência';
    submitBtn.textContent = 'Adicionar';
    cancelBtn.style.display = 'none';
}