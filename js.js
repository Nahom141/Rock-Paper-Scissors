

const choices = document.querySelectorAll('.choice');
const choicesContainer = document.querySelector('.choices');
const resultContainer = document.querySelector('.result');
const picked = document.querySelector('.picked');
const outcomeText = document.getElementById('outcome-text');
const playAgainBtn = document.getElementById('play-again');
const scoreSpan = document.querySelector('.score-box span');
const rules = document.querySelector('.rules-btn');
const tri = document.querySelector('.triangle');
const outcomeContainer = document.querySelector('.outcome');

tri.classList.remove('hidden');

let score = 0;
const CHOICES = ['rock', 'paper', 'scissors'];

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const playerChoice = choice.getAttribute('data-choice');
    const houseChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

    showResult(playerChoice, houseChoice);
    tri.classList.add('hidden');
  });
});

function showResult(player, house) {
 
  choicesContainer.classList.add('hidden');
  resultContainer.classList.add('show');


  picked.innerHTML = '';

  
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('picked-container');
  
  const playerLabel = document.createElement('p');
  playerLabel.textContent = 'You Picked'.toUpperCase();
  playerLabel.classList.add('picked-label');
  
  const playerIcon = document.createElement('div');
  playerIcon.classList.add('icon', player);
  playerIcon.innerHTML = `<img src="images/icon-${player}.svg" alt="${player}" />`;
  
  playerContainer.appendChild(playerLabel);
  playerContainer.appendChild(playerIcon);
  
  
  const outcomeMiddle = document.createElement('div');
  outcomeMiddle.classList.add('outcome-middle', 'hidden'); 
  
  const outcomeTextElem = document.createElement('h2');
  outcomeTextElem.id = 'outcome-text';
  outcomeTextElem.textContent = ''; 
  
  const playAgainBtnClone = playAgainBtn.cloneNode(true); 
  playAgainBtnClone.addEventListener('click', () => {
    resultContainer.classList.remove('show');
    choicesContainer.classList.remove('hidden');
    tri.classList.remove('hidden');
    outcomeMiddle.classList.add('hidden'); 
  });
  
  outcomeMiddle.appendChild(outcomeTextElem);
  outcomeMiddle.appendChild(playAgainBtnClone);
  
 
  const houseContainer = document.createElement('div');
  houseContainer.classList.add('picked-container');
  
  const houseLabel = document.createElement('p');
  houseLabel.textContent = 'House Picked'.toUpperCase();
  houseLabel.classList.add('picked-label');
  
  const placeholder = document.createElement('div');
  placeholder.classList.add('icon', 'placeholder');
  
  houseContainer.appendChild(houseLabel)
  houseContainer.appendChild(placeholder)
  
 
  picked.appendChild(playerContainer).style.transform = 'scale(1.2)';
  picked.appendChild(outcomeMiddle).style.transform = 'scale(1)';
  picked.appendChild(houseContainer).style.transform = 'scale(1.2)';
  

 
  let result;
  let houseIcon;
  

  setTimeout(() => {
    houseContainer.removeChild(placeholder);
     houseIcon = document.createElement('div');
    houseIcon.classList.add('icon', house);
    houseIcon.innerHTML = `<img src="images/icon-${house}.svg" alt="${house}" />`;
    houseContainer.appendChild(houseIcon);
  
    houseIcon.style.opacity = '0';
    setTimeout(() => {
        houseIcon.style.transition = 'opacity 0.2s ease-in';
        houseIcon.style.opacity = '1';
    }, 10);

    result = getResult(player, house);
  }, 900);
  
  setTimeout(() => {
    if (result === 'win') {
      outcomeTextElem.textContent = 'YOU WIN';
      score++;
      playerIcon.classList.add('winner');
    } else if (result === 'lose') {
      outcomeTextElem.textContent = 'YOU LOSE';
      score = Math.max(0, score - 1);
      houseIcon.classList.add('winner');
    } else {
      outcomeTextElem.textContent = 'DRAW';
    }
  
    scoreSpan.textContent = score;
  
    
    outcomeMiddle.classList.remove('hidden');
    outcomeMiddle.style.opacity = '0';
    setTimeout(() => {
        outcomeMiddle.style.transition = 'opacity 0.5s ease';
        outcomeMiddle.style.opacity = '1';
    }, 10);
  }, 1600);
  
}

function getResult(player, house) {
  if (player === house) return 'draw';
  if (
    (player === 'rock' && house === 'scissors') ||
    (player === 'scissors' && house === 'paper') ||
    (player === 'paper' && house === 'rock')
  ) {
    return 'win';
  }
  return 'lose';
}


rules.addEventListener('click', function () {
  document.querySelector('.rule-modal').classList.remove('hidden');
  
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('.rule-modal').classList.add('hidden');
});