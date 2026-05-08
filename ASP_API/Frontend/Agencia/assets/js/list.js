const apiUrl = 'http://localhost:5115/api/agencia'; // Ajuste a URL se necessário
const tableBody = document.querySelector('#agencias-table tbody');

// Carregar agências ao iniciar
document.addEventListener('DOMContentLoaded', loadAgencias);

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
                <a href="edit.html?id=${agencia.codigo}" class="btn btn-sm btn-warning me-2">Editar</a>
                <button class="btn btn-sm btn-danger" onclick="deleteAgencia(${agencia.codigo})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}