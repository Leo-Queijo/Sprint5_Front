const areas = {
    neurologia: { fila: 6, tempo: 18 },
    enfermaria: { fila: 4, tempo: 12 },
    pediatria: { fila: 8, tempo: 24 }
};

let areaAtual = 'neurologia';
let posicao = null;
let tempo = null;
let intervalo = null;
let filaAtiva = false;

const posicaoEl = document.getElementById('queue-position');
const tempoEl = document.getElementById('estimated-time');
const historyEl = document.getElementById('queue-history');
const alertaEl = document.getElementById('alerta');
const beep = document.getElementById('beep-sound');
const areaSelect = document.getElementById('area-select');
const sairBtn = document.getElementById('sair-fila');

areaSelect.addEventListener('change', () => {
    if (!filaAtiva) {
        areaAtual = areaSelect.value;
        resetarFila();
    } else {
        alert('Você já está em uma fila. Saia dela para trocar de área.');
        areaSelect.value = areaAtual;
    }
});

document.getElementById('fila-form').addEventListener('submit', e => {
    e.preventDefault();

    if (filaAtiva) {
        alert('Você já está em uma fila. Saia dela antes de entrar em outra.');
        return;
    }

    const nome = document.getElementById('nome').value.trim();
    const carteirinha = document.getElementById('carteirinha').value.trim();

    if (!nome || !carteirinha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const info = areas[areaAtual];
    posicao = info.fila;
    tempo = info.tempo;
    filaAtiva = true;

    adicionarAoHistorico(areaAtual, posicao, nome, carteirinha);
    iniciarContagem();
    sairBtn.classList.remove('hidden');
});

function iniciarContagem() {
    atualizarExibicao();
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        if (posicao > 0) {
            posicao--;
            tempo -= Math.floor(areas[areaAtual].tempo / areas[areaAtual].fila);
            atualizarExibicao();
        } else {
            pararContagem();
            alertaEl.classList.remove('hidden');
            beep.play();
        }
    }, 10000);
}

function atualizarExibicao() {
    posicaoEl.textContent = `#${posicao}`;
    tempoEl.textContent = `${tempo} Minutos`;
}

function pararContagem() {
    clearInterval(intervalo);
    intervalo = null;
    filaAtiva = false;
    sairBtn.classList.add('hidden');
}

function resetarFila() {
    posicaoEl.textContent = '--';
    tempoEl.textContent = '--';
    alertaEl.classList.add('hidden');
}

function adicionarAoHistorico(area, pos, nome, carteirinha) {
    const li = document.createElement('li');
    li.className = 'border-b pb-2 text-sm';
    li.innerHTML = `
        <p><strong>${nome}</strong> (Carteirinha: ${carteirinha})</p>
        <p><span class="text-[#3c9ecf] font-semibold capitalize">${area}</span> - Posição Inicial: #${pos}</p>
    `;
    historyEl.appendChild(li);
}

// Sair da Fila
sairBtn.addEventListener('click', () => {
    if (!filaAtiva) return;

    const confirmar = confirm('Tem certeza de que deseja sair da fila?');
    if (confirmar) {
        pararContagem();
        resetarFila();
        filaAtiva = false;
        posicao = null;
        tempo = null;
        areaAtual = areaSelect.value;
        alert('Você saiu da fila com sucesso.');
    }
});
