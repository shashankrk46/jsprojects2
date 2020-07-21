const main=document.querySelector('main');
const voicesSelect=document.querySelector('#voices');
const textarea=document.querySelector('#text');
const readBtn=document.querySelector('#read');
const toggleBtn=document.querySelector('#toggle');
const closeBtn=document.querySelector('.close');



const data=[
{
    image:"./images/thirsty.jpg",
    text:"I'm Thirsty"
},
{
    image:'./images/hungry.jpg',
    text:"I'm Hungry"
},
{
    image:'./images/happy.jpg',
    text:"I'm Happy"
},
{
    image:'./images/home.jpg',
    text:"I want go Home"
},
{
    image:'./images/games.jpg',
    text:"I want to play Games"
},
{
    image:'./images/sad.jpg',
    text:"I'm Sad"
},
{
    image:'./images/park.jpg',
    text:"I want to go to Park"
},
{
    image:'./images/learning.jpg',
    text:"I want to go to School"
},
{
    image:'./images/hospital.jpg',
    text:"I'm Unwell"
},
{
    image:'./images/scared.jpg',
    text:"I'm Scared"
},
{
    image:'./images/bathroom.jpg',
    text:"i want take Bath"
},
{
    image:'./images/angry.jpg',
    text:"I'm Angry"
}]


data.forEach(createBox);

// create speech boxes
function createBox(item){
  const box=document.createElement('div')
 const {image,text}=item;
 box.classList.add('box')
 box.innerHTML=`
 <img src="${image}" alt="${text}"/>
 <p class="info">${text}</p>`;

 box.addEventListener('click',()=>{
     setTextMessage(text);
     speakText();

    box.classList.add('active');
    setTimeout(()=>box.classList.remove('active'),800)
 })
 main.appendChild(box)

}

// init speech synth
const message=new SpeechSynthesisUtterance();
console.log(message)




toggleBtn.addEventListener('click',()=>document.getElementById('text-box').classList.toggle('show'))
closeBtn.addEventListener('click',()=>document.getElementById('text-box').classList.remove('show'))

// stire voices

let voices=[];

function getVoices(){
    voices=speechSynthesis.getVoices();
     
    voices.forEach(voice=>{
        const option=document.createElement('option');
        option.value=voice.name;
        option.innerText=`${voice.name} ${voice.lang}`

        voicesSelect.appendChild(option)
    })
}

// set the text
function setTextMessage(text){
    message.text=text;
}
function speakText(){
    
    speechSynthesis.speak(message)
}

function setVoice(e){
    
    message.voice=voices.find(voice=>voice.name===e.target.value)
}

voicesSelect.addEventListener('change',setVoice)

speechSynthesis.addEventListener('voiceschanged',getVoices);
getVoices();