const { exec, execSync } = require("child_process");

//Verificar se o argumento "install" foi convocado
if(process.argv.includes("install")){
    //Execução instalação do aplicativo frontend
    let result = execSync("npm install", {cwd: "./frontend"}).toString();
    console.log(result);

    //Execução instalação do aplicativo backend
    result = execSync("npm install", {cwd: "./backend"}).toString();
    console.log(result);
}else{
    //Iniciar execução das aplicações se caso o argumento "install" não for convocado
    //Execução do aplicativo frontend
    exec("npm start", {cwd: "./frontend"}, (error, stdout, stderr) => {
        if(error){
            console.log(`error: ${error.message}`);
            return;
        }

        if(stderr){
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(stdout);
    });

    //Execução do aplicativo backend
    exec("npm start", {cwd: "./backend"}, (error, stdout, stderr) => {
        if(error){
            console.log(`error: ${error.message}`);
            return;
        }

        if(stderr){
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(stdout);
    });
}