//FirestoreObject, uma herança de classe responsável em formalizar os dados em um objeto filho

export default class FirestoreObject {
    /**
     * Representa um objeto que tem como origem a base de dados.
     * @param {String} path Caminho de acesso no firestore para o objeto.
     */
    constructor(path) {
        this.criarAtributoReferencial("path", false);
        this.path = path;
    }
    /**
     *
     * @param {String} key Chave da propriedade invisível.
     */
    addInvisibleProperty(key) {
        Object.defineProperty(this, key, {
            writable: true,
            configurable: true,
            enumerable: false,
        });
    }
    
    corrigirReferencia(value) {
        if (typeof value === "string") {
            if (value[0] === "/") {
                value = value.substring(1, value.length);
            }
            if (value[value.length - 1] === "/") {
                value = value.substring(0, value.length - 1);
            }
        }
        return value;
    }
    /**
     *
     * @param {String} nome
     * @param {boolean} enumeravel
     */
    criarAtributoReferencial(nome, enumeravel) {
        let atributo;
        Object.defineProperty(this, nome, {
            configurable: true,
            enumerable: enumeravel ? true : false,
            get: () => {
                return atributo;
            },
            set: (value) => {
                atributo = this.corrigirReferencia(value);
            },
        });
    }
    /**
     * Transforma o objeto em um objeto simples, para que o mesmo seja inserido no banco de dados.
     * @param {Object} target Realiza o processo de transformação em JSON sobre o objeto definido.
     * @returns {Object}
     */
    toJson(target) {
        target = target instanceof Object ? target : this;
        let props = Object.getOwnPropertyNames(target);
        let simpleObject = JSON.parse(JSON.stringify(target));
        for (let i = 0; i < props.length; i++) {
            let prop = props[i];
            if (target[prop] instanceof Date) {
                if (target[prop].getTime()) {
                    simpleObject[prop] = target[prop].getTime();
                }
            } else if (target[prop] instanceof FirestoreObject) {
                simpleObject[prop] = target[prop].toJson();
            } else if (target[prop] instanceof Array) {
                for (let j = 0; j < target[prop].length; j++) {
                    let value = target[prop][j];
                    if (value instanceof Date) {
                        if (value.getTime()) {
                            simpleObject[prop][j] = value.getTime();
                        }
                    } else if (value instanceof FirestoreObject) {
                        simpleObject[prop][j] = value.toJson();
                    } else if (value instanceof Object) {
                        simpleObject[prop][j] = this.toJson(value);
                    }
                }
            } else if (target[prop] instanceof Object) {
                simpleObject[prop] = this.toJson(target[prop]);
            }
        }
        return simpleObject;
    }
    /**
     * Transforma um objeto genérico extraído do banco de dados em um FirestoreObject.
     * @param {String} path Caminho de acesso do Objeto no banco de dados.
     * @param {Object} objetoGenerico Objeto a ter valores capturados.
     */
    parse(path, objetoGenerico) {
        this.path = path;
        objetoGenerico =
            typeof objetoGenerico === "object" ? objetoGenerico : {};

        const assignJSON = (obj1, obj2) => {
            obj1 = typeof obj1 === "object" ? obj1 : {};
            obj2 = typeof obj2 === "object" ? obj2 : {};

            let props =
                obj2 instanceof Array
                    ? Object.keys(obj2)
                    : Object.getOwnPropertyNames(obj2);

            for (let i = 0; i < props.length; i++) {
                if (obj1.hasOwnProperty(props[i]) || obj1 instanceof Array) {
                    if (obj2[props[i]] !== undefined) {
                        if (obj1[props[i]] instanceof Date) {
                            obj1[props[i]] = new Date(obj2[props[i]]);
                        } else if (obj1[props[i]] instanceof FirestoreObject) {
                            obj1[props[i]] = obj1[props[i]].parse(
                                null,
                                obj2[props[i]]
                            );
                        } else if (
                            obj1[props[i]] instanceof Array ||
                            obj1[props[i]] instanceof Object
                        ) {
                            obj1[props[i]] = assignJSON(
                                obj1[props[i]],
                                obj2[props[i]]
                            );
                        } else {
                            obj1[props[i]] = obj2[props[i]];
                        }
                    }
                }
            }

            return obj1;
        };

        assignJSON(this, objetoGenerico);

        return this;
    }
}
