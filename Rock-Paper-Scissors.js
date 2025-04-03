const shows = document.querySelector('.shows');
const res = document.querySelector('.res');
const Status = document.querySelector('.status');
// Object for Score
let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        tie: 0
    };
}

// Display data into console page
// console.log(JSON.parse(localStorage.getItem('score')));

//Auto-Play 
const AutoPlay = document.querySelector('.js-autoPlay-button');
AutoPlay.addEventListener('click',()=>{
    autoPlay();
});
let isAutoplay = false;
let intervalID;
function autoPlay()
{
   if(!isAutoplay)
    {
    intervalID = setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
    },1000);
    isAutoplay = true;    
   }else{
    clearInterval(intervalID);
    isAutoplay = false;
   }
}

// Check Who Win ?

//Using addEventListener instead of Onclick
const rockButton = document.querySelector('.js-rock-button');
rockButton.addEventListener('click',()=>{
    playGame('rock');
});

const paperButton = document.querySelector('.js-paper-button');
paperButton.addEventListener('click',()=>{
    playGame('paper');
});

const scissorsButton = document.querySelector('.js-scissors-button');
scissorsButton.addEventListener('click',()=>{
    playGame('scissors');
});

// Clicking keyboard button like 'r','p','s' then play rock-paper-scissors.
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
        playGame('rock');
    }
    else if(event.key === 'p'){
        playGame('paper');
    }else if(event.key === 's'){
        playGame('scissors');
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove == 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose.';
        } else if (computerMove === 'paper') {
            result = 'You Win!';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }
    if (playerMove == 'rock') {
        if (computerMove === 'scissors') {
            result = 'You Win!';
        } else if (computerMove == 'paper') {
            result = 'You Lose.';
        } else if (computerMove === 'rock') {
            result = 'Tie.';
        }
    }

    if (playerMove == 'paper') {
        if (computerMove === 'scissors') {
            result = 'You Lose.';
        } else if (computerMove == 'rock') {
            result = 'You Win!';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        }
    }

    //Show the Status What user select and Computer Select
    Status.innerHTML = `You Select:
        <img src="images/${playerMove}-emoji.png" class="move-icon">
        ,Computer Select:
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        `;

    // Update Score
    if (result === 'You Win!') {
        score.wins = score.wins + 1;
    }
    else if (result === 'You Lose.') {
        score.losses = score.losses + 1;
    } else if (result === 'Tie.') {
        score.tie = score.tie + 1;
    }

    // Storing data into localStorage
    localStorage.setItem('score', JSON.stringify(score));

    //Display the Score in display
    res.innerText = `Match: ${result}`;
    shows.innerText = `Wins:${score.wins},Lose:${score.losses},Tie:${score.tie}`;

}

// Computer Picked
function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

//Converting Onclick to addEventListener
const resetButton = document.querySelector('.js-reset-button');
resetButton.addEventListener('click',()=>{
    resetScore();
});

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.tie = 0;
    // Removing Data from localStorage
    localStorage.removeItem('score');
    shows.innerText = `Wins:${score.wins},Lose:${score.losses},Tie:${score.tie}`;
}