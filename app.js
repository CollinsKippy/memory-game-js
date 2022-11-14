/**
 * Card Class
 * @description represents card on page
 */
class Card {
  constructor(name, isSelected = false) {
    this.name = name;
    this.isSelected = isSelected;
  }
}

// UI Variables
const grid = document.querySelector('#grid');
const cardList = [
  new Card('A'),
  new Card('A'),
  new Card('B'),
  new Card('B'),
  new Card('C'),
  new Card('C'),
  new Card('D'),
  new Card('D'),
  new Card('E'),
  new Card('E'),
  new Card('F'),
  new Card('F'),
];

cardList.sort(() => 0.5 - Math.random()); // randomize the cards :)

const selectedCardNames = []; // check for matches
const selectedCardIds = [];
const successfulCards = []; // should be a pair and removed from deck
let timeout;

/**
 * DOM Loaded Event
 */
document.addEventListener('DOMContentLoaded', (event) => {
  console.log({ cardList });

  cardList.forEach((card, index) => {
    const span = document.createElement('span');
    span.classList.add('card');
    span.textContent = card.name;
    span.style.color = '#efefef'; // same color as grid;
    span.setAttribute('data-id', index);

    span.addEventListener('click', flipCard);

    grid.appendChild(span);
  });
});

/**
 * Check whether selected cards match
 */
function checkForMatch() {
  const cardSpans = document.querySelectorAll('.card');
  const id1 = selectedCardIds[0];
  const id2 = selectedCardIds[1];
  const cardSpan1 = cardSpans[id1];
  const cardSpan2 = cardSpans[id2];
  const card1 = cardList[id1];
  const card2 = cardList[id2];

  if (selectedCardNames[0] === selectedCardNames[1]) {
    cardSpan1.style.backgroundColor = 'teal';
    cardSpan1.style.color = 'white';
    card1.isSelected = true;
    cardSpan2.style.backgroundColor = 'teal';
    cardSpan2.style.color = 'white';
    card2.isSelected = true;

    alert('You have guessed correctly!');
  } else {
    alert('Sorry. Try again please.');
    // reset the cards
    cardSpan1.classList.remove('selectedCardBgColor');
    cardSpan2.classList.remove('selectedCardBgColor');
    card1.isSelected = false;
    card2.isSelected = false;
  }

  clearTimeout(timeout);
}

/**
 * Callback for Clicked Card Event
 */
function flipCard(e) {
  const span = e.target;
  const cardId = span.getAttribute('data-id');
  span.removeEventListener('click', flipCard);

  const chosenCard = cardList[cardId];
  if (chosenCard.isSelected) {
    alert('You have chosen this card already.');
    return;
  }
  span.classList.add('selectedCardBgColor');

  selectedCardIds.push(parseInt(cardId));
  selectedCardNames.push(cardList[cardId].name);

  if (selectedCardNames.length === 2) {
    timeout = setTimeout(checkForMatch, 600);
  }
}
