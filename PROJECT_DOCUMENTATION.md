# Documentação do Projeto ASP-API-TEMPLATE

## Visão Geral
Este é um template de API ASP.NET Core para gerenciamento de agências financeiras. O projeto inclui um backend RESTful API e um frontend web simples para operações CRUD (Criar, Ler, Atualizar, Deletar) em agências.

## Tecnologias Utilizadas
- **Backend**: ASP.NET Core 8.0, Entity Framework Core, SQL Server
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5
- **Banco de Dados**: SQL Server (scripts fornecidos)
- **Ferramentas**: Visual Studio, .NET CLI

## Estrutura do Projeto
```
ASP_API/
├── Backend/
│   ├── Controllers/
│   │   └── AgenciaController.cs
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   ├── Models/
│   │   └── Agencia.cs
│   ├── Services/
│   │   ├── AgenciaService.cs
│   │   └── IAgenciaService.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── Backend.csproj
├── Frontend/
│   ├── index.html
│   └── Agencia/
│       ├── assets/
│       │   ├── css/
│       │   │   └── styles.css
│       │   └── js/
│       │       ├── create.js
│       │       ├── edit.js
│       │       └── list.js
│       └── pages/
│           ├── create.html
│           ├── edit.html
│           └── list.html
├── Database/
│   ├── INSERT_AGENCIAS.sql
│   └── SQL_SCRIPT_TABELAS.sql
└── ASP_API.sln
```

## Configuração do Backend
1. **Pré-requisitos**:
   - .NET 8.0 SDK
   - SQL Server (ou SQL Server Express)

2. **Configuração do Banco de Dados**:
   - Execute o script `Database/SQL_SCRIPT_TABELAS.sql` para criar o banco e a tabela.
   - Execute o script `Database/INSERT_AGENCIAS.sql` para inserir dados de exemplo.

3. **Configuração da Connection String**:
   - Edite `Backend/appsettings.json` para definir a string de conexão do SQL Server.
   - Exemplo:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Server=localhost;Database=dbFinanceiro;Trusted_Connection=True;"
       }
     }
     ```

4. **Executar o Backend**:
   - Navegue para `ASP_API/Backend/`
   - Execute `dotnet run`
   - A API estará disponível em `http://localhost:5115` (porta pode variar)

## Configuração do Frontend
O frontend é composto por arquivos HTML estáticos. Não requer configuração adicional.

- **Página Inicial**: `Frontend/index.html` - Contém botões para navegar para as funcionalidades.
- **Listar Agências**: `Frontend/Agencia/pages/list.html` - Exibe tabela com agências e ações.
- **Criar Agência**: `Frontend/Agencia/pages/create.html` - Formulário para adicionar nova agência.
- **Editar Agência**: `Frontend/Agencia/pages/edit.html` - Formulário para editar agência existente.

## Endpoints da API
A API segue o padrão REST e está localizada em `/api/agencia`.

### GET /api/agencia
- **Descrição**: Retorna todas as agências cadastradas.
- **Resposta**: Lista de objetos Agencia.

### GET /api/agencia/{codigo}
- **Descrição**: Retorna uma agência específica pelo código.
- **Parâmetros**: `codigo` (int) - Código da agência.
- **Resposta**: Objeto Agencia ou 404 se não encontrado.

### POST /api/agencia
- **Descrição**: Cria uma nova agência.
- **Corpo**: Objeto Agencia (sem codigo, pois é auto-incremento).
- **Resposta**: Objeto Agencia criado com código gerado.

### PUT /api/agencia/{codigo}
- **Descrição**: Atualiza uma agência existente.
- **Parâmetros**: `codigo` (int) - Código da agência.
- **Corpo**: Objeto Agencia completo.
- **Resposta**: 204 No Content ou 404 se não encontrado.

### DELETE /api/agencia/{codigo}
- **Descrição**: Remove uma agência pelo código.
- **Parâmetros**: `codigo` (int) - Código da agência.
- **Resposta**: 204 No Content ou 404 se não encontrado.

### Modelo de Dados - Agencia
```json
{
  "codigo": 1,
  "nome": "Agência Central",
  "cidade": "São Paulo",
  "estadoUF": "SP"
}
```

## Como Executar o Projeto
1. Configure o banco de dados executando os scripts SQL.
2. Inicie o backend com `dotnet run` na pasta Backend.
3. Abra o frontend em um navegador web, acessando `Frontend/index.html`.
4. Navegue pelas funcionalidades usando os botões.

## Exemplos de Uso
### Criar uma Nova Agência via API
```bash
curl -X POST http://localhost:5115/api/agencia \
  -H "Content-Type: application/json" \
  -d '{"nome":"Agência Teste","cidade":"Rio de Janeiro","estadoUF":"RJ"}'
```

### Listar Todas as Agências
```bash
curl http://localhost:5115/api/agencia
```

### Editar uma Agência
```bash
curl -X PUT http://localhost:5115/api/agencia/1 \
  -H "Content-Type: application/json" \
  -d '{"codigo":1,"nome":"Agência Atualizada","cidade":"São Paulo","estadoUF":"SP"}'
```

### Deletar uma Agência
```bash
curl -X DELETE http://localhost:5115/api/agencia/1
```

## Notas Adicionais
- O frontend usa JavaScript vanilla para interagir com a API.
- Certifique-se de que o CORS está configurado no backend para permitir requisições do frontend.
- Para produção, considere adicionar autenticação, validação mais robusta e tratamento de erros.
- O projeto é um template básico e pode ser expandido com mais funcionalidades.

## Contribuição
Para contribuir, faça fork do repositório, crie uma branch para suas mudanças e submeta um pull request.

## Licença
Este projeto é distribuído sob a licença MIT.</content>
<parameter name="filePath">c:\Users\Administrador\Documents\raphaRepos\ASP-API-TEMPLATE\PROJECT_DOCUMENTATION.md