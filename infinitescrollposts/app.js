const postsConatainer=document.getElementById('post-container');
const loader=document.querySelector('.loader');
const filter=document.getElementById('.filter')

let limit=5;
let page=1;


// async function getPosts(){
//     const res =await fetch(`https://jsonplaceholder.typicode.com/posts`)
//     const data=await res.json();
//     console.log(data)
//     return data;
    
// }
function getPost(){
fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&page=${page}`).then(res=>res.json()).then(data=>
  data.forEach(post => {
      const postEl=document.createElement('div');
      postEl.classList.add('post');
      
      postEl.innerHTML=`
      <div class="number">${post.id}</div>
      <div class="post-info>
      <h2 class="post-title">${post.title.toUpperCase()}<h2>
      <p class="post-body">${post.body}<h2>
      </div>
      `;
      postsConatainer.appendChild(postEl)
  })
)}

function showLoading(){
    loader.classList.add('show');

    setTimeout(()=>{
        loader.classList.remove('show');  
        setTimeout(()=>{
            page++;
            getPost();
        },300)
    },1000)
}


getPost();

window.addEventListener('scroll',()=>{
    const{scrollTop,scrollHeight,clientHeight}=document.documentElement;
    //  console.log(Math.floor(scrollTop,scrollHeight,clientHeight))
    if(scrollTop+clientHeight >=scrollHeight -5){
          showLoading()
    }
});
