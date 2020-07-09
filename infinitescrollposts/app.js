const postsConatainer=document.getElementById('post-container');
const loader=document.querySelector('.loader');
const filter=document.getElementById('filter')

let limit=5;
let page=1;

async function getPost(){
const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

const data=await res.json();


   return data
}

async function showPosts(){

    const posts=await getPost()
    posts.forEach(post => {
                      const postEl=document.createElement('div');
                      postEl.classList.add('post');
                      
                      postEl.innerHTML=`
                      <div class="number">${post.id}</div>
                      <div class="post-info">
                      <h2 class="post-title">${post.title.toUpperCase()}<h2>
                      <p class="post-body">${post.body}</p>
                      </div>
                      `;
                      postsConatainer.appendChild(postEl)
                  })
        
    
}

showPosts()

function showLoading(){
    loader.classList.add('show');

    setTimeout(()=>{
        loader.classList.remove('show');  
        setTimeout(()=>{
            page++;
            showPosts();
        },300)
    },1000)
}

// filter post

function filterPosts(e){
    const term=e.target.value.toUpperCase();
    const posts=document.querySelectorAll('.post')
    console.log(posts)

    
    posts.forEach(post=>{
        const title=post.querySelector('.post-title').innerText.toUpperCase();
        const body=post.querySelector('.post-body').innerText.toUpperCase();
        

        if(title.indexOf(term)>-1 || body.indexOf(term)>-1){
            post.style.display='flex';

        }else{
            post.style.display="none"
        }

    })
    

}


getPost();

window.addEventListener('scroll',()=>{
    const{scrollTop,scrollHeight,clientHeight}=document.documentElement;
    
    if(scrollTop+clientHeight >=scrollHeight -5){
          showLoading()
    }
});


filter.addEventListener('input',filterPosts)
