document.addEventListener("DOMContentLoaded", () => {
    const player1CardArea = document.getElementById("player1-card");
    const player2CardArea = document.getElementById("player2-card");
    const player1DeckCount = document.getElementById("player1-deck-count");
    const player2DeckCount = document.getElementById("player2-deck-count");
    const drawCardButton = document.getElementById("draw-card-button");
    const roundResult = document.getElementById("round-result");

    let deck = [];
    let player1Deck = [];
    let player2Deck = [];

    async function initializeGame() {
        try {
            const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
            const data = await response.json();
            deck = data.cards;
            splitDeck();
            updateDeckCounts();
        } catch (error) {
            console.error("Error fetching deck:", error);
            roundResult.textContent = "Failed to load deck. Please refresh the page.";
        }
    }

    function splitDeck() {
        player1Deck = deck.slice(0, 26);
        player2Deck = deck.slice(26);
    }

    function updateDeckCounts() {
        player1DeckCount.textContent = player1Deck.length;
        player2DeckCount.textContent = player2Deck.length;
    }

    function drawCards() {
        if (player1Deck.length === 0 || player2Deck.length === 0) {
            roundResult.textContent = "Game Over! " + (player1Deck.length > 0 ? "Player 1 Wins!" : "Player 2 Wins!");
            drawCardButton.disabled = true;
            return;
        }

        const player1Card = player1Deck.shift();
        const player2Card = player2Deck.shift();

        displayCard(player1CardArea, player1Card);
        displayCard(player2CardArea, player2Card);

        const winner = compareCards(player1Card, player2Card);
        if (winner === 1) {
            roundResult.textContent = "Player 1 wins the round!";
            roundResult.style.color = "green";
            player1Deck.push(player1Card, player2Card);
        } else if (winner === 2) {
            roundResult.textContent = "Player 2 wins the round!";
            roundResult.style.color = "red";
            player2Deck.push(player1Card, player2Card);
        } else {
            roundResult.textContent = "It's a tie! Both cards go to the bottom.";
            roundResult.style.color = "#555555";
            player1Deck.push(player1Card);
            player2Deck.push(player2Card);
        }

        updateDeckCounts();
    }

    function displayCard(cardArea, card) {
        cardArea.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}" class="card-image">`;
    }

    function compareCards(player1Card, player2Card) {
        const cardValues = {
            "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
            "JACK": 11, "QUEEN": 12, "KING": 13, "ACE": 14
        };

        const card1Value = cardValues[player1Card.value];
        const card2Value = cardValues[player2Card.value];

        if (card1Value > card2Value) return 1;
        if (card2Value > card1Value) return 2;
        return 0;
    }

    drawCardButton.addEventListener("click", drawCards);

    initializeGame();
});
