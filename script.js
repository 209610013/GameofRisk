const attackCards = [
    { description: "Phishing Attack", exposureFactor: 0.3 },
    { description: "SQL Injection", exposureFactor: 0.4 },
    { description: "DDoS Attack", exposureFactor: 0.5 },
    // Add more attack scenarios as needed
];

const defenseCards = [
    { description: "Anti-Phishing Training", effectiveness: 0.7 },
    { description: "WAF (Web Application Firewall)", effectiveness: 0.6 },
    { description: "DDoS Mitigation Service", effectiveness: 0.5 },
    // Add more defense strategies as needed
];

let player1AssetValue = 1000;
let player2AssetValue = 1000;
let currentPlayer = 1;

document.getElementById('draw-attack').addEventListener('click', drawAttack);
document.getElementById('draw-defense').addEventListener('click', drawDefense);
document.getElementById('next-turn').addEventListener('click', nextTurn);

function drawAttack() {
    const attack = attackCards[Math.floor(Math.random() * attackCards.length)];
    const currentAssetValue = currentPlayer === 1 ? player1AssetValue : player2AssetValue;
    const sle = currentAssetValue * attack.exposureFactor;

    document.getElementById('attack-description').innerText = attack.description;
    document.getElementById('exposure-factor').innerText = attack.exposureFactor;
    document.getElementById('sle').innerText = sle;

    document.getElementById('attack-card').classList.remove('hidden');
    document.getElementById('draw-defense').classList.remove('hidden');
    document.getElementById('draw-attack').classList.add('hidden');
}

function drawDefense() {
    const defense = defenseCards[Math.floor(Math.random() * defenseCards.length)];
    const attackExposureFactor = parseFloat(document.getElementById('exposure-factor').innerText);
    const adjustedExposureFactor = attackExposureFactor * (1 - defense.effectiveness);
    const currentAssetValue = currentPlayer === 1 ? player1AssetValue : player2AssetValue;
    const adjustedLoss = currentAssetValue * adjustedExposureFactor;

    if (currentPlayer === 1) {
        player1AssetValue -= adjustedLoss;
        document.getElementById('asset-value-player1').innerText = player1AssetValue.toFixed(2);
    } else {
        player2AssetValue -= adjustedLoss;
        document.getElementById('asset-value-player2').innerText = player2AssetValue.toFixed(2);
    }

    document.getElementById('defense-description').innerText = defense.description;
    document.getElementById('adjusted-exposure-factor').innerText = adjustedExposureFactor.toFixed(2);
    document.getElementById('adjusted-loss').innerText = adjustedLoss.toFixed(2);

    document.getElementById('defense-card').classList.remove('hidden');
    document.getElementById('next-turn').classList.remove('hidden');
    document.getElementById('draw-defense').classList.add('hidden');
}

function nextTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('current-turn').innerText = `Player ${currentPlayer}`;
    document.getElementById('attack-card').classList.add('hidden');
    document.getElementById('defense-card').classList.add('hidden');
    document.getElementById('next-turn').classList.add('hidden');
    document.getElementById('draw-attack').classList.remove('hidden');
}

