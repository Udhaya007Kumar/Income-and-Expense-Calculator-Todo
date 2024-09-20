const radioAll = document.getElementById('radioAll');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const addIncomeExpensedropdown =document.getElementById('addIncomeExpensedropdown');
const Amount = document.getElementById('Amount');



let finances=[];
let idCounter = 1;



// ADD Income Expenss Details view

function addIncomeExpense(e) {
  event.preventDefault();
  const type = addIncomeExpensedropdown.value;
  const source = document.getElementById("source").value;
  const amount = Amount.value;
  const selectedDate = dateInput.value;

  if (addIncomeExpensedropdown.value === "income") {
    if(amount !=null,source != null ,selectedDate !=null){
      alert('Fill Income Detaills fill');
    }
    finances.push({
      id: idCounter++,
      type: type,
      source: source,
      amount: amount,
      date: selectedDate,
    });
    
    localStorage.setItem("finances", JSON.stringify(finances));
    localStorage.setItem("idCounter", idCounter);
    closeModal();
    deletrow();
  }
  else{
    // if(amount !=null,source != null ,selectedDate !=null){
    //     alert('Fill expenss Detaills fill');
    // }
    let totalBalance = 0;
    
    finances.forEach((item) => {
        let amount = parseFloat(item.amount); // Convert amount to a number
        if (item.type === "income") {
          totalBalance += amount; // Add income
        } else if(item.type === "expense") {
            let expenseAmount = parseFloat(item.amount);
            totalBalance -= expenseAmount;
          }
      });   
      
      if(totalBalance >= 0){
        finances.push({
            id: idCounter++,
            type: type,
            source: source,
            amount: amount,
            date: selectedDate,
          });
          localStorage.setItem("finances", JSON.stringify(finances));
           localStorage.setItem("idCounter", idCounter);
    closeModal();
    deletrow();
      }
      
        
  }
}

// Data Storage Window Load
window.onload = ()=>{
  finances=JSON.parse(localStorage.getItem('finances')) || [];
  idCounter = parseInt(localStorage.getItem('idCounter')) || 1;
}
//  All Function Delete Row
function deletrow(){
    const type =addIncomeExpensedropdown.value="";
    const source = document.getElementById('source').value="";
     const amount =Amount.value="";
     const selectedDate = dateInput.value="";
}


// RadioALLButton Click Even 
radioAll.addEventListener('change',()=>{
    const dataList =document.getElementById('allDataUlList');
    dataList.innerHTML = ''; 
    let totalIncome = 0;
    finances.forEach((item)=>{
        if(item.type==='income'){
            let amount =parseFloat(item.amount)
            totalIncome +=amount;
            console.log(totalIncome);
 
        }else if(item.type==='expense'){
            let amount =parseFloat(item.amount)
            totalIncome -=amount;
        }
        

    const li =document.createElement('li');
    li.classList.add('box', 'text-start', 'p-1', 'mb-5', 'shadow-lg','mt-5','m-[20%]', 'rounded-2xl', 'bg-white','w-[50%]');
    li.innerHTML = `
      <div class="text-xl mb-2 tracking-wider text-[#171C2D]">
      <li class="mt-2 text-center text-3xl  ${item.type === 'income' ? 'text-indigo-600' : 'text-red-400'}">
        ${item.type}
      </li>
      <li class="ml-4">source:${item.source}</li>
      <li class="ml-4">Amount: ${item.amount}</li>
      <li class="ml-4">Date: ${item.date}</li>
      <li class="ml-4 ${item.type === 'income' ? 'text-indigo-600' : 'text-red-400'} ">Total:${totalIncome}</li>
      </div>
      
    `;
    dataList.appendChild(li);
    closeModal();
    
   })    
})


// Income Edit Start View
let currentEditingId = null;
function editIncomeView(id)
{
  if (id !== null) { 
    const incomeData = finances.find(item => item.id === id);
    currentEditingId = id; 
    document.getElementById('editDate').value = incomeData.date;
    document.getElementById('editSource').value = incomeData.source;
    document.getElementById('editAmount').value = incomeData.amount;
  } else {
    document.getElementById('editDate').value = '';
    document.getElementById('editSource').value = '';
    document.getElementById('editAmount').value = '';
  }

  // Show the modal
  document.getElementById('editIncomeModal').classList.remove('hidden');

}
function closeModal(){
  document.getElementById('editIncomeModal').classList.add('hidden');
  currentEditingId = null;
 
}
function saveIncome(){
 
  const date = document.getElementById('editDate').value;
  const source = document.getElementById('editSource').value;
  const amount = parseFloat(document.getElementById('editAmount').value);

  if (currentEditingId !== null) {
    // Edit existing entry
    const incomeData = finances.find(item => item.id === currentEditingId);
    incomeData.date = date;
    incomeData.source = source;
    incomeData.amount = amount;
  }

  // Save updated finances array to localStorage
  localStorage.setItem('finances', JSON.stringify(finances));

  // Close the modal and re-render the list
  closeModal();
  radioIncome();

  
  
}
// Income Edit  End View


