# FinanceFlow
O desafio consite em implementar um sistema de controle de gastos residenciais que permite o cadastro de transações, a gestão de pessoas e a consulta de totais.

## Premissas adotadas
    1. O backend foi desenvolvido em C# com ASP.NET Core, enquanto o frontend utiliza React.js com TypeScript.
    2. A persistência de dados é realizada com SQLite, utilizando Entity Framework Core (EF Core).
    3. A aplicação segue o padrão arquitetural MVC (Model-View-Controller).

## Resumo do código

### Backend  

#### **Models**  
- **User.cs**: Representa a entidade de usuário na aplicação. Possui os seguintes campos:  
  - `Id`: Identificador único, gerado automaticamente e de forma sequencial.  
  - `Name`: Nome do usuário.  
  - `Age`: Idade do usuário.  

- **Transaction.cs**: Representa a entidade de transação financeira dos usuários. Seus campos são:  
  - `Id`: Identificador único, gerado automaticamente e de forma sequencial.  
  - `Description`: Descrição da transação.  
  - `Value`: Valor da transação.  
  - `Type`: Tipo da transação (receita ou despesa).  
  - `UserId`: Identificador do usuário ao qual a transação pertence.

#### **Repositories**  
- **IUserRepository e ITransactionRepository**: Interfaces que definem os contratos para os repositórios, seguindo o Repository Pattern. Esse padrão melhora a organização do código, promovendo abstração da camada de acesso a dados, maior reutilização, e facilitando a manutenção e testes. 
- **UserRepository.cs**: Repositório responsável pela gestão de usuários, implementando os seguintes métodos:  
  - `GetAll()`: Retorna a lista de todos os usuários.  
  - `GetById(id)`: Busca um usuário pelo seu identificador.  
  - `Insert(user)`: Registra um novo usuário no banco de dados.  
  - `Delete(id)`: Remove um usuário do banco de dados.  
- **TransactionRepository.cs**: Repositório responsável pela gestão de transações, implementando os seguintes métodos:  
  - `GetById(id)`: Busca uma transação pelo seu identificador.  
  - `Insert(transaction)`: Insere uma nova transação no banco de dados.  
  - `GetAll()`: Retorna a lista de todas as transações.  
  - `GetByUserId(userId)`: Retorna todas as transações associadas a um usuário específico.  
  - `Delete(id)`: Remove uma transação do banco de dados. 

#### **Services**
- **IUserService e ITransactionService**: Interfaces que definem os contratos para a camada de serviço, garantindo a separação entre a lógica de negócio e a camada de acesso a dados.
- **UserService**: Serviço responsável pela gestão de usuários, implementando as seguintes operações:  
  - `CreateUser(user)`: Cria um novo usuário, validando se o nome foi informado e se a idade está dentro de um intervalo aceitável (entre 1 e 109 anos).  
  - `GetUserById(id)`: Retorna um usuário pelo seu identificador.  
  - `GetAllUsers()`: Retorna a lista de todos os usuários cadastrados.  
  - `DeleteUser(id)`: Remove um usuário do banco de dados, verificando se ele existe antes da exclusão.  
- **TransactionService**: Serviço responsável pela gestão de transações, implementando as seguintes operações:  
  - `CreateTransaction(transaction, userId)`: Cria uma nova transação associada a um usuário, garantindo que menores de 18 anos só possam registrar despesas.  
  - `GetTransactionById(id)`: Retorna uma transação pelo seu identificador.  
  - `GetAllTransactions()`: Retorna a lista de todas as transações cadastradas.  
  - `GetTransactionsByUserId(userId)`: Retorna todas as transações associadas a um usuário específico.  
  - `DeleteTransaction(id)`: Remove uma transação do banco de dados, verificando se ela existe antes da exclusão.  

#### **Controllers**  
- **UserController**: Controlador responsável pelo gerenciamento de usuários e suas transações. Implementa os seguintes endpoints:  
  - `GET /api/users/{id}`: Retorna um usuário pelo seu identificador.  
  - `GET /api/users`: Retorna a lista de todos os usuários cadastrados.  
  - `POST /api/users`: Cria um novo usuário a partir dos dados fornecidos no corpo da requisição.  
  - `DELETE /api/users/{id}`: Remove um usuário e todas as suas transações associadas.  
