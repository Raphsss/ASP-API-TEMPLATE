const apiUrl = 'http://localhost:5115/api/agencia'; // Ajuste a URL se necessário
const form = document.getElementById('agencia-form');

// Evento de submit do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const agencia = {
        nome: document.getElementById('nome').value,
        cidade: document.getElementById('cidade').value,
        estadoUF: document.getElementById('estadoUF').value
    };

    await createAgencia(agencia);
    window.location.href = 'list.html';
});

// Função API
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