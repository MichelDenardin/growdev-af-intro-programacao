// Mapear elementos do HTML
let cadastro = document.querySelector("#cadastro");
let inputEmail = document.getElementById("input-email");
let inputSenha = document.getElementById("input-senha");
let inputRepeteSenha = document.getElementById("input-repetir-senha");
let btn_Enviar = document.getElementById("btn-enviar");
let db_usuarios = [];
let regexMm = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
let regexCaracteres = /(?=.*[!@#$%^&*])/;

let emailvalido = false;
let senhaTamanho = false;
let senhaMm = false;
let senhaCaracteres = false;
let senhaIgual = false;
let notificacaoEmail = document.getElementById("notificacao-email");


let span_SenhasTam = document.getElementById("senha-tamanho");
let span_SenhasMm = document.getElementById("senha-maiusculas-minusculas");
let span_SenhasCaracteres = document.getElementById("senha-caracteres");

// Fazer um objeto com o que foi capturado dos inputs
function capturarObj(){
    return usuario = {
        Email : inputEmail.value,
        Senha: inputSenha.value
    }
}

// funcão salvar no banco de dados simulado:
function inserirUsuario(captura){
    const db_usuario = JSON.parse(localStorage.getItem('usuarios')) || [];
    analisar(db_usuario, captura)
}
    
function salvarLS(bancoDeDados){
    localStorage.setItem('usuarios',JSON.stringify(bancoDeDados))    
}

function analisar(bancoDeDados, captura){  
    let repetido = false
    console.log(bancoDeDados.length)
    if(bancoDeDados.length == 0){
        console.log("Salvando sem fazer análise")
        bancoDeDados.push(captura)
        salvarLS(bancoDeDados)
        alert("Usuário cadastrado com sucesso")
        window.location.href = "/login.html"
    }
    else{
        bancoDeDados.forEach(cadastro => {
            if(cadastro.Email == captura.Email){
                repetido = true
            }
        })
        if(repetido){
            alert("Email de usuário já registrado")
        }
        else{
            console.log("deveria ter feito a análise")
            bancoDeDados.push(captura)
            salvarLS(bancoDeDados)
            alert("Usuário cadastrado com sucesso")
            window.location.href = "/login.html"
        }
    }        
}
 

btn_Enviar.addEventListener("click", function(evento){
    console.log("me clicaram")
    evento.preventDefault();
    
    inserirUsuario(capturarObj())
})

// ------- Validação de e-mail e senha ------ //

function verificaEmail(){
    if(inputEmail.value.includes("@") && inputEmail.value.includes(".") && inputEmail.value.length > 5 && inputEmail.value[0] !== "@") {
        emailvalido = true;
        notificacaoEmail.innerHTML = "";
        notificacaoEmail.setAttribute("style", "display: none")
    }
    else if(inputEmail.value.length === 0){
        notificacaoEmail.innerHTML = `<p>ATENÇÃO: Este campo é obrigatório</p> <br />`
        notificacaoEmail.setAttribute("style", "display: flex")
        emailvalido = false;
    }
    else{
        notificacaoEmail.innerHTML = `<p>ATENÇÃO: Este não é um e-mail válido.</p> <br />`
        notificacaoEmail.setAttribute("style", "display: flex")
        emailvalido = false;
    }
}

function verificaSenha(){    
    if(inputSenha.value.length >= 8){
        span_SenhasTam.setAttribute("style", "display: inline")
        senhaTamanho = true
    }else{
        span_SenhasTam.setAttribute("style", "display: none")
        senhaTamanho = false
    }
    if (regexMm.test(inputSenha.value)){
        span_SenhasMm.setAttribute("style", "display: inline")
        senhaMm = true;
    }else{
        senhaMm = false;
        span_SenhasMm.setAttribute("style", "display: none")
    }
    if(regexCaracteres.test(inputSenha.value)){
        senhaCaracteres = true;
        span_SenhasCaracteres.setAttribute("style", "display: inline");
    }else{
        span_SenhasCaracteres.setAttribute("style", "display: none");
        senhaCaracteres = false;
    }
    habilitarBotao();
    
}

function confereSenha(){
    if(inputSenha.value === inputRepeteSenha.value){
        senhaIgual = true;
        inputSenha.setAttribute("style", "filter: drop-shadow(0 0 3px #40cf48)");
        inputRepeteSenha.setAttribute("style", "filter: drop-shadow(0 0 3px #40cf48)");

    }
    habilitarBotao();
}

function habilitarBotao(){
    if(senhaTamanho && senhaMm && senhaCaracteres && senhaIgual){
        btn_Enviar.disabled = false;
    }
}




inputEmail.addEventListener("focusout", verificaEmail);
inputSenha.addEventListener("keyup", verificaSenha);
inputRepeteSenha.addEventListener("keyup", confereSenha);