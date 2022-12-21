let senderName = document.getElementById("senderInput");
let receiverName = document.getElementById("receiverInput");
let date = document.getElementById("dateInput");
let amount = document.getElementById("amountInput");
let transType = document.getElementById("transactionType");
let tableEL = document.getElementById("table-section");
let saveBtn = document.getElementById("save-btn");
let balance = document.getElementById("balance-amount");
let cashIn = document.getElementById("cash-in-amount");
let cashOut = document.getElementById("cash-out-amount");

let totalBalance = 0;
let totalCashIn = 0;
let totalCashOut = 0;

let senderNameArr = [];
let receiverNameArr = [];
let dateArr = [];
let amountArr = [];
let transTypeArr = [];

let localSenderName = JSON.parse(localStorage.getItem("senderNameArr"));
let localReceiverName = JSON.parse(localStorage.getItem("receiverNameArr"));
let localDate = JSON.parse(localStorage.getItem("dateArr"));
let localAmount = JSON.parse(localStorage.getItem("amountArr"));
let localTransType = JSON.parse(localStorage.getItem("transTypeArr"));

if (localSenderName) {
	senderNameArr = localSenderName;
	receiverNameArr = localReceiverName;
	dateArr = localDate;
	amountArr = localAmount;
	transTypeArr = localTransType;
    showItem();
    cashInAmount();
    cashOutAmount();
    totalBalanceAmount();
}

saveBtn.addEventListener("click", function () {

    if(!senderName.value || !receiverName.value || !date.value || !amount.value){
        alert("complete empty space")
        return false
    }else if(senderName.value === " " || receiverName.value === " " || date.value=== " " || amount.value===" "){
        alert("complete the empty space")
        return false
    }else if(!transType.value){
        alert("provide type of transaction")
        return false
    };

    let senderRegex = /[a-zA-Z]+$/;
    let receiverRegex = /[a-zA-Z]+$/;
    if(!senderName.value.match(senderRegex)){
        alert("Both sender & receiver name must contain only letters, avoid space at the beginning & end")
         return false
       
    }
    if(!receiverName.value.match(receiverRegex)){
        alert("Both sender & receiver  name must be contain only letters, avoid space at the beginning & end")
        return false
    }
    if(amount.value < 0 ){
        alert("amount must be above 0rwf")
        return false
    }

	senderNameArr.push(senderName.value);
	receiverNameArr.push(receiverName.value);
	dateArr.push(date.value);
	amountArr.push(amount.value);
	transTypeArr.push(transType.value);
	
    senderName.value = " ";
	receiverName.value = " ";
	date.value = " ";
	amount.value = " ";
	transType.value = " ";

	localStorage.setItem("senderNameArr", JSON.stringify(senderNameArr));
	localStorage.setItem("receiverNameArr", JSON.stringify(receiverNameArr));
	localStorage.setItem("dateArr", JSON.stringify(dateArr));
	localStorage.setItem("amountArr", JSON.stringify(amountArr));
	localStorage.setItem("transTypeArr", JSON.stringify(transTypeArr));
    
    showItem();
    cashInAmount();
    cashOutAmount();
    totalBalanceAmount();
});

function cashInAmount() {
    totalCashIn = 0;
    for (let i = 0; i < transTypeArr.length; i++) {
        if (transTypeArr[i] === "incoming") {
            totalCashIn += parseInt(amountArr[i]);
        }
    }
    cashIn.innerHTML = totalCashIn;
}

function cashOutAmount() {
    totalCashOut = 0;
    for (let i = 0; i < transTypeArr.length; i++) {
        if (transTypeArr[i] === "outgoing") {
            totalCashOut += parseInt(amountArr[i]);
        }
    }
    cashOut.innerHTML = totalCashOut;
}

function totalBalanceAmount() {
    totalBalance = 0;
    totalBalance = totalCashIn - totalCashOut;
    balance.innerHTML = totalBalance;
}
        

function showItem() {
	let tableRow = "";
	for (let i = 0; i < senderNameArr.length; i++) {
		tableRow += `<tr>
            <td>${dateArr[i]}</td>
            <td>${senderNameArr[i]}</td>
            <td>${receiverNameArr[i]}</td>
            <td>${transTypeArr[i]}</td>
            <td>${amountArr[i]}</td>
            <td>${amountArr[i]}</td>
            <td><button type="button" onclick="deleteSingle(${i})" id="delete-btn">delete</button></td>
            </tr>`;
	}
	tableEL.innerHTML = tableRow;
}

function deleteSingle(index) {
	senderNameArr.splice(index, 1);
	receiverNameArr.splice(index, 1);
	dateArr.splice(index, 1);
	amountArr.splice(index, 1);
	transTypeArr.splice(index, 1);
	
    localStorage.setItem("senderNameArr", JSON.stringify(senderNameArr));
	localStorage.setItem("receiverNameArr", JSON.stringify(receiverNameArr));
	localStorage.setItem("dateArr", JSON.stringify(dateArr));
	localStorage.setItem("amountArr", JSON.stringify(amountArr));
	localStorage.setItem("transTypeArr", JSON.stringify(transTypeArr));
    
    showItem();
    cashInAmount();
    cashOutAmount();
    totalBalanceAmount();
}

function deleteAll() {
	localStorage.clear();
	senderNameArr = [];
	receiverNameArr = [];
	dateArr = [];
	amountArr = [];
	transTypeArr = [];
    
    showItem();
    cashInAmount();
    cashOutAmount();
    totalBalanceAmount();
}
