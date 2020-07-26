const inputs = document.querySelectorAll('input');
const display = document.querySelector('.display');
const header = document.querySelector('.header');
let lifeBars = document.querySelectorAll('.lbar');
let displayCompChoice = document.querySelector('.compChoice').children[0];
let dispPlayerScore = document.querySelector('#pscore');
let rgbValues;
let compChoice;
let playerLife = 3;
let playerScore = 0;

dispPlayerScore.innerHTML = `Player Score:  ${playerScore} `;

 class UI{
    static randNum(n){
        return Math.floor(Math.random() * n );
    }
    static randRGB(n=6){
        let rgbValues = [];
        for(let i = 0; i < n; i++){
            rgbValues.push(`rgb(${UI.randNum(226)}, ${UI.randNum(226)}, ${UI.randNum(226)})`);
        }
        return rgbValues;
    }
    static dispColors(arr){
        const display = document.querySelector(".display");
        for(let i = 0; i < arr.length; i++){
            let p = document.createElement('p');
            p.setAttribute("class", "s");
            p.addEventListener('click', playerGuess);
            p.style.backgroundColor = arr[i];
            display.appendChild(p);
        }
    } 
}
function getDifficulty(){
    let diff;
    inputs.forEach( input =>{
        if(input.checked){
            if(input.nextElementSibling.textContent === 'E'){
                diff = 3;
            }
            else if(input.nextElementSibling.textContent === 'M'){
                diff = 6;
            }
            else{
                diff = 9;
            }
        }
    });
    return diff;
}
function lifeBar(x){
    lifeBars[x].style.backgroundColor = 'white';
}
function playerGuessedRight(playerGuess){
    document.querySelectorAll('p').forEach(p => {
        p.style.opacity = 1;
        p.style.backgroundColor = playerGuess;
        p.textContent = playerGuess;
        p.classList = 'box-shadow';
        p.style.pointerEvents = 'none';
    });
    header.classList = 'header box-shadow';
    header.style.backgroundColor = playerGuess;
    setTimeout(() =>{
        header.style.backgroundColor = 'silver';
        header.classList.remove('box-shadow');
        display.innerHTML = '';
        const difff = getDifficulty();
        loadGame(difff);
    }, 2000);
    playerScore += 5;
    dispPlayerScore.innerHTML = `Player Score:  ${playerScore} `;
}
function gameOver(){
    showCompGuess();
    const gameOverlay = document.querySelector('.game-over-overlay');
    gameOverlay.style.display = 'flex';
    gameOverlay.querySelector('h3').textContent = `Your score: ${playerScore}`;
    gameOverlay.querySelector('.button').addEventListener('click', ()=> location.reload());
    // setInterval(()=>{
    //     let color = `rgb(${UI.randNum(226)}, ${UI.randNum(226)}, ${UI.randNum(226)})`;
    //     gameOverlay.querySelector('.game-over').style.backgroundColor = color;                                                               
    // },1000);
    document.querySelector('.subHead').innerHTML = ``;
}
function showCompGuess(){
    const pColors = document.querySelectorAll('p');
    pColors.forEach( pColor => {
        if(pColor.style.backgroundColor === compChoice){
            pColor.textContent = compChoice;
            pColor.style.color = 'white';
            pColor.style.pointerEvents = 'none';
            pColor.style.zIndex = 99;
        }
    });
}
function playerGuess(className){
    const playerGuess = this.style.backgroundColor;
    if(playerGuess === compChoice){
        playerGuessedRight(playerGuess);
    }
    else{
        this.className = 'inactive';
        this.textContent = playerGuess;
        playerLife -= 1;
        if(playerLife === 1){
            lifeBars[0].style.backgroundColor = 'red';
        }
        lifeBar(playerLife);
    }
    if(!playerLife){
       gameOver();
        return;
    }
}
function loadGame(n){
    rgbValues = UI.randRGB(n);
    compChoice = rgbValues[UI.randNum(rgbValues.length)];
    UI.dispColors(rgbValues);
    displayCompChoice.innerHTML = `Computer's choice: ${compChoice}`;
}
document.addEventListener("DOMContentLoaded", ()=>{
    loadGame(6);
});
inputs.forEach(input =>{
    input.addEventListener('click', ()=>{
        display.innerHTML = '';
        header.style.backgroundColor = 'silver';
        header.classList.remove('box-shadow');
        const diffi = getDifficulty();
        loadGame(diffi);
        displayCompChoice.innerHTML = `Computer's choice: ${compChoice}`;
        playerScore = 0;
        playerLife = 3;
        dispPlayerScore.innerHTML = `Player Score:  ${playerScore} `;
        lifeBars.forEach( bar => bar.style.backgroundColor = 'green');
    });
});
document.querySelector('.instruction h3').addEventListener('click', () =>{
    document.querySelector('.divv').classList.toggle('show');
    document.querySelector('.instruction h3').classList.toggle('toggleInstructScale');
});

