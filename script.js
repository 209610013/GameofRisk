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

    const currentPlayerName = currentPlayer === 1 ? 'Player 1' : 'Player 2';
    const logMessage = `${currentPlayerName} drew ${attack.description}.`;
    logAction(logMessage);

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
        
        const currentPlayerName = currentPlayer === 1 ? 'Player 1' : 'Player 2';
        const logMessage = `${currentPlayerName} drew ${defense.description}. Adjusted loss: ${adjustedLoss.toFixed(2)}.`;
        logAction(logMessage);
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

    // Check for a winner
    if (player1AssetValue <= 0 || player2AssetValue <= 0) {
        endGame();
    }
}

function endGame() {
    // Determine the winner
    let winner = player1AssetValue > player2AssetValue ? 'Player 1' : 'Player 2';

    // Log the end of the game and the winner
    const logMessage = `Game over! ${winner} wins with an asset value of ${winner === 'Player 1' ? player1AssetValue.toFixed(2) : player2AssetValue.toFixed(2)}.`;
    logAction(logMessage);

    // Update the scoreboard with final scores and the winner
    document.getElementById('final-score-player1').innerText = player1AssetValue.toFixed(2);
    document.getElementById('final-score-player2').innerText = player2AssetValue.toFixed(2);
    document.getElementById('winner').innerText = winner;

    // Show the scoreboard
    document.getElementById('scoreboard').classList.remove('hidden');
}

function logAction(message) {
    // Create a new list item element
    const listItem = document.createElement('li');
    // Set the text content of the list item to the provided message
    listItem.textContent = message;
    // Append the list item to the log list
    document.getElementById('log-list').appendChild(listItem);
}
