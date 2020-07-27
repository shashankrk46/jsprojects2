const fetchData=async(searchTerm)=>{
    const res=await axios.get('http://www.omdbapi.com/',
{
params:{
    apikey:'a3cb309a',
    s:searchTerm,
}
})
    console.log(res.data)
};

const input=document.querySelector('input');

let timeoutId;
const onInput=e=>{
    if(timeoutId){
        clearTimeout(timeoutId)
    }
    timeoutId=setTimeout(()=>{
        fetchData(e.target.value)  
    },1000)
        
};
input.addEventListener('input',onInput) ;    
   
