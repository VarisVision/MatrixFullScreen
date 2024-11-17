const loadingText = document.getElementById('loading-text');
const loadingScreen = document.getElementById('loading-screen');
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const matrixText = document.getElementById('matrix-text');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const characterArray = characters.split('');
const columns = canvas.width / 20;
const drops = [];

let percentage = 0;

function simulateLoading() {
    if (percentage <= 100) {
        loadingText.textContent = `Loading... ${percentage}%`;
        percentage += 7;
        setTimeout(simulateLoading, 100);
    } else {
        showMatrixEffect();
    }
}

function showMatrixEffect() {
    loadingScreen.style.display = 'none';
    setTimeout(() => {
        matrixText.style.display = 'block';
    }, 1500);
    startMatrixEffect();
}

function startMatrixEffect() {
    for (let i = 0; i < columns; i++) {
        drops[i] = 0;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = '20px Courier New';

        for (let i = 0; i < columns; i++) {
            const text = characterArray[Math.floor(Math.random() * characterArray.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 30);
}

simulateLoading();