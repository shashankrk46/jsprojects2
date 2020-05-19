const wordEl=document.getElementById('word');
const wrongLettersEl=document.getElementById('wrong-letters');
const playAgainBtn=document.getElementById('play-button');
const popup=document.getElementById('popup-container');
const notification=document.getElementById('notification-container');
const finalMessage=document.getElementById('final-message');


const figureParts=document.querySelectorAll('.figure-part');

const words=['application','programming','interface','wizard'];


let selectedWord=words[Math.floor(Math.random()*words.length)];


const correctLetters=[];
const wrongLetters=[];

console.log(selectedWord);

function displayWord(){
  wordEl.innerHTML=`
  ${selectedWord
  .split('')
  .map(letter=>`
<span class="letter">
${correctLetters.includes(letter)? letter:''}

</span>`
)
.join('')}
  `;
const innerWord=wordEl.innerText.replace(/\n/g,'');
  if(innerWord===selectedWord){
      finalMessage.innerText="congratulations";
      popup.style.display='flex';
  }
}

// update the wrong letters

function updateWrongLettersEl(){
  // display wrong letters
  wrongLettersEl.innerHTML=`
  ${wrongLetters.length>0?`<p>Wrong Letters</p>`:''}
  ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
  `;
  //  display parts
  figureParts.forEach((part, index) =>{
   const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost
  if(wrongLetters.length===figureParts.length){
    finalMessage.innerText='You lost';
    popup.style.display='flex';
  }
  
}

// show notifivcation
function showNotification(){
  notification.classList.add('show');
   
  setTimeout(()=>{
    notification.classList.remove('show')
  },2000)
}


// keydown
window.addEventListener('keydown',e=>{
    // console.log(e.keyCode)
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter=e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
              console.log(!correctLetters.includes(letter))
                
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else{
          if(!wrongLetters.includes(letter)){
            console.log((!wrongLetters.includes(letter)))

            wrongLetters.push(letter);

            updateWrongLettersEl();
          }else{
            showNotification();
          }
        }
    }
});

// restart game and play again
playAgainBtn.addEventListener('click',()=>{
  // empty the array
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord=words[Math.floor(Math.random()*words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display='none'
})
displayWord();


