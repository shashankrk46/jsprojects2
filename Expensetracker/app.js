const balance=document.getElementById('balance');
const moneyPlus=document.getElementById('money-plus');
const moneyMinus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');

// const dummyTrans=[
//     {id:1,text:'flower',amount:-20},
//     {id:2,text:'salary',amount:300},
//     {id:3,text:'book',amount:-10},
//     {id:4,text:'camera',amount:150},
// ];

const localStorageTransactions=JSON.parse(localStorage.getItem('transactions'))

let transactions=localStorage.getItem('transactions')!==null?localStorageTransactions:[];
console.log(transactions)

// add transcation
function addTransactions(e){
  e.preventDefault();
  if(!text.value || !amount.value){
      console.log('Please add a text and amount')
  }
else{
      const transaction={
       id:generateRandomIds(),
       text:text.value,
       amount:+amount.value
      }
      transactions.push(transaction);
      addTransactionsDom(transaction);
     

      updateValues();

      updateLocalStorage();

      text.value='';
      amount.value='';
      
  }
}

// generate random id
function generateRandomIds(){
   return Math.floor(Math.random()*1000000)

}

// add transactions to dom list

function addTransactionsDom(transaction){
    // get sign
    const sign=transaction.amount<0?'-':'+';

    const item=document.createElement('li');
    // add class based on value
    item.classList.add(transaction.amount<0?'minus':'plus');

    item.innerHTML=`<span class="txt">
    ${transaction.text}</span> <span class="id">
    ${transaction.id}</span> <span class="amt">${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransactions(${transaction.id})">x</button
    `;

    list.appendChild(item);


}

// update the balance income and expense
function updateValues(){
    const amounts=transactions.map(transaction=>
        transaction.amount)

const total=amounts.reduce((acc,item)=>
   (acc+=item),0).toFixed(2);
   

   const income=amounts
   .filter(item=>item>0)
   .reduce((acc,item)=>(acc+=item),0)
   

   const expense=(amounts
    .filter(item=>item<0)
   .reduce((acc,item)=>
   (acc+=item),0)*-1).toFixed(2);
   

   balance.innerText=`$${total}`;
   moneyPlus.innerText=`$${income}`;
   moneyMinus.innerText=`$${expense}`;
}

// remove transactions by id
function removeTransactions(id){
    console.log(id)
    transactions=transactions.filter(transaction=>
        
        transaction.id!==id)
        
    updateLocalStorage();

    init();
}

// function updateItems(transactions){
//     list.addEventListener('click',getIds)
//     console.log(transactions.id)
   
// }
list.addEventListener('click',getIds)

function getIds(e){
    console.log(e.target)
    // console.log(e.target.classList.contains('txt'));
    // const sortByIds=transactions.map(trans=>trans.id);

    if(e.target.className==='id'){
        const idTarget=+e.target.textContent;
        console.log(idTarget);

        let found=null;
        transactions.forEach(item=>{
            if(item.id===idTarget){
                console.log(found=item)
                found=item
            }
            return found;
        });
        // return found;
        console.log(found.amount);
        text.value=found.text;
        amount.value=found.amount;
       
        updateItemsSubmit(text.value,amount.value)
 // const sortByIds=transactions.map(trans=>
        //     trans.id);
        //     console.log(sortByIds)

        // if(sortByIds.includes(idTarget)){
        //     console.log('yes');
        // }
    }
    
    // if(e.target.classList.contains('txt') || e.target.classList.contains('amt') || e.target.classList.contains('id') ){
    //     if(e.target.className==='id'|| e.target.className==='txt' ||  e.target.className==='amt'){
    //         console.log(e.target.textContent)
    //     }
    // }
    // console.log(transactions[0].id)
    // const sortByIds=transactions.map(trans=>trans.id);
    // console.log(sortByIds)
   
    // console.log(transactions.sort(trans=>
    //      trans.text
    // ))
}

function updateItemsSubmit(text,amount){
    let found =null;

    transactions.forEach(item=>{
        if(item.id===transactions.id){
            item.text=text;
            item.amount=amount;
            found=item;
        }
    })
    return found;
}

const updateTransactions=function(e){

   updateItemsSubmit(text,amount)
    e.preventDefault();

}
// update ls transactions
 function updateLocalStorage(){
     localStorage.setItem('transactions',JSON.stringify(transactions))
 }





// init app
function init(){
    list.innerHTML='';

    transactions.forEach(addTransactionsDom);
    document.addEventListener('keypress',function(e){
        if(e.keyCode===13 || e.which===13){
            e.preventDefault();
            return false;
        }
    })
    // transactions.forEach(updateTransactions);
    updateValues();

}

init();

form.addEventListener('submit',addTransactions)
form.addEventListener('submit',updateTransactions)



