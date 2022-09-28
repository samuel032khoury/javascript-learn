'use strict';
// advFunc()
function advFunc() {
  // To set a default value for parameters of a function, use = after parameter declarations
  function printColor(r, g = 255, b = 255, alpha = 255) {
    console.log(r, g, b, alpha);
  }

  // To skip a default parameter, set it as `undefined` when calling the function
  printColor(0, undefined, 50);

  // Higher order functions are functions that receives a function as one parameter, or functions return another
  // A callback function is the function as a parameter being passed in to another higher-order function.
  // To get the name of the callback function, use `{fn}.name`


  /* The call and apply Methods -- Set the pointer of `this` to the specified object when calling */
  function book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
  }

  const lufthansa = {
    airline: 'Lufthansa', iataCode: 'LH', bookings: [],
  };

  const eurowings = {
    airline: 'Eurowings', iataCode: 'EW', bookings: [],
  };

  const swiss = {
    airline: 'Swiss Air Lines', iataCode: 'LX', bookings: [],
  };

  // `book(23, 'Sarah Williams')` does NOT work,  `this` in function `book` is not pointing correctly right now...

  // Apply method
  const flightData = [583, 'George Cooper'];
  book.apply(lufthansa, flightData);
  console.log(lufthansa);

  // Call method
  book.call(eurowings, ...flightData);
  console.log(eurowings);

  book.call(swiss, 239, 'Mary Cooper');
  console.log(swiss);

  /* Bind method -- returns a function that binds the pointer of `this` to the specified object all the time */
  const eurowingsBooking = book.bind(eurowings);
  console.log(eurowings) // bind() will not add the method to the object
  try {
    // `book(345, 'Alex Robinson')` still fails because bind() doesn't mutate the original function
    book(345, 'Alex Robinson')
  } catch (err) {
    console.log(err.message)
  }
  eurowingsBooking(345, 'Alex Robinson');
  console.log(eurowings)

  // bind() can also set binding parameters for the resulting function
  const eurowings345Booking = book.bind(eurowings, 345);
  eurowings345Booking('Bobby Holtzon');
  console.log(eurowings)

  // If a function simply don't use `this` at all, use bind to set the first object as null and set
  // the rest of the partial parameters.
  const calTax = (rate, price) => {
    return price * (1 + ((rate > 1) ? rate * .01 : rate));
  }
  console.log(calTax(6, 100))
  console.log(calTax(0.06, 100))
  const calConsTax = calTax.bind(null, 0.06);
  console.log(calConsTax(100))
  console.log(calConsTax(100))

  // If an event handler contains `this`, it will point to the trigger element instead of a model object,
  // regardless of if it is a method of the object
  lufthansa.plane = 300;
  lufthansa.buyPlane = function () {
    if (this.airline && !this.plane) {
      this.plane = 0
    }
    this.plane++;
    const printOut = `${this.airline} purchased 1 plane, now they have ${this.plane} planes`;
    typeof window !== 'undefined' ? alert(printOut) : console.log(printOut);
  }

  if (typeof window === 'undefined') {
    lufthansa.buyPlane()
  } else {
    // This isn't working -- because it's now the trigger calls the lufthansa's function `buyPlane`
    // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane)

    // Use nested function to ensure it's the correct object, rather than the trigger elements, calling the function
    document.querySelector('.buy').addEventListener('click', function () {
      lufthansa.buyPlane()
    })

    // Or use bind function
    document.querySelector('.buyAlt').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))
  }

}

// codingChallenge1()
function codingChallenge1() {
  /* Let's build a simple poll app!

   A poll has a question, an array of options from which people can choose, and an array with the number of replies
   for each option. This data is stored in the starter object below.

   Here are your tasks:

   1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:

     1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like
     this:
       What is your favourite programming language?
       0: JavaScript
       1: Python
       2: Rust
       3: C++
       (Write option number)

     1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT
     POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense
     (e.g answer 52 wouldn't make sense, right?)

   2. Call this method whenever the user clicks the "Answer poll" button.

   3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input
   (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array
   as it is, using console.log(). This should be the default option. If type is 'string', display a string like
   "Poll results are 13, 2, 4, 1".

   4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

   BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the
   'string' option. Do NOT put the arrays in the poll object! So what should the `this` keyword look like in this
   situation?
   BONUS TEST DATA 1: [5, 2, 3]
   BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
   */
  const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0), // This generates [0, 0, 0, 0].
    registerNewAnswer() {
      let answer;
      do {
        if (answer !== undefined) { alert('Invalid answer, please enter again!');}
        answer = prompt(this.question + '\n' + this.options.join('\n') + "\n(Write option number)");
        answer = answer === '' ? NaN : Number(answer);
      } while (Number.isNaN(answer) || answer < 0 || answer >= this.options.length);
      this.answers[answer]++;
      this.displayResults('string');
    },
    displayResults(type = 'array') {
      if (type === 'array') {
        console.log(this.answers);
      } else if (type === 'string') {
        console.log(`Poll results are ${this.answers.join(', ')}`)
      } else {
        alert('Fail to recognize the type.')
      }
    },
  }

  poll.displayResults.call({answers: [5, 2, 3]}, 'array')
  poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string')
  if (typeof window === 'undefined') {return}
  ;
  document.querySelector('.poll').addEventListener('click', () => {poll.registerNewAnswer()})
}

// closures()
function closures() {
  // To define a one-time-only function (Or Immediately Invoked Function Expressions/IIFE)
  (function () {console.log('This will never run again')})();
  // Or... Use an arrow function
  (() => {console.log('This will also never run again')})();
  // We can use IIFE to create private variables
  // This can also be achieved by having a sub-block for the private variables
  {const privateVar = true}
  try {
    console.log(privateVar)
  } catch (e) {
    console.log('No access!')
  }

  // Closures
  const secureBooking = function () {
    let passengerCount = 0;

    return function () {
      passengerCount++;
      console.log(passengerCount);
    }
  }
  const booker = secureBooking();
  // Any function always has access to the variable environment of he execution context in which the function was
  // created, even after that execution context is gone.
  booker();
  booker();
  // Note: Closures has a higher priority over the scope chain -- as the following variable doesn't affect the
  // function return value
  const passengerCount = 1000;
  booker();

  // Timeout Example
  const boardPassengers = function (numPassenger, numGroup, waitTime) {
    const groupSize = numPassenger / numGroup;
    // function within the timer runs independently of the `boardPassengers`
    // This creates a closure because it always has the access to `numPassenger`, `numGroup`, and `groupSize`.
    setTimeout(function () {
      console.log(`We are now starting boarding`);
      console.log(`We have ${numPassenger} in total and you will board in ${numGroup} groups,` +
        `now the first ${groupSize} passengers please come to the gate!`);
    }, waitTime * 1000);
    console.log(`We will start boarding in ${waitTime} seconds`);
  }
  boardPassengers(180, 3, 2);
}

codingChallenge2()
function codingChallenge2() {
  /*
   Take the IIFE below and at the end of the function, attach an event listener that changes the color of the
   selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

   And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN
   exactly the callback function is executed, and what that means for the variables involved in this example.
   */
  (function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', () => {
      header.style.color = 'blue';
    })
  })();
}