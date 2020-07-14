const word=document.getElementById('word');
const text=document.getElementById('text');
const scoreEL=document.getElementById('score');
const timeEl=document.getElementById('time');
const endgameEl=document.getElementById('end-game-container');
const settingsBtn=document.getElementById('settings-btn');
const settings=document.getElementById('settings');
const settingsForm=document.getElementById('settings-form');
const difficultySelect=document.getElementById('difficulty');


const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

//   init word
let randomWord;

// init score
let score=0;

// init time
let time=10;

text.focus();

// start countig down

const timeInterval=setInterval(updateTime,1000);

function updateTime(){
    time--;
    timeEl.innerHTML=`${time}s`;
    if(time===0){
        clearInterval(timeInterval);
        gameOver();
    }
    
}

function gameOver(){
   endgameEl.innerHTML=`
   <h1>Time ran out</h1>
   <p>Your final score is ${score}</p>
   <button onclick="location.reload()">Reload</button> `
    endgameEl.style.display='flex';
}

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]

}

function addWordToDom(){
    randomWord=getRandomWord();
    word.innerHTML=randomWord;
}


function updateScore(){
    score++;
    scoreEL.innerHTML=score;
}

addWordToDom();

text.addEventListener('input',e=>{
    const insertedText=e.target.value;
    if(insertedText.trim()===randomWord){
        
        addWordToDom();
        updateScore();
        e.target.value=' ';

        time +=2;

        updateTime();
    }
})