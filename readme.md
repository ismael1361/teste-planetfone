# Introdução

Esse projeto foi realizado a pedido de teste em processo seletivo da Planetfone, com o objetivo em avaliar a aptidão do candidato.

Foi utilizado para o desenvolvimento do Backend o Node.js, um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.

Para o desenvolvimento do Frontend, foi utilizado uma das frameworks mais famosa dos desenvolvedores, o React.js, uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. É mantido pelo Facebook, Instagram, outras empresas e uma comunidade de desenvolvedores individuais. É utilizado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.

# Instalação do projeto

Antes de iniciar o projeto, é preciso realizar a instalação das dependências do Backend e Frontend.

A forma mais simplificada de realizar a instalação é executar o comando a baixo na *raiz* do projeto. Ele realizará de forma automatizada a instalação das dependências do *backend* e *frontend* ao mesmo tempo em apenas um comando:

```
npm run install
```

# Instalação individual

### Backend

O primeiro comando será para direcionar o prompt de comando até a pasta *backend*. Em seguida, o próximo comando realizará a instalação das dependências. O ultimo comando a realizar, deverá voltar para a pasta *raiz* :

```
cd ./backend
npm install
cd ../
```

##### Dependências

| Dependência | Versão  |
|-------------|---------|
| axios       | ^0.27.2 |
| body-parser | ^1.20.0 |
| express     | ^4.18.1 |

### Frontend

O primeiro comando será para direcionar o prompt de comando até a pasta *frontend*. Em seguida, o próximo comando realizará a instalação das dependências. O ultimo comando a realizar, deverá voltar para a pasta *raiz* :

```
cd ./frontend
npm install
cd ../
```

##### Dependências

| Dependência                 | Versão  |
|-----------------------------|---------|
| @testing-library/jest-dom   | ^5.16.5 |
| @testing-library/react      | ^13.4.0 |
| @testing-library/user-event | ^13.5.0 |
| react                       | ^18.2.0 |
| react-dom                   | ^18.2.0 |
| react-scripts               | 5.0.1   |
| web-vitals                  | ^2.1.4  |

# Teste solicitado pela Planetfone

### Objetivo:

Consumir 5 usuários da API https://jsonplaceholder.typicode.com/ e listar todos em ordem alfabética.

### Requisitos:

- [ ] PHP
- [X] HTML
- [X] JAVASCRIPT
- [X] CSS
  
### Diferenciais e análise:

- Estrutura do projeto, código organizado, comentado e limpo.
- Uso de alguma biblioteca frontend (React, Vue.js e etc).
- Uso de alguma biblioteca backend (Codeigniter, Zend e etc).
  
### Regras:

- **É obrigatório que seu backend seja em PHP ou em NodeJS**
- Frontend não deve consumir a API diretamente. Deve obter os dados pelo backend, tratá-los e fornecê-los para o front consumir.
- Exibir apenas os seguintes campos na tela:
  * id
  * name
  * username
  * email
- Documentar a instalação do projeto em um readme.md e publicá-lo em sua conta do Github.