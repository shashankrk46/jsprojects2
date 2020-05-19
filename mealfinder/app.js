const search=document.getElementById('search');
const submit=document.getElementById('submit');
const random=document.getElementById('random');
const mealsEL=document.getElementById('meals');
const resultHeading=document.getElementById('result-heading');
const singleMealEL=document.getElementById('single-meal');


// saerch meal and fetch from api
function searchMeal(e){

    // clear single meal
    singleMealEL.innerHTML='';

    // get search term
    const term=search.value;

    // check for empty
    if(!term){
        console.log('Enter the meal item u want to search')
    }else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            resultHeading.innerHTML=`<h2>Showing searched item category '${term.toUpperCase()}'</h2>`;
            if(!data.meals){
                resultHeading.innerHTML='<p>There are no search results,Try different meal!</p>'
            }else{
                mealsEL.innerHTML=data.meals.map(meal=>
                    `<div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealid="${meal.idMeal}"/>
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                `
                )
                .join('');
            }

        });
        search.value='';
    }
    
    e.preventDefault();
}

// fetch meal by id
function getMealById(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res=>res.json())
    .then(data=>{
        const meal=data.meals[0];

        console.log(meal)
        addMealToDOM(meal)
    })
}

function addMealToDOM(meal){
    const ingredients=[];

    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`);
        
        }else{
            break;
        }
        
    }
    console.log(ingredients)
    singleMealEL.innerHTML=`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    

    ${ingredients.map(ing=>
        `<li>${ing}</li>`).join('')}
    </div>

    </div>`;



}

// event listners
submit.addEventListener('submit',searchMeal)

mealsEL.addEventListener('click',e=>{
    const mealInfo=e.path.find(item=>{
        // console.log(item)

        if(item.classList){
            return item.classList.contains('meal-info')
        }else{
            return false;
        }
    })
     console.log(mealInfo)
    if(mealInfo){
        const mealID=mealInfo.getAttribute('data-mealid');
        getMealById(mealID)
       
    }
})

