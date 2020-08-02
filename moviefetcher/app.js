const fetchData=async(searchTerm)=>{
    const res=await axios.get('http://www.omdbapi.com/',
{
params:{
    apikey:'a3cb309a',
    s:searchTerm,
}
})
  
if(res.data.Error){
    return [];
}

};

const input=document.querySelector('input');



const onInput=async e=>{
   const movies=await fetchData(e.target.value) ;
   
  movies.forEach(movie=>{

    const div=document.createElement('div');
    div.innerHTML=`
    <img src="${movie.Poster}"/>
    <h1>${movie.Title}</h1>
    `
    document.querySelector('#target').appendChild(div)
    
  })
};

input.addEventListener('input',debounce(onInput)) ;   


 



   
