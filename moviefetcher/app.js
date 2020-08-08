const autoCompleteconfig={
    renderOption(movie){
        const imgSrc=movie.Poster==='N/A'?'':movie.Poster;
        return `<img src="${imgSrc}"/>
        ${movie.Title} ${movie.Year}
        `;
       },
       
       inputValue(movie){
           return movie.Title
       },
      async fetchData(searchTerm){
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
    return res.data.Search;
    }
}

createAutoComplete({
   ...autoCompleteconfig,
   root:document.querySelector('#left-autocomplete'),
   onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie,document.querySelector('#left-summary'),'left')
},
   
});
createAutoComplete({
   ...autoCompleteconfig,
   root:document.querySelector('#right-autocomplete'),
   onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie,document.querySelector('#right-summary'),'right')
},
   
});

let leftMovie;
let rightMovie;
const onMovieSelect=async(movie,summaryElement,side)=>{
    const res=await axios.get('http://www.omdbapi.com/',
    {
    params:{
        apikey:'a3cb309a',
        i:movie.imdbID,

    }
});
summaryElement.innerHTML=movieTemplate(res.data);

if(side==='left'){
    leftMovie=res.data
}else{
    rightMovie=res.data
}

if(leftMovie&&rightMovie){
    runComparison();
}
}

const runComparison=()=>{
    const leftSideStats=document.querySelectorAll('#left-summary .notification');
    const rightSideStats=document.querySelectorAll('#right-summary .notification');
    leftSideStats.forEach((leftStats,index)=>{
        const rightStats=rightSideStats[index];

        const leftSidevalue=leftStats.dataset.value;
        const rightSidevalue=rightStats.dataset.value;

        console.log(leftSidevalue);
        console.log(rightSidevalue);

        if(rightSidevalue>leftSidevalue){
            leftStats.classList.remove('is-primary');
            leftStats.classList.add('is-warning');
        }else{
            rightStats.classList.remove('is-primary');
            rightStats.classList.add('is-warning');
        }
    })
}

const movieTemplate=(movieDetail)=>{


    const dollars=+movieDetail.BoxOffice.replace(/\$/g,'').replace(/,/g,'');
    const metaScore=+movieDetail.Metascore;
    const imdbScore=parseFloat(movieDetail.imdbRating);
    const imdbVotes=+movieDetail.imdbVotes.replace(/,/g,'');
    
    const awards=movieDetail.Awards.split('').reduce((acc,word)=>{
        const value=+(word);
        if(isNaN(value)){
            return acc
        }else{
            return acc+value;
        }
    },0);
 


    return `<article class="media">
    <figure class="media-left">
    <p class="image">
    <img src="${movieDetail.Poster}">
    </p>
    </figure>
    <div class="media-content">
    <div class="content">
    <h1>${movieDetail.Title}</h1>
    <h4>${movieDetail.Genre}</h4>
    <p>${movieDetail.Plot}</p>
    </div>
    </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    
    <article data-value=${dollars} class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box office</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbScore} class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes}  class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `;
}









 



   
