'use strict';
let money,
    time,
    startBtn = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    expensesItems = document.querySelectorAll('.expenses-item'),
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeValue = document.querySelector('.income-value'),
    checkSavings = document.getElementById('savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value'),
    chooseIncome = document.querySelector('.choose-income'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.querySelector('.count-budget-btn');

startBtn.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(time).getFullYear();
    month.value = new Date(time).getMonth() + 1;
    day.value = new Date(time).getDate();
});

expensesBtn.disabled = true;

expensesItems.forEach(function (element, i) {
    element.addEventListener('change', function () {
        if (element.value == '') {
            expensesBtn.disabled = true;
        } else {
            expensesBtn.disabled = false;
        }
    });
});

for (let i = 0; i < optionalExpensesItem.length; i++) {
    optionalExpensesItem[i].addEventListener('keyup', function () {
        let x = optionalExpensesItem[i].value.charCodeAt(0);
        if (x < 122) {
            alert('Только русские слова!');
        }
    });
}

for (let i = 0; i < expensesItems.length; i++) {
    expensesItems[++i];
    expensesItems[i].type = 'number';
}

expensesBtn.addEventListener('click', function () {
    let sum = 0;

    for (let i = 0; i < expensesItems.length; i++) {
        let expensesItem = expensesItems[i].value,
            expensescCost = expensesItems[++i].value;

        if (expensesItem != '' &&
            expensesItem != null &&
            expensesItem.length < 50 &&
            expensescCost != null &&
            expensescCost != '') {
            appData.expenses[expensesItem] = expensescCost;
            sum += +expensescCost;
        } else {
            i--;
        }
        expensesValue.textContent = sum;
        appData.expensesSum = sum;
    }
});


optionalExpensesBtn.addEventListener('click', function () {
    optionalExpensesValue.textContent = '';
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;

        if ((typeof (opt)) === 'string' &&
            typeof (opt) != '' &&
            typeof (opt) != null &&
            opt.length < 50) {
            appData.optionalExpenses[i] = opt;
        } else {
            i--;
        }
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function () {
    let expenses = appData.expensesSum;
    console.log(expenses);

    if (appData.budget != undefined) {

        appData.moneyPerDay = ((appData.budget - expenses) / 30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 200) {
            level.textContent = `Минимальный уровень достатка`;
        } else if (appData.moneyPerDay > 200 && appData.moneyPerDay < 2000) {
            level.textContent = `Средний уровень достатка`;
        } else if (appData.moneyPerDay > 2000) {
            level.textContent = `Высокий уровень достатка`;
        } else {
            level.textContent = `Произошла ошибка`;
        }
    } else {
        budgetValue.textContent = `Произошла ошибка`;
    }
});

chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.momthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.momthIncome.toFixed(2);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.momthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.momthIncome.toFixed(2);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};