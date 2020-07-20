const word=document.getElementById('word');
const text=document.getElementById('text');
const scoreEL=document.getElementById('score');
const timeEl=document.getElementById('time');
const endgameEl=document.getElementById('end-game-container');
const settingsBtn=document.getElementById('settings-btn');
const settings=document.getElementById('settings');
const settingsForm=document.getElementById('settings-form');
const difficultySelect=document.getElementById('difficulty');


let limit = 5;

let singleWords=[];


async function getWords() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`  );
  const data = await res.json();

  return data
//   return data.forEach((x) => {
//     words.push(x.title);
//   });
}
  

 
async function doGetWords() {
   const gtwords=await getWords();
   
   gtwords.forEach(x=>
    singleWords.push(x.title.split(' ')[0]))


//   const a= words.forEach(x=>
//    singleWords.push(x.split(' ')[0]))
//    return a

    return singleWords
}

// doGetWords();
//   init word
let randomWord;

// init score
let score=0;

// init time
let time=10;

let difficulty=localStorage.getItem('difficulty')!==null?localStorage.getItem('difficulty'):'easy';

// set difficulty selcet value;

difficultySelect.value=localStorage.getItem('difficulty')!==null?localStorage.getItem('difficulty'):'easy';

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

 async function getRandomWord(){
  await doGetWords();
  
  
    
    // console.log(singleWords)
    console.log(singleWords.length)
      return singleWords[Math.floor(Math.random()*singleWords.length)];
    

}

async function addWordToDom(){
     randomWord=await getRandomWord();
     
    console.log(randomWord)
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

        if(difficulty==='hard'){
            time +=2;
        }else if(difficulty==="medium"){
            time +=3
        }else{
            time +=5
        }

        updateTime();
    }
})

// settings btn click

settingsBtn.addEventListener('click',()=>settings
.classList.toggle('hide'));

// settings select

settingsForm.addEventListener('change',e=>{
    difficulty=e.target.value;
    localStorage.setItem('difficulty',difficulty)
})






