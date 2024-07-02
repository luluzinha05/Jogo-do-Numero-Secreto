let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exbirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(tag, texto) {
    exbirTextoNaTela('h1', 'Jogo do número secreto');
    exbirTextoNaTela('p', 'Escolha um número entro 1 e 10:');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exbirTextoNaTela('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exbirTextoNaTela('p' , mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exbirTextoNaTela('p', 'O número secreto é maior');
        } else {
            exbirTextoNaTela('p', 'O número secreto é menor');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];
    }
    if (listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(params) {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;

    exibirMensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);
}