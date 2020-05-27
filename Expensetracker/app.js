const balance=document.getElementById('balance');
const moneyPlus=document.getElementById('money-plus');
const moneyMinus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');
// const updateBtn=document.getElementsByClassName('btn');
// const btn=document.getElementsByClassName('updateBtn');

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
    item.id=`${transaction.id}`;

    item.innerHTML=`<span class="txt">
    ${transaction.text}</span>  <span class="amt">${sign}${Math.abs(transaction.amount)}</span>
    <a href='#'> <i class="edit-item fa fa-pencil"></i> </a>
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
list.addEventListener('click',editItems)

function editItems(e){
  console.log(e.target)
  if(e.target.classList.contains('edit-item')){
      const id=+e.target.parentNode.parentNode.id;
      
      let found=null;
      transactions.forEach(item=>{
          
         if(item.id===id){
             found=item;
        }
         return found;
        });
        
    // assign values to input fields
    console.log(found);
   
    text.value=found.text;
    amount.value=found.amount;

    
    
    // show update transcation btn
    document.querySelector('.btn').style.display='none';
    document.querySelector('.updateBtn').style.display='block';
   
    
  }

  e.preventDefault();
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

function updateTransactions(e){
    const textValue=document.getElementById('text');
    const amountValue=document.getElementById('amount').value;

    console.log(textValue);
    console.log(amountValue);
    
    document.querySelector('.updateBtn').style.display='none';
    document.querySelector('.btn').style.display='block';
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
    document.querySelector('.updateBtn').style.display='none';
    // transactions.forEach(updateTransactions);
    updateValues();

}

init();

form.addEventListener('submit',addTransactions)
form.addEventListener('submit',updateTransactions)