// Income Delete Start View

function deleteIncomeView(id){
    if (id != null) {
      const confirmed = confirm('Are you sure you want to delete this  entry?');
      if (confirmed) { 
        finances = finances.filter(item => item.id !== id);
        localStorage.setItem('finances', JSON.stringify(finances));
        renderIncomeList();
      }
    }
    }

//Income Delete End View



let totalIncome = 0;
income.addEventListener('change',()=>{
    const dataList = document.getElementById('allDataUlList');
    dataList.innerHTML = ''; 
    finances.forEach((item) => {
        
        if (item.type === 'income') {
            let amount =parseFloat(item.amount)
            totalIncome +=amount;
            console.log( totalIncome );
            
            const li = document.createElement('li');
            li.classList.add('box', 'text-start', 'p-1', 'mb-5', 'shadow-lg', 'mt-5', 'm-[20%]', 'rounded-2xl', 'bg-white', );
            li.innerHTML = `
        <div class="flex text-[#171C2D]">
            <div class="text-xl mb-2 tracking-wider text-[#171C2D]">
              <li class="mt-2 text-center text-3xl text-indigo-600">${item.type}</li>
              <li class="ml-4">Source: ${item.source}</li>
              <li class="ml-4">Amount: ${item.amount}</li>
              <li class="ml-4">Date: ${item.date}</li>
              
              
            </div>
          <div class="grid content-evenly ml-[23px]">
                     <i class="fa-regular fa-pen-to-square fa-xl mr-4" style="color: #74C0FC;" onclick="editIncomeView(${item.id})"></i>
                     <i class="fa-solid fa-trash fa-xl" style="color: #74C0FC;"  onclick="deleteIncomeView(${item.id})" ></i>
          </div>
        </div>
              
            `;
            dataList.appendChild(li);
        }
    });
    
})


// Expense Edit Start View

let currentExpenseEditingId = null;
function editExpenseView(id){
   
  if (id !== null) { 
    const incomeData = finances.find(item => item.id === id);
    currentEditingId = id; 
    document.getElementById('editDate').value = incomeData.date;
    document.getElementById('editSource').value = incomeData.source;
    document.getElementById('editAmount').value = incomeData.amount;
  } else {
    document.getElementById('editDate').value = '';
    document.getElementById('editSource').value = '';
    document.getElementById('editAmount').value = '';
  }

  document.getElementById('editIncomeModal').classList.remove('hidden');
    
}
function closeModal(){
  document.getElementById('editIncomeModal').classList.add('hidden');
  currentEditingId = null;
 
}
function saveExpense(){
 
  const date = document.getElementById('editDate').value;
  const source = document.getElementById('editSource').value;
  const amount = parseFloat(document.getElementById('editAmount').value);

  if (currentEditingId !== null) {
    const incomeData = finances.find(item => item.id === currentEditingId);
    incomeData.date = date;
    incomeData.source = source;
    incomeData.amount = amount;
  }
  localStorage.setItem('finances', JSON.stringify(finances));
  closeModal();
}
// Expense Edit End 

let totalexpanse =0;
expense.addEventListener('change',()=>{
    const dataList = document.getElementById('allDataUlList');
    dataList.innerHTML = ''; 
    finances.forEach((item) => {
        if (item.type === 'expense') {
            let amount =parseFloat(item.amount)
            totalexpanse +=amount;
            console.log( totalexpanse );
            const li = document.createElement('li');
            li.classList.add('box', 'text-start', 'p-1', 'mb-5', 'shadow-lg', 'mt-5', 'm-[20%]', 'rounded-2xl', 'bg-white', );
            li.innerHTML = `
        <div class="flex text-[#171C2D]">
            <div class="text-xl mb-2 tracking-wider text-[#171C2D]">
              <li class="mt-2 text-center text-3xl text-red-400">${item.type}</li>
              <li class="ml-4">Source: ${item.source}</li>
              <li class="ml-4">Amount: ${item.amount}</li>
              <li class="ml-4">Date: ${item.date}</li>
              

            </div>
          <div class="grid content-evenly ml-[23px]">
                     <i class="fa-regular fa-pen-to-square fa-xl mr-4" style="color: #74C0FC;" onclick="editIncomeView(${item.id})"></i>
                     <i class="fa-solid fa-trash fa-xl" style="color: #74C0FC;"  onclick="deleteIncomeView(${item.id})" ></i>
          </div>
        </div>
              
            `;
            dataList.appendChild(li);
            
        }
    });

    
    
})


// Add model open And Close script
function openModal() {
    document.getElementById('myModal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('myModal').classList.add('hidden');
  }

