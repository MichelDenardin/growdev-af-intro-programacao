
let btnEntrar = document.querySelector("#btn-login-entrar");

btnEntrar.addEventListener('click', (evento) =>{
    evento.preventDefault();
    autenticar();
})


function autenticar(){
    let inputEmail = document.querySelector("#input-login-email");
    let inputSenha = document.querySelector("#input-login-senha");
    
    let email = inputEmail.value;
    let senha = inputSenha.value;

    let problemas = false;

    let usuarioEncontrado = false;

    if(inputEmail.value === '' || inputSenha.value === ''){
        if(inputEmail.value === ''){
            inputEmail.setAttribute("style", "border: rgb(173, 68, 109) 2px solid; filter: drop-shadow(0 0 3px rgba(173, 68, 109, 1)")
            problemas = true;
        }
        if(inputSenha.value === ''){
            inputSenha.setAttribute("style", "border: rgb(173, 68, 109) 2px solid; filter: drop-shadow(0 0 3px rgba(173, 68, 109, 1)")
            problemas = true;
        }
    }

    if (problemas){
        alert("Login e senha são campos obrigatórios")
    }
    
    let usuario = {
        Email: '',
        Senha: ''    
    }

    const usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [];

    if(inputEmail.value !== '' && inputSenha.value !== ''){

        if((Object.keys(usuariosLS).length == 0)){
            alert("Usuário ou senha inválidos")
        
        }else{ 
            usuariosLS.forEach(elemento => {
                if(elemento.Email === email && elemento.Senha === senha){
                    usuario = {
                        Email: email,
                        Senha: senha
                    };
                    usuarioEncontrado = true;
                }else{                
                    problemas = true;
                }
            })
        }
        
        if(usuarioEncontrado == true){
            window.location.href = 'home.html'
            sessionStorage.setItem('logado', usuario.Email)
        }
        else if(problemas == true){
            alert('Usuário ou senha inválidos');
        }
    }
}
