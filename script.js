'use strict';
if (typeof window === 'undefined') {process.exit()}

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  cashFlow: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: `1111`,
  transitionDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-07-30T15:52:00.000Z',
    '2022-08-28T19:52:00.000Z',
    '2022-08-30T20:22:00.000Z',
    '2022-08-31T04:52:00.000Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  cashFlow: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: `2222`,
  transitionDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  cashFlow: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: `3333`,
  transitionDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',

};

const account4 = {
  owner: 'Alex Brandy',
  cashFlow: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: `4444`,
  transitionDates: [
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};

const account5 = {
  owner: 'Samuel Ji',
  cashFlow: [700, 21000, -1000, 50, -90],
  interestRate: 6,
  pin: `0324`,
  transitionDates: [
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'CNY',
  locale: 'zh-CN',
};

const accounts = [account1, account2, account3, account4, account5];

const currencyRate = new Map(
  [['EUR', 99.47 / 100], ['USD', 100 / 100], ['GBP', 83.8 / 100], ['JPY', 13589 / 100], ['CNY', 689.04 / 100]]);

let currentAccount;
let sorted;
let logOutTimer

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerCashFlow = document.querySelector('.cashFlow');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUsername = (account) => account.toLowerCase().split(' ').map((cur) => cur[0]).join('');
accounts.forEach((acc) => acc.userName = createUsername(acc.owner));

const datesUtil = (past = new Date(), locale = currentAccount?.locale) => {
  // const now = new Date();
  // const year = `${now.getFullYear()}`;
  // const month = `${now.getMonth() + 1}`.padStart(2, '0');
  // const day = `${now.getDate()}`.padStart(2, '0');
  // const hour = `${now.getHours()}`.padStart(2, '0');
  // const minute = `${now.getMinutes()}`.padStart(2, '0');
  // const daysDistance = (now.getFullYear() - past.getFullYear()) * 365 +
  //   (now.getMonth() - past.getMonth()) * 30 + (now.getDate() - past.getDate());
  // const pastYear = `${past.getFullYear()}`;
  // const pastMonth = `${past.getMonth() + 1}`.padStart(2, '0');
  // const pastDay = `${past.getDate()}`.padStart(2, '0');
  //
  // return [year, month, day, hour, minute, daysDistance, pastYear, pastMonth, pastDay];
  const now = new Date();
  locale ??= 'en-US';
  const dateTimeItems = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  const currDate = new Intl.DateTimeFormat(locale).format(now);
  const currTime = new Intl.DateTimeFormat(locale, dateTimeItems).format(new Date());
  const daysDistance = (now.getFullYear() - past.getFullYear()) * 365 +
    (now.getMonth() - past.getMonth()) * 30 + (now.getDate() - past.getDate());
  const pastDate = new Intl.DateTimeFormat(locale).format(past);
  const pastTime = new Intl.DateTimeFormat(locale, dateTimeItems).format(past);
  return [currDate, currTime, daysDistance, pastDate, pastTime];
};

const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const startLogOutTime = (inactiveInterval = 600) => {
  if (logOutTimer) clearTimeout(logOutTimer);
  labelTimer.textContent = `${String(BigInt(inactiveInterval) / 60n)
    .padStart(2, '0')}:${String(inactiveInterval % 60).padStart(2, '0')}`;

  logOutTimer = setInterval(() => {
    console.log('Timer is running')
    if (--inactiveInterval === 0) {
      currentAccount = null;
      clearTimeout(logOutTimer);
      updateUI();
    }
    labelTimer.textContent = `${String(BigInt(inactiveInterval) / 60n)
      .padStart(2, '0')}:${String(inactiveInterval % 60).padStart(2, '0')}`;
  }, 1000);

};

const displayCashFlow = (account, sort = false) => {
  containerCashFlow.innerHTML = '';

  sorted = sort &&= !sorted;
  const datedCashFlow = account.cashFlow.map((flow, ind) => [flow, account.transitionDates[ind]]);
  const sortedCashFlow = datedCashFlow.slice().sort(
    (a, b) => a[0] - b[0]);
  (sort ? sortedCashFlow : datedCashFlow).forEach(([flow, date], ind) => {
    const transitionType = flow > 0 ? "deposit" : "withdrawal";
    // const [year, month, day, hour, minute, daysDist, pastYear, pastMonth, pastDay] = datesUtil(new Date(date));
    const [, , daysDist, pastDate] = datesUtil(new Date(date));
    let displayTransDate;
    if (daysDist <= 1) {
      displayTransDate = !daysDist ? 'Today' : 'Yesterday'
    } else if (daysDist <= 5) {
      displayTransDate = `${daysDist} days ago`;
    } else {
      displayTransDate = pastDate;
    }
    const html = `
    <div class="cashFlow__row">
      <div class="cashFlow__type cashFlow__type--${transitionType}">${ind + 1} ${transitionType.toUpperCase()}</div>
      <div class="cashFlow__date">${displayTransDate}</div>
      <div class="cashFlow__value">${formatCurrency(flow, account.locale, account.currency)}</div>
    </div>
    `;

    containerCashFlow.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplayBalance = (account) => {
  account.balance = account.cashFlow.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = formatCurrency(account.balance, account.locale, account.currency);
};

const calDisplayTransitionSummary = (account) => {
  const userCashFlow = account.cashFlow;
  labelSumIn.textContent = formatCurrency(userCashFlow.filter(flow => flow > 0).reduce((acc, mov) => acc + mov, 0),
    account.locale, account.currency);
  labelSumOut.textContent = formatCurrency(-1 * userCashFlow.filter(flow => flow < 0).reduce(
    (acc, mov) => acc + mov, 0), account.locale, account.currency);
  /* If no extra interests rule applied */
  // labelSumInterest.textContent = `${+(labelSumIn.textContent.slice(0,-1)) * account.interestRate * 0.01} €`;

  /* This bank settles the interest immediately after a deposit, but they don't grant interest below 1 € */
  labelSumInterest.textContent = formatCurrency(userCashFlow.filter(
    flow => flow > 0).map(flow => flow * account.interestRate / 100).filter(interest => interest > 1).reduce(
    (acc, cur) => acc + cur), account.locale, account.currency);
};

const updateUI = () => {
  containerApp.style.opacity = currentAccount ? `100` : `0`;
  labelWelcome.textContent = currentAccount ?
    `Welcome back, ${currentAccount.owner.split(' ')[0]}` : `Log in to get started`;
  currentAccount ? startLogOutTime() : logOutTimer && clearInterval(logOutTimer);

  if (currentAccount) {
    // const [year, month, day, hour, minute] = datesUtil(new Date(date))
    const [_, currDateTime] = datesUtil();
    labelDate.textContent = currDateTime;
    displayCashFlow(currentAccount);
    calDisplayBalance(currentAccount);
    calDisplayTransitionSummary(currentAccount);
  }
};

btnLogin.addEventListener('click', (e) => {
  // Prevent form from submitting
  e.preventDefault();
  const user = accounts.find(acc => acc.userName === inputLoginUsername.value);
  user?.pin === inputLoginPin.value ? login(user) : alert("Wrong User name or Password!");
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
  sorted = false;

  function login(account) {
    currentAccount = account;
    updateUI();
  }
});
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const inputAmount = +(inputTransferAmount.value);
  const recipientName = inputTransferTo.value;
  const recipientObj = accounts.find(account => account.userName === recipientName);

  inputTransferTo.value = inputTransferAmount.value = "";

  if (recipientObj && recipientObj !== currentAccount) {
    if (inputAmount > 0) {
      if (inputAmount <= currentAccount.balance) {
        const curCurrency = currentAccount.currency;
        setTimeout(() => alert(`Transfer succeed! Transferred ${
          formatCurrency(inputAmount, currentAccount.locale, curCurrency)} to ${recipientObj.owner}.`), 100);
        currentAccount.cashFlow.push(-inputAmount);
        currentAccount.transitionDates.push(new Date().toISOString());
        // currency conversion
        const amountInUSD = (inputAmount / currencyRate.get(curCurrency)).toFixed(2);
        const amountInRec = (amountInUSD * currencyRate.get(recipientObj.currency)).toFixed(2);
        recipientObj.cashFlow.push(+amountInRec);
        recipientObj.transitionDates.push(new Date().toISOString());
        updateUI();
      } else {
        alert("Fail to transfer: Insufficient balance!");
      }
    } else {
      alert("Fail to transfer: Invalid amount!");
    }
  } else {
    alert(recipientObj ?
      `You cannot transfer money to yourself!` : `Sorry, we cannot find user ${recipientName} in the system!`);
  }


});
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.cashFlow.some((flow) => flow >= 0.1 * amount)) {
    setTimeout(function () {
      alert("The loan is approved!");
      currentAccount.cashFlow.push(amount);
      currentAccount.transitionDates.push(new Date().toISOString());
      updateUI();
    }, Math.random() * 2500 + 2500);
  } else {
    alert("Sorry, we cannot offer you this loan at this time!");
  }
  updateUI();
  inputLoanAmount.value = "";
});
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  (currentAccount.userName === inputCloseUsername.value && currentAccount.pin === inputClosePin.value) ?
    closeAccount() : alert("Incorrect username or credential!");

  function closeAccount() {
    alert(`${currentAccount.owner.split(' ')[0]}, your account has been closed. You will be logged out.`);
    accounts.splice(accounts.findIndex((account) => account === currentAccount), 1);
    currentAccount = null;
    inputCloseUsername.value = inputClosePin.value = '';
    updateUI();
  }
});
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayCashFlow(currentAccount, true);
});