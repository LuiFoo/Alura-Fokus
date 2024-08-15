// Criações de Variaveis
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagemBt = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPause = document.querySelector('#start-pause');
const iniciarPausarBotao = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;

let intervaloId = null;

const musicaInput = document.querySelector('#alternar-musica');

const imgPausaIniciar = document.querySelector('.app__card-primary-butto-icon');

// Audios
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaFinal = new Audio('./sons/beep.mp3');
const musicaPausa = new Audio('./sons/pause.mp3');
const musicaComecar = new Audio('./sons/play.wav');

musica.loop = true;

// Refaturação do código em Alterações abaixo.
function alterarContexto(contexto) {
    mostrarTempo()

    // Remover a Class "active" dos itens da Array
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })

    // Refaturação em si
    html.setAttribute('data-contexto', contexto);
    imagemBt.setAttribute('src', `./imagens/${contexto}.png`);

    // Adicionar o texto diferente no HTML
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;

        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
            break;
    
        default:
            break;
    }
}

musicaInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

// Alterar Data contexto e Imagem ao clique em "Foco"
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

// Alterar Data contexto e Imagem ao clique em "Descanso Curto"
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

// Alterar Data contexto e Imagem ao clique em "Descanso Longo"
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        iniciarPausarBotao.textContent = 'Começar';
        imgPausaIniciar.setAttribute('src', './imagens/play_arrow.png');
        musicaFinal.play();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        iniciarPausarBotao.textContent = 'Começar';
        imgPausaIniciar.setAttribute('src', './imagens/play_arrow.png');
        zerar();
        musicaPausa.play();
        return;
    }
    musicaComecar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarPausarBotao.textContent = 'pausar';
    imgPausaIniciar.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();