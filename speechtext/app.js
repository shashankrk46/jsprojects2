const main=document.querySelector('main');
const voicesSelect=document.querySelector('voices');
const textarea=document.querySelector('text');
const readBtn=document.querySelector('read');
const toggleBtn=document.querySelector('toggle');
const closeBtn=document.querySelector('close');



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
    image:'./images/happy face.jpg',
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

 main.appendChild(box)


}