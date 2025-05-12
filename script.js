const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerStand = false;
let gains = 0;

const dealerCardsDiv = document.getElementById('dealer-cards');
const playerCardsDiv = document.getElementById('player-cards');
const messageDiv = document.getElementById('message');

document.getElementById('deal').onclick = startGame;
document.getElementById('hit').onclick = () => hit(playerHand, playerCardsDiv);
document.getElementById('stand').onclick = () => {
  playerStand = true;
  dealerTurn();
};
document.getElementById('double').onclick = () => {
  
  hit(playerHand, playerCardsDiv);
  playerStand = true;
  dealerTurn();

};
//document.getElementById('split').onclick = () => splitCards(playerHand, playerCardsDiv);

function createDeck() {

  deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  deck.sort(() => Math.random() - 0.5); //shuffle

}

function drawCard(hand, displayDiv) {

  const card = deck.pop();
  hand.push(card);
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.textContent = `${card.rank}${card.suit}`;
  displayDiv.appendChild(cardDiv);

}

function calculateTotal(hand) {
  let total = 0;
  let aces = 0;

  for (let card of hand) {

    if (['J', 'Q', 'K'].includes(card.rank)) total += 10;

    else if (card.rank === 'A') {

      total += 11;
      aces += 1;
    } else {

      total += parseInt(card.rank);

    }

  }

  //handles aces
  while (total > 21 && aces > 0) {

    total -= 10;
    aces -= 1;

  }

  return total;
}

function startGame() {

  playerHand = [];
  dealerHand = [];
  playerStand = false;

  createDeck();

  dealerCardsDiv.innerHTML = '';
  playerCardsDiv.innerHTML = '';
  messageDiv.textContent = '';

  drawCard(playerHand, playerCardsDiv);
  drawCard(dealerHand, dealerCardsDiv);
  drawCard(playerHand, playerCardsDiv);
  drawCard(dealerHand, dealerCardsDiv);

  document.getElementById('hit').disabled = false;
  document.getElementById('stand').disabled = false;
  document.getElementById('double').disabled = false;
  document.getElementById('split').disabled = false;
  
}

function hit(hand, displayDiv) {

  document.getElementById('double').disabled = true;
  document.getElementById('split').disabled = true;

  drawCard(hand, displayDiv);

  const total = calculateTotal(playerHand);

  if (total > 21) {
    endGame('You busted! Dealer wins.');
  }

}

function dealerTurn() {

  document.getElementById('hit').disabled = true;
  document.getElementById('stand').disabled = true;
  document.getElementById('double').disabled = true;
  document.getElementById('split').disabled = true;

  while (calculateTotal(dealerHand) < 17) {

    drawCard(dealerHand, dealerCardsDiv);

  }

  const playerTotal = calculateTotal(playerHand);
  const dealerTotal = calculateTotal(dealerHand);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {

    endGame('You win!');

  } else if (playerTotal < dealerTotal) {

    endGame('Dealer wins.');

  } else {

    endGame("It's a tie!");
  }
}

function endGame(message) {

  messageDiv.textContent = message;
  document.getElementById('hit').disabled = true;
  document.getElementById('stand').disabled = true;
  document.getElementById('double').disabled = true;
  document.getElementById('split').disabled = true;

}
