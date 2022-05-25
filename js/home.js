let botaoSalvar = document.getElementById("salvar");

const userMail = sessionStorage.getItem('logado');
if (userMail == null){
    alert("Acesso negado. Faça login para continuar");
    document.location.href="./login.html"
}

let btn_sair = document.getElementById("sair");

btn_sair.addEventListener('click', (event) => {
    event.preventDefault;
    sair();
})

function sair(){
    sessionStorage.clear();
    window.location.href = 'login.html';
}

function salvarLS(bancoDeDados){
    localStorage.setItem('recados', JSON.stringify(bancoDeDados))
}

function apagarEntrada(idDoElemento){        
    let body = document.querySelector("body");
    body.innerHTML += `
        <div id="div-modal-fundo">
            <div class="div-edicao-recados">
                <h1>Apagar recado</h1><br />
                <p>Tem certeza que deseja apagar essa entrada?</p>                
                <button class="botoes-edicao" onclick="confirmarApagar(${idDoElemento})" id="botao-Apagar">Apagar</button>
                <button class="botoes-edicao" onclick="edicoesCancelar()" id="botao-cancelar" >Cancelar</button>
            </div>
        </div>
    `  
}

function confirmarApagar(idDoElemento){
    let recadosLS = verificarLS();    
    recadosLS.splice(idDoElemento, 1);
    salvarLS(reorganizarIndices(recadosLS))
    document.location.reload(true);
}

function editarEntrada(idDoElemento){
    entradasLS = verificarLS()
    let descricaoAntiga = entradasLS[idDoElemento].Descrição;
    console.log(descricaoAntiga)
    let detalhamentoAntigo = entradasLS[idDoElemento].Detalhamento;
    let body = document.querySelector("body");
    body.innerHTML += `
        <div id="div-modal-fundo">
            <div class="div-edicao-recados">
                <h1>Editar recado</h1><br />
                <label name="editar-descricao" class="label-edicao">Nova Descrição</label>
                <input type="text" name="editar-descricao"  id="editar-descricao" value="${descricaoAntiga}"></input><br/>
                <label name="editar-Detalhamento" class="label-edicao">Novo Detalhamento</label>
                <input type="text" id="editar-detalhamento" value="${detalhamentoAntigo}"></input><br/>
                <button class="botoes-edicao" onclick="edicoesSalvar(${idDoElemento})" id="botao-salvar">Salvar</button>
                <button class="botoes-edicao" onclick="edicoesCancelar()" id="botao-cancelar" >Cancelar</button>
            </div>
        </div>
    `
}

function edicoesCancelar(){
    let modal = document.getElementById("div-modal-fundo")
    let botaoCancelar = document.getElementById("botao-cancelar");    
    document.location.reload(true);    
}

function reorganizarIndices(objeto){
    let contador = 0;
    objeto.forEach(recado => {
        recado.Id = contador;
        contador++;        
    });
    return objeto;    
}

function edicoesSalvar(idPostagem){
    let descricaoEditada = document.getElementById("editar-descricao").value;    
    let detalhamentoEditado = document.getElementById("editar-detalhamento").value;
    let recadosLS = verificarLS();
    recadosLS[idPostagem].Descrição = descricaoEditada;
    recadosLS[idPostagem].Detalhamento = detalhamentoEditado;  
    salvarLS(recadosLS);  
    document.location.reload()
}


function carregarRecados(){
    criarTabelas(verificarLS());
}

function btnSalvar(){
    let conteudoLS = verificarLS();
    capturarCampos(conteudoLS); 
}

function verificarLS(){    
    const entradasLS = JSON.parse(localStorage.getItem('recados')) || [];
    const entradasDoUsuario = []
    for(entrada of entradasLS){
        if(entrada.Autor === userMail){
            entradasDoUsuario.push(entrada);
        }
    }
    console.log(entradasLS)
    return entradasDoUsuario;   
}

function capturarCampos(entradasTotais){    
    let descricao = document.getElementById("input-descricao").value;
    let detalhamento = document.getElementById("input-detalhamento").value;
    let contador = 0;
    if(Object.keys(entradasTotais).length === 0){
        contador = 0;
    }else{
        contador = Object.keys(entradasTotais).length;
    }  
    let entrada = {        
        Autor: userMail,
        Id : contador,
        Descrição: descricao,
        Detalhamento: detalhamento
    };    
    entradasTotais.push(entrada);

    if(contador === 0){        
        criarTabelas(entradasTotais)
        salvarLS(entradasTotais)        
    }else{
        let arrayEntrada = [entrada];
        criarTabelas(arrayEntrada)
        salvarLS(entradasTotais)        
    }
    
}

function criarTabelas(objeto){
    let sectionTabelas = document.querySelector(".section-tabelas");
    for(elemento of objeto){
        sectionTabelas.innerHTML += `
            <div class="linha-mae">
                <div class="div-numeracao"><p>${elemento.Id}</p></div>
                <div class="div-descricao"><p>${elemento.Descrição}</p></div>
                <div class="div-detalhamento"><p>${elemento.Detalhamento}</p></div>
                <div class="div-acao">
                    <button class="botao-editar" onclick="editarEntrada(${elemento.Id})">Editar</button>
                    <button class="botao-apagar" onclick="apagarEntrada(${elemento.Id})">Apagar</button>
                </div>
            </div>
        `    
    }
}

function zerarInputs(){
    let descricao = document.getElementById("input-descricao");
    let detalhamento = document.getElementById("input-detalhamento");
    descricao.value = ''
    detalhamento.value = ''
}

carregarRecados()

botaoSalvar.addEventListener("click", (event) => {
    event.preventDefault();
    btnSalvar();
    zerarInputs();
})