- **TransactionController**: Controlador responsável pelo gerenciamento de transações financeiras. Implementa os seguintes endpoints:  
  - `GET /api/transactions/{id}`: Retorna uma transação pelo seu identificador.  
  - `GET /api/transactions`: Retorna a lista de todas as transações cadastradas.  
  - `POST /api/transactions`: Cria uma nova transação associada a um usuário.  
  - `GET /api/transactions/user/{userId}`: Retorna todas as transações de um usuário específico.  

### Frontend

#### **Components**:

#### **Users**  
Componentes responsáveis pelo gerenciamento e exibição dos usuários.  
- **RegisterUserModal**:  
  Modal para registrar um novo usuário.  
  - Permite que o usuário informe:  
    - `Name`: nome do usuário.  
    - `Age`: idade do usuário.  
  - Após o registro, a página é recarregada automaticamente.  
- **UserTableItem**:  
  Componente que exibe um usuário na tabela.  
  - Mostra:  
    - Nome e idade do usuário.  
  - Funcionalidades:  
    - Register transaction: abre o `RegisterTransactionModal` para adicionar uma nova transação.  
    - Delete user: solicita confirmação e remove o usuário.  
    - See transactions: abre o `SeeTransactionsModal` para visualizar as transações do usuário.  
- **UserTable**:  
  Componente que exibe a lista de usuários cadastrados.  
  - Obtém todos os usuários cadastrados.  
  - Renderiza cada usuário como um `UserTableItem`.  
  - Funcionalidades:  
    - Register user: abre o `RegisterUserModal` para adicionar um novo usuário.  
    - Check total: abre o `TotalTable` para visualizar o total de transações.  


#### **Transactions**  
Componentes responsáveis pelo gerenciamento e exibição das transações dos usuários.  
- **RegisterTransactionModal**:  
  Modal para registrar uma nova transação.  
  - Permite que o usuário informe:  
    - `Type`: receita (Income) ou despesa (Expense).  
    - `Value`: valor da transação.  
    - `Description`: descrição da transação.  
  - Restrições:  
    - Usuários menores de 18 anos só podem registrar despesas.  
  - Após o registro, a página é recarregada automaticamente.  
- **SeeTransactionsModal**:  
  Modal para visualizar as transações de um usuário específico.  
  - Obtém todas as transações do usuário pelo `userId`.  
  - Renderiza os dados usando o componente `Transaction`.  
  - Se o usuário não tiver transações, exibe a mensagem "No transactions found."  
- **Transaction**:  
  Componente responsável por exibir uma única transação.  
  - Mostra:  
    - Tipo da transação (`Income` ou `Expense`).  
    - Valor.  
    - Descrição.  

#### **Totals**  
Componentes responsáveis por exibir o total de receitas, despesas e saldo dos usuários.  
- **CheckUserTotal**:  
  Exibe os totais individuais de um usuário específico.  
  - Obtém todas as transações do usuário com base no `userId` e calcula:  
    - `totalIncome`: soma das receitas.  
    - `totalExpense`: soma das despesas.  
    - `balance`: diferença entre receitas e despesas.  
  - Renderiza essas informações em um painel contendo:  
    - Nome do usuário.  
    - Total de receitas.  
    - Total de despesas.  
    - Saldo total.  
- **TotalTable**:  
  Modal que exibe os totais de todos os usuários cadastrados.  
  - Obtém a lista de usuários e suas transações.  
  - Para cada usuário, instancia um componente `CheckUserTotal` para exibir seus valores individuais.  
  - Calcula e exibe os valores totais da aplicação:  
    - `totalIncome`: soma de todas as receitas registradas.  
    - `totalExpense`: soma de todas as despesas registradas.   

### **Frontend Services**  
Serviços responsáveis por fazer chamadas à API para manipulação de usuários e transações.  

#### **TransactionService**  
Gerencia as transações do usuário.  
- **getTransactions()** 
  - Retorna todas as transações cadastradas.  
- **createTransaction(transaction: TransactionDto)**
  - Cria uma nova transação.  
- **getTransactionById(transactionId: number)** 
  - Retorna uma transação específica pelo ID.  
- **getTransactionsByUserId(userId: number)**
  - Retorna todas as transações associadas a um usuário específico.  

#### **UserService**  
Gerencia os usuários.  
- **getUsers()**
  - Retorna todos os usuários cadastrados.  
- **createUser(user: UserDto)**
  - Cria um novo usuário.  
- **getUserById(userId: number)** 
  - Retorna um usuário específico pelo ID.  
- **deleteUser(userId: number)**
  - Remove um usuário pelo ID.  



