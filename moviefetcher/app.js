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
    onMovieSelect(movie,document.querySelector('#left-summary'))
},
   
});
createAutoComplete({
   ...autoCompleteconfig,
   root:document.querySelector('#right-autocomplete'),
   onOptionSelect(movie){
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie,document.querySelector('#right-summary'))
},
   
});


const onMovieSelect=async(movie,summaryElement)=>{
    const res=await axios.get('http://www.omdbapi.com/',
    {
    params:{
        apikey:'a3cb309a',
        i:movie.imdbID,
    }
})
summaryElement.innerHTML=movieTemplate(res.data)

}

const movieTemplate=(movieDetail)=>{
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
    <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    
    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box office</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `;
}









 



   
