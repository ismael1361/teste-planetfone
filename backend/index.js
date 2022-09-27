//Criando aplicativo de nível superior exportada pelo express
const express = require('express');
const app = express();

const cors = require('cors');

//Importanto propriedade Axios para realizar requisições de APIs.
const axios = require('axios').default;

//Middleware de análise do corpo do Node.js.
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//Criando um solicitação HTTP GET para o caminho especificado com as funções de retorno de chamada especificadas.
app.get('/usuarios', (req, res) => {

    //Realiza uma requisição de consulta a API com uma lista de usuários
    axios.get('https://jsonplaceholder.typicode.com/users', {
        //Especificando o tipo de resposta da requisição como JSON e formato utf8
        responseType: 'json',
        responseEncoding: 'utf8'
    }).then(({data})=>{

        //Cortando uma lista Array para um limite de cinco itens da lista
        data = data.slice(0, 5);

        //Mapeia a lista adquirindo valores de cada item específica, como: id, name, username e email
        data = data.map(({id, name, username, email})=>{
            return {id, name, username, email};
        });

        //Ordenar a lista em ordem alfabética
        data.sort((a, b)=>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1;
            }
            return 0;
        });

        //Respondendo o resultado da lista a solicitação HTTP GET
        res.json(data);
    }).catch((error)=>{
        //Respondendo solicitação HTTP GET como falha interna da requisição
        res.status(500).json({ error: error });
    });
});

//Vinculando uma chamada de conexões em um host e porta especificados: http://localhost:8000/
app.listen(8000);