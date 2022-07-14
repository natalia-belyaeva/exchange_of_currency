let currentData;
let leftOldValue = 1;
let rigthOldValue;

let exchangeRate = (data, leftCurrency, rigthCurrency) => {
    let leftText = document.querySelector('.exchange-rate-left');
    leftText.innerText = `1 ${leftCurrency.value.toUpperCase()} = ${data.result} ${rigthCurrency.value.toUpperCase()}`;
    let rigthText = document.querySelector('.exchange-rate-rigth');
    rigthText.innerText = `1 ${rigthCurrency.value.toUpperCase()} = ${(1 / data.result).toFixed(6)} ${leftCurrency.value.toUpperCase()}`;
}

let countUserSum = () => { 
    let leftText = document.querySelector('.user-input');
    let rigthText = document.querySelector('.counted-sum');
    rigthText.value = (leftText.value * currentData.result).toFixed(4);
    leftOldValue = leftText.value;  
}

let countUserSumBack = () => { 
    let leftText = document.querySelector('.user-input');
    let rigthText = document.querySelector('.counted-sum');
    leftText.value = (rigthText.value * (1/ currentData.result)).toFixed(4);  
    rigthOldValue = rigthText.value;
}

let countExchangeRate = () => {
    let leftCurrency = document.querySelector('[name=currency-from]:checked');
    let rigthCurrency = document.querySelector('[name=currency-to]:checked');
    let requestURL = `https://api.exchangerate.host/convert?from=${leftCurrency.value}&to=${rigthCurrency.value}`;

    fetch(requestURL)
        .then(res => res.json())
        .then((data) => {
            exchangeRate(data, leftCurrency, rigthCurrency);
            currentData = data;
            countUserSum();
            countUserSumBack();          
        })
}

let buttons = document.querySelectorAll('.hidden-button');
buttons.forEach((el) => {
    el.addEventListener('change', countExchangeRate)
})

let userLeftText = document.querySelector('.user-input');
userLeftText.addEventListener('keyup', (event) => {
    if (!isNaN(userLeftText.value)) {
        countUserSum();
    } else {
        userLeftText.value = leftOldValue;
    }
});

let userRigthText = document.querySelector('.counted-sum');
userRigthText.addEventListener('keyup', ()=> {
    if(!isNaN(userRigthText.value)) {
        countUserSumBack();
    } else {
        userRigthText.value = rigthOldValue;
    }
});

countExchangeRate();


