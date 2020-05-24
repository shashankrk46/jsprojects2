const balance=document.getElementById('balance');
const moneyPlus=document.getElementById('money-plus');
const moneyMinus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');

const dummyTrans=[
    {id:1,text:'flower',amount:-20},
    {id:2,text:'salary',amount:300},
    {id:3,text:'book',amount:-10},
    {id:4,text:'camera',amount:150},
];

let transactions=dummyTrans;

// add transactions to dom list

function addTransactions(transaction){
    // get sign
    const sign=transaction.amount<0?'-':'+';

    const item=document.createElement('li');
    // add class based on value
    item.classList.add(transaction.amount<0?'minus':'plus');

    item.innerHTML=`
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button
    `;

    list.appendChild(item);


}

// init app
function init(){
    list.innerHTML='';

    transactions.forEach(addTransactions);

}

init();