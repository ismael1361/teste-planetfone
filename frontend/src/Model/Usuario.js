import FirestoreObject from "./FirestoreObject";

//Usuario, modelo de objeto de dados estendida de FirestoreObject, responsável em formalizar os dados em um objeto

export default class Usuario extends FirestoreObject{
    constructor(path, id, name, username, email){
        super(path);
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}