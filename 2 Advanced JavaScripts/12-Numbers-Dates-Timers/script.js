'use strict';

// numberRepresentationConversion()
function numberRepresentationConversion() {

  console.log(`I--1. Java script has all number represented internally as floating point numbers` +
    ` because ${30 === 30.0 ? "30===30.0" : "30!==30.0"}`);

  console.log(`I--2. Due to the limitation of floating point representation ${0.1 + 0.2 === 0.3 ?
    "0.1 + 0.2 ===0.3" : "0.1 + 0.2 !==0.3"}`);

  // Quick conversion from String to Number
  console.log(`I--3.`, "23", Number(23), +"23");

  // Parsing -- extract the (heading) numerical part of a String
  console.log(`I--4.`, Number.parseInt('30px'))
  console.log(`I--5.`, Number.parseInt('px30'))
  console.log(`I--6.`, Number.parseInt('2.5rem'))
  console.log(`I--7.`, Number.parseFloat('2.5rem'))

  // Check if a value is NaN
  console.log(`I--8.`, Number.isNaN(20));
  console.log(`I--9.`, Number.isNaN(Number.parseInt('px30')));
  // Infinite number is not considered as NaN in JavaScript
  console.log(`I-10.`, Number.isNaN(23 / 0));

  // We have method to check if a value is finite (a number)
  console.log(`I-11.`, Number.isFinite(23));
  console.log(`I-12.`, Number.isFinite(23 / 0));
  console.log(`I-13.`, Number.isFinite("23"));

  // Check if a value is an integer
  console.log(`I-14.`, Number.isInteger(23))
  console.log(`I-15.`, Number.isInteger(23.647))
  console.log(`I-16.`, Number.isInteger(NaN))

  // Use "_" as numeric separators
  console.log(`I-17 - 1`, 287_460_000_000);
  console.log(`I-17 - 2`, Number('230_000')); // This conversion wouldn't work
}

// math()
function math() {
  console.log("II--1.", Math.sqrt(25));
  console.log("II--2.", 25 ** (1 / 2));
  console.log("II--3.", 8 ** (1 / 3));

  console.log("II--4.", Math.max(5, 18, 23, 11, 2));

  console.log("II--5.", Math.min(5, 18, 23, 11, 2));
  console.log("II--6.", Math.max(5, '72', 23, 11, 2));
  console.log("II--7.", Math.max(5, 18, '23X', 11, 2));

  console.log("II--8.", Math.PI);
  console.log("II--9.", Math.E);

  // function that generates random integers between min & max
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
  for (let i = 0; i < 10; i++) {
    console.log(`II-10-${i + 1}. `, randomInt(10, 20));
  }

  // Truck - drop all decimal value
  console.log(`II-11-1`, Math.trunc(24.4));
  console.log(`II-11-2`,Math.trunc(24.6));
  console.log(`II-11-3`,Math.trunc(-24.6));

  // Round - round to the nearest integer
  console.log(`II-12-1`,Math.round(24.4));
  console.log(`II-12-2`,Math.round(24.6));
  console.log(`II-12-3`,Math.round(-24.6));

  // Ceil - round up to the nearest integer that is grater than this value
  console.log(`II-13-1`,Math.ceil(24.4));
  console.log(`II-13-2`,Math.ceil(24.6));
  console.log(`II-13-3`,Math.ceil(-24.6));

  // Floor - round down to the nearest integer that is smaller than this value
  console.log(`II-14-1`, Math.floor(24.4));
  console.log(`II-14-2`, Math.floor(24.6));
  console.log(`II-14-3`, Math.floor(-24.6));

  // Rounding to decimals --> returns a String
  console.log(`II-14-1`, (2.7).toFixed(0));
  console.log(`II-14-2`, (2.7).toFixed(3));
  console.log(`II-14-3`, (2.345).toFixed(2));
  console.log(`II-14-4`, +(2.345).toFixed(2));
}

// bigInt()
function bigInt() {
  console.log(2**53 - 1);
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(2**53 + 1); // This isn't quite accurate

  console.log(23910847929817940238974393498792034);
  console.log(23910847929817940238974393498792034n); // Convert a number into a big int
  console.log(BigInt(8293749823234)); // Only use constructor for smaller instances
  console.log(BigInt(987656789053457982474780235689287650345)); // Because the value passed in is not accurate

  /* Big int share the same operators of regular numbers, but BigInt cannot mix up with regular numbers */
  /* Math methods don't work with BigInt */

  // As the name suggests, BigInt only stores integer values, so decimals will be omitted after division
  console.log(11n / 3n);
}

// datesRepresentation()
function datesRepresentation() {
  // Generate current date & time
  console.log(new Date());
  // Generate a specified date & time using ISO
  console.log(new Date('2015-12-25T01:50:14.000Z'))
  // Generate a specified date & time using multiple arguments in a order of YYYY, MM (0-based), DD, HH, mm, ss
  console.log(new Date(2037, 10, 19, 16, 23, 5));
  console.log(new Date(2037, 10, 42, 16, 23, 5));
  // Generate a specified date & time using relative time to Jan 1, 1970
  console.log(new Date(0));
  console.log(new Date(3 * 24 * 60 * 60 * 1000));

  const past = new Date(3 * 24 * 60 * 60 * 1000);
  // Get date components - Full year / Month / Date of the month / Dat of the week
  console.log(past.getFullYear());
  console.log(past.getMonth());
  console.log(past.getDate());
  console.log(past.getDay());

  // Get time components - Hour / Minute / Second / MillionSecond
  const future = new Date(2037, 10, 42, 16, 23, 5, 30);
  console.log(future.getHours());
  console.log(future.getMinutes());
  console.log(future.getSeconds());
  console.log(future.getMilliseconds());

  /* All getters have their equivalent setters */

  // Get the ISO formatted Date & Time String
  console.log(future.toISOString());
  // Get the relative time stamp
  console.log(future.getTime());
  // Or use it when work with arithmetic operators
  console.log(Number(future), +future);
  // Shorthand to get the relative time stamp for current date & time
  console.log(Date.now());
}

// internalization()
function internalization() {
  console.log("-----------INTL DATES-----------")
  // Format the date (with default date items)
  const future = new Date(2037, 0, 12, 16, 23, 5, 30);
  console.log(new Intl.DateTimeFormat('en-US').format(future));
  console.log(new Intl.DateTimeFormat('en-GB').format(future));
  console.log(new Intl.DateTimeFormat('zh-CN').format(future));
  console.log(new Intl.DateTimeFormat('ar-SY').format(future));

  // Format with customized items
  const dateTimeItems = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  console.log(new Intl.DateTimeFormat('en-US', dateTimeItems).format(future));
  console.log(new Intl.DateTimeFormat('en-GB', dateTimeItems).format(future));
  console.log(new Intl.DateTimeFormat('zh-CN', dateTimeItems).format(future));
  console.log(new Intl.DateTimeFormat('ar-SY', dateTimeItems).format(future));

  // Use navigator.language to get the locale from the serving browser
  (typeof window !== 'undefined') ? console.log(navigator.language) : null;

  console.log("-----------INTL NUMBERS-----------");
  // Format numbers
  const num = 392843472.72;
  console.log(new Intl.NumberFormat('en-US').format(num));
  console.log(new Intl.NumberFormat('de-DE').format(num));
  console.log(new Intl.NumberFormat('ar-SY').format(num));
  console.log(new Intl.NumberFormat('zh-TW').format(num));
  // Format number with specified speed style
  const numSpeed = {style:"unit", unit:"mile-per-hour",};
  console.log('-------SPEED-------')
  console.log(new Intl.NumberFormat('en-US', numSpeed).format(60));
  console.log(new Intl.NumberFormat('de-DE', numSpeed).format(60));
  console.log(new Intl.NumberFormat('ar-SY', numSpeed).format(60));
  console.log(new Intl.NumberFormat('zh-TW', numSpeed).format(60));
  // Format number with specified currency style
  const numCurrency = {style:"currency", currency:"USD",};
  console.log('------CURRENCY------')
  console.log(new Intl.NumberFormat('en-US', numCurrency).format(6000));
  console.log(new Intl.NumberFormat('de-DE', numCurrency).format(6000));
  console.log(new Intl.NumberFormat('ar-SY', numCurrency).format(6000));
  console.log(new Intl.NumberFormat('zh-TW', numCurrency).format(6000));

}

// timers();
function timers() {
  // run setTimeout to execute a behavior after the specified delay;
  setTimeout(() => console.log('This is a 3 seconds delay!'), 3000);
  console.log('Wait for 3 seconds!');
  // Params after the timeout will be parsed into the call back function to use
  setTimeout((name) => console.log(`This is a 3 seconds delay for ${name}!`), 3000, "Samuel");

  // To cancel a timer
  const timerValid = setTimeout(() => console.log("This is making sense!"), 4000);
  const timerInvalid = setTimeout(() => console.log("This is nonsense!"), 500);
  if (true) clearTimeout(timerInvalid);

  // To run a function over and over again every interval of time
  setInterval(() => console.log(new Date()), 1000);
}