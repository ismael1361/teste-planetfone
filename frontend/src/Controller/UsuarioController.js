import { Usuario } from "../Model"
const API_URL = "http://localhost:8000";

//UsuarioController, uma classe com funções estáticas responsável pela operação e processamento de dados
export default class UsuarioController{

    /**
     * Função estática que busca na API todos os usuários
     * @returns {Promise}
     */
    static getTodosUsuarios(){
        //Uma Promise responsável em respondem após uma tarefa ser concluida
        return new Promise((resolve, reject)=>{
            //Requisita uma lista de dados dos usuários na API 
            fetch(`${API_URL}/usuarios`)
            //Caso a requisição for realizada com sucesso, converter a resposta da API em formato JSON
            .then(response => response.json())
            //Após a conversão para o formato JSON for concluída, transferir os dados da lista para um objeto Usuario e responder a Promise
            .then(usuarios =>{
                //Mapeando a lista de dados de usuários e criando um objeto com seus dados
                usuarios = usuarios.map(usuario => {
                    //Criando e formulando os dados em um objeto
                    return new Usuario().parse(null, usuario);
                });

                //Responder a Promise com uma lista de objetos Usuario
                resolve(usuarios);
            })
            //Se caso o tramite da requisição ou tarefa interrompida, responder a Promise com erro
            .catch(reject);
        });
    }

}