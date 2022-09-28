'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  orderDelivery: function ({starterIndex, mainIndex, time, address}) {
    const resp = `Order received! ${this.mainMenu[mainIndex]} and` +
      `${this.starterMenu[starterIndex]} will be delivered to ${address} at ${time}!`
    console.log(resp)
  },

  orderPasta: function (ing1, ing2, ing3) {
    alert(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`);
  },

  orderPizza: function (mainIng, ...otherIng) {
    console.log(`Main ingredient: ${mainIng}`);
    console.log(otherIng);
    // Notice joining an array with a string will automatically destruct the array
    console.log(`Other ingredients: ${otherIng}`);
  },
  openingHours: {
    thu: {
      open: 12, close: 22,
    }, fri: {
      open: 11, close: 23,
    }, sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [['Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski'],
    ['Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze']],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {team1: 1.33, x: 3.25, team2: 6.5},
};

// arrayDestruction()
function arrayDestruction() {
  // Value assignment
  const arr = [2, 3, 4];
  const a = arr[0];
  const b = arr[1];
  const c = arr[2];
  console.log(a, b, c);

  // For of loop
  const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
  for (const item of menu) console.log(item);
  // Work with indices
  for (const [index, item] of menu.entries()) console.log(index + 1, item);

  // Array destruction
  const [x, y, z] = arr;
  console.log(x, y, z)
  console.log(arr)

  // Ignore intermediate values
  const [first, , third] = restaurant.categories;
  const [, second] = restaurant.categories;
  console.log(first, second, third)

  // Array swap (using destruction)
  let [secondary, , main] = restaurant.categories;
  console.log(main, secondary);
  [main, secondary] = [secondary, main];
  console.log(main, secondary);

  // Destruct after function call
  const [staterDish, mainDish] = restaurant.order(2, 0)
  console.log(staterDish, mainDish)

  // Destruct a nested array
  const nested = [2, 4, [5, 6]]
  const [i, , j] = nested
  console.log(i, j)
  const [p, , [q, r]] = nested
  console.log(p, q, r)

  let s, t, m
  // Overflowing assignment leads to `undefined` value
  [s, t, m] = [30, 40];
  console.log(s, t, m);
  // Or..., use default values
  [s = 1, t = 1, m = 1] = [30, 40];
  console.log(s, t, m);
}

// objectDestruction()
function objectDestruction() {
  // Fetching object properties
  const {name, openingHours, categories} = restaurant;
  console.log(name, openingHours, categories);

  // Fetching && Renaming object properties
  const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
  console.log(restaurantName, hours, tags);

  // Default value for object destruction
  const {menu = [], starterMenu: starters = []} = restaurant;
  console.log(menu, starters);

  // Mutate variables during object destruction
  let a = 111;
  let b = 999;
  const obj = {a: 23, b: 7, c: 14};
  /*{a , b} = obj `Got SyntaxError: Unexpected token =`*/
  /*Enclosed by parenthesis to overwrite*/
  ({a, b} = obj);
  console.log(a, b)

  // Nested objects
  const {fri: fridayHour} = hours
  console.log(fridayHour);
  const {fri: {open: friOpen, close: friClose}} = hours
  console.log(friOpen, friClose);

  // Method with an object as parameters (default value can be utilized in method signature)
  restaurant.orderDelivery({
    time: '22:30', address: 'Via del Sole, 21', mainIndex: 2, starterIndex: 2,
  })
}

// spreadOperator()
function spreadOperator() {
  const arr = [7, 8, 9];
  const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
  console.log(badNewArr);

  // Spread operator
  const newArr = [1, 2, ...arr];
  console.log(newArr);
  console.log(...newArr);

  const newMenu = [...restaurant.mainMenu, 'Gnocci'];
  console.log(newMenu)

  // Copy an (a shallow) array
  const mainMenuCopy = [...restaurant.mainMenu];
  mainMenuCopy[0] = 'Steak';
  console.log(mainMenuCopy, restaurant.mainMenu)

  // Join 2 arrays
  const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
  console.log(menu)

  // Iterables: array, strings, maps, sets, NOT objects
  const str = 'SAMUEL';
  const chars = [...str, "J", 'I'];
  console.log(chars)

  // Real word example
  if (typeof window !== `undefined`) {
    alert(`Let's make pasta!`)
    const ingredients = [prompt(`Ingredient 1?`),
      prompt(`Ingredient2?`), prompt(`Ingredient3?`)]
    restaurant.orderPasta(...ingredients)
  }

  // Iterate on Objects to copy (Since ES2018)
  const newRestaurant = {
    foundedIn: 1998, founder: 'Guiseppe', ...restaurant,//shallow copied
  }
  newRestaurant.name = 'Ristorante Roma';
  console.log(restaurant);
  console.log(newRestaurant);
}

// restOperator()
function restOperator() {
  // Rest operator, because on LEFT side of equal sign
  const [a, b, ...others] = [1, 2, 3, 4, 5];
  console.log(a, b, others);

  // Use Rest and Destruction together
  const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
  console.log(pizza, risotto, otherFood);

  /* Rest element must be last element!! */

  // Rest on Objects
  const {sat, ...weekdays} = restaurant.openingHours;
  console.log(weekdays)

  // Rest on functions
  const sum = (...numbers) => {
    let ret = 0
    numbers.forEach((element) => {
      ret += element;
    })
    console.log(ret)
  }

  sum(2, 3);
  sum(5, 3, 7, 2);
  sum(8, 2, 5, 3, 2, 1, 4);

  const sumArray = [3, 5, 7];
  sum(...sumArray);

  restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
  restaurant.orderPizza('chess');

}

// booleanNullish()
function booleanNullish() {
  console.log('----OR----');
  // Boolean operator can be applied on ANY, can return ANY, and follows short-circuiting
  console.log(3 || 'Samuel');
  console.log(0 || '' || true || 1);
  // Fall back to the last element
  console.log(undefined || null || NaN);

  const guestCount = restaurant.numGuests ? restaurant.numGuests : 10;
  console.log(guestCount);

  restaurant.numGuests = 30;
  const newGuestCount = restaurant.numGuests ? restaurant.numGuests : 10;
  console.log(newGuestCount);

  restaurant.numGuests = null;
  const fasterGuestCount = restaurant.numGuests || 10;
  console.log(fasterGuestCount);

  /* Note however, both don't work if restaurant.numGuests===0 */

  console.log('----AND----');
  console.log(true && 1 && '' && NaN);
  // Gets short circuit at the first element
  console.log(undefined && null && NaN);
  // Or fall back if everything is truthy
  console.log(true && 1 && 'fall back' && [1, 2, 3]);

  // Regular existence check
  if (restaurant.orderPizza) {
    restaurant.orderPizza('Pork sausage', 'Pineapple');
  }

  // Faster existence check
  restaurant.orderPizza && restaurant.orderPizza('Mozzarella', 'Corns');

  console.log('----NCO----')
  // Nullish Coalescing Operator -- rejects Nullish value: null, undefined
  let zero = 0
  console.log(zero || 10); // This is not what we want
  console.log(zero ?? 10) // This works correctly
  zero = undefined
  console.log(zero ?? 10) // Works for discarding undefined value

  // Ternary operator on nullish coalescing -- Can also be used in if statement
  new Array(...[undefined, null, 0, "", false, NaN, 30, true, "Hello"]).forEach((value) => {
      value != undefined ? console.log(`${value} is NOT a nullish value`) : console.log(`${value} IS a nullish value`)
    }
  )

  console.log('----BAO----')
  // Boolean Assignment Operator
  let T = true;
  let F = false;

  T ||= F;
  console.log(T);

  T ??= F;
  console.log(T);

  T &&= F;
  console.log(T);

  T ||= F;
  console.log(T);


  // BAO on non-boolean value
  const restaurant1 = {
    name: 'Capri', numGuests: 20, Address: '280 Sunset Blvd.', newCustomerOffer: "$20"
  };

  const restaurant2 = {
    name: 'La Piazza', owner: 'Giovanni Rossi', numOfEmployee: 0,
  };

  restaurant1.numGuests = restaurant1.numGuests || 10;
  restaurant2.numGuests = restaurant2.numGuests || 10;

  // OR assignment operator -- Short-handed way of above logic (assign if the value is falsy)
  restaurant1.owner ||= 'Aurora Giulia'
  restaurant2.owner ||= ' Leonardo Tunmena'

  // NC assignment operator (assign if the value is nullish)
  restaurant1.numOfEmployee ??= 20
  restaurant2.numOfEmployee ??= 30

  // AND assigment operator ((re)assign if the value exists)
  restaurant1.newCustomerOffer &&= "<Register to view>";
  restaurant2.newCustomerOffer &&= "<Register to view>";

  console.log(restaurant1);
  console.log(restaurant2);

}

// codingChallenge1()
function codingChallenge1() {

  /* We're building a football betting app!
     Suppose we get data(above) from a web service about a certain game. In this challenge we work with the data.
     So here are your tasks: */

  /* 1. Create one player array for each team (variables 'players1' and 'players2')*/
  const [players1, players2] = game.players;
  console.log(players1, players2);
  /* 2. The first player in any player array is the goalkeeper and the others are field players.
        For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers')
        with all the remaining 10 field players*/
  const [gk, ...fieldPlayers] = players1;
  console.log(gk);
  console.log(fieldPlayers);
  /* 3. Create an array 'allPlayers' containing all players of both teams (22 players)*/
  const allPlayers = [...players1, ...players2];
  console.log(allPlayers);
  /* 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final')
        containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'*/
  const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
  console.log(players1Final)
  /* 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2') */
  const {team1, x: draw, team2} = game.odds;
  console.log(team1, draw, team2)

  /* 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each
        of them to the console, along with the number of goals that were scored in total (# of player names passed in)

        TEST DATA: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with
        players from game.scored */
  function printGoals(...players) {
    console.log(...players, players.length);
  }

  printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
  /* 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win,
        WITHOUT using an if/else statement or the ternary operator.*/
  // IDEA： convert （team1 < team2? console.log('Team1'):console.log('Team2')）
  console.log(((team1 < team2) && 'Team1') || 'Team2');
  // Prove the correctness
  console.log(((team1 + 10 < team2) && 'Team1') || 'Team2');

}

// optionalChaining()
function optionalChaining() {
  // Check properties of something that may not exist
  if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open)
  if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open)
  if (restaurant.city && restaurant.city.streetAddress) console.log(restaurant.city.streetAddress.zipcode)

  // Optional Chaining -- The clause continues only if the optional exists, return `undefined` otherwise
  console.log((restaurant.openingHours?.fri?.open));
  console.log((restaurant.openingHours?.mon?.open));
  console.log((restaurant.city?.streetAddress?.zipcode));

  // Example: List all opening time of the restaurant
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  for (const day of days) {
    console.log(restaurant.openingHours[day]?.open ?? 'closed')
  }

  // Optional Chaining on function call
  console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
  console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

  // Optional Chaining usage on arrays -- to check if arrays is empty
  const users = [{name: 'Sam', email: 'email@sam.io'}];
  console.log((users[0] && (users[0].name || 'User name undefined')) ?? 'User array is empty');
  console.log(users[0]?.name ?? 'No information')

  users[0].name = undefined
  console.log((users[0] && (users[0].name || 'User name undefined')) ?? 'User array is empty');
  console.log(users[0]?.name ?? 'No information')

  users.pop()
  console.log((users[0] && (users[0].name || 'User name undefined')) ?? 'User array is empty');
  console.log(users[0]?.name ?? 'No information')

}

// objects()
function objects() {
  // Enhanced Object Literals
  const schedule = {
    Tue: '10:30a', Fri: '10:30a', Sat: '10:50a'
  };

  const varNameTemplate = ['var1', 'var2', 'var3'];

  // To include an object, or ANY type, (schedule) in another object (flight)...
  const flight = {
    Identifier: 'AA91',
    From: 'NYC',
    To: 'LAX',
    Duration: '5h30min', // variable name will match automatically -- equivalent to write `schedule: schedule,`
    schedule,

    // new (simpler) object methods syntax
    bookSeats(seats) {
      console.log(`Seats ${seats} has been successfully booked!`)
    },

    // !OBJECT PROPERTY NAME! can be calculated, by enclosing the name by square brackets.
    [varNameTemplate[0]]: 'This exemplifies variable name calculation',
  };
  console.log(flight.schedule);
  flight.bookSeats('15A');
  console.log(flight.var1)

  // Object Property Names
  const openingHours = restaurant.openingHours;
  const openingDays = Object.keys(openingHours);
  console.log(openingDays);

  // Loop on object property keys
  let openStr = `We are open on ${openingDays.length} days a week: `
  for (const openDay of Object.keys(openingHours)) {
    openStr += `${openDay} `;
  }
  console.log(openStr)

  // Object Property Values
  const values = Object.values(openingHours);
  console.log(values)

  // Object Entries() method returns key-value pairs
  const entries = Object.entries(openingHours);
  console.log(entries);

  // Loop on object entries
  for (const [day, {open, close}] of entries) {
    console.log(`${day}: ${open}~${close}`)
  }
}

// codingChallenge2()
function codingChallenge2() {
  /* Let's continue with our football betting app!*/

  /* 1. Loop over the game.scored array and print each player name to the console, along with the goal number
        (Example: "Goal 1: Lewandowski")*/
  for (const [id, player] of game.scored.entries()) {
    console.log(`Goal ${id + 1}: ${player}`)
  }
  /* 2. Use a loop to calculate the average odd and log it to the console
        (We already studied how to calculate averages, you can go check if you don't remember)*/
  const oddsValues = Object.values(game.odds);
  let sum = 0;
  oddsValues.forEach(element => sum += element)
  const avg = sum / oddsValues.length
  console.log(avg)
  /* 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
        Odd of victory Bayern Munich: 1.33
        Odd of draw: 3.25
        Odd of victory Borrussia Dortmund: 6.5
        Get the team names directly from the game object, don't hardcode them (except for "draw").
        HINT: Note how the odds and the game objects have the same property names 😉*/
  for (const [team, odds] of Object.entries(game.odds)) {
    const str = (game[team] && `Odd of victory ${game[team]}: ${odds}`) || (team === 'x' && `Odd of draw: ${odds}`) || ''
    console.log(str)
  }
  /* BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties,
        and the number of goals as the value. In this game, it will look like this:
        {
          Gnarby: 1,
          Hummels: 1,
          Lewandowski: 2
        }*/
  const bonus = {}
  for (const player of game.scored) {
    bonus[player] ? bonus[player]++ : bonus[player] = 1;
  }
  // console.log(bonus)
}

// sets()
function sets() {
  // Set stores non-duplicated values
  const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza'])
  console.log(ordersSet)
  // Calculate the size of the set
  console.log(ordersSet.size)

  // Check the existence of an element
  console.log(ordersSet.has('Pizza'));
  console.log(ordersSet.has('Bread'));

  // Add elements to a set
  ordersSet.add('Garlic Bread');
  console.log(ordersSet);

  // Delete an element from the set
  ordersSet.delete('Risotto');
  console.log(ordersSet);

  // Set is NOT indexed and set element cannot be retried via indices
  console.log(ordersSet[0])

  // Use clear to empty a set
  const clearSet = new Set(['Use', 'clear', 'method', ' to', 'empty', 'a', 'set'])
  clearSet.clear()
  console.log(clearSet)

  // Set is iterable
  for (const order of ordersSet) console.log(order)

  // Convert a set to a list
  const orderListFromSet = [...ordersSet]
  console.log(orderListFromSet)

  // Counting unique values in a list
  const diffValue = [0, 3, 3, 2, 9, 1, 2, 3, 1, 3, 2, 4, 1, 2, 7, 3]
  console.log((new Set(diffValue)).size)
}

// maps()
function maps() {
  // Maps are key-value pairs
  // Different from an object, we can use ANY data type as the keys of a map
  const egMap = new Map();
  // Add items to the map : SET() method returns the resulting map
  console.log(egMap.set('name', 'Classico Italiano'));
  // Chaining SET
  egMap.set(1, 'Firenze, Italy').set(2, 'Lisbon, Portugal').set(3, 'New York, U.S.');
  console.log(egMap);
  egMap.set('open', 11).set('close', 23).set(true, 'We are open :D').set(false, 'We are closed :/');

  // Retrieve values via map key : GET()
  console.log(egMap.get('name'))
  console.log(egMap.get(false))

  // Example
  const time = 21;
  console.log(egMap.get(time > egMap.get('open') && time < egMap.get('close')))

  // Check the existence in the map
  console.log(egMap.has('name'))
  console.log(egMap.has('location'))

  // Delete items from the map
  egMap.delete(3);
  console.log(egMap);

  // Query the map size
  console.log(egMap.size)

  // Empty the map
  egMap.clear()
  console.log(egMap.size)

  // Note if using reference data type as a key of the map, the reference should be the same when retrieving.
  const arr = [1, 2];
  egMap.set(arr, 'Test!');
  console.log(egMap.get([1, 2])); // This returns undefined because it doesn't have the same reference
  console.log(egMap.get(arr));

  // Map Construction
  const question = new Map([['question', 'What is the best programming language in the world?'],
    [1, 'C'], [2, 'Java'], [3, 'JavaScript'], ['correct', 2],
    [true, "This is the correct answer🎉"], [false, "Please try again :("]])
  console.log(question)

  // Iterate on the Map
  for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`)
  }

  // Covert Objects to a Map
  const hoursMap = new Map(Object.entries((restaurant.openingHours)))
  console.log(hoursMap)

  // Quiz App
  if (typeof window !== `undefined`) {
    alert(question.get('question'));
    let availOptions = '';
    for (const [key, value] of question) {
      if (typeof key === 'number') availOptions += `Answer ${key}: ${value}\n`
    }
    alert(availOptions);
    const answer = Number(prompt('Your answer'));
    alert(`You chose ${question.get(answer)}! ${question.get(answer === question.get('correct'))}`);
  }

  // Convert Map to Array
  console.log([...question])
  console.log([...question.entries()])
  console.log([...question.keys()])
  console.log([...question.values()])
}

// codingChallenge3()
function codingChallenge3() {
  const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
  ]);
  /* Let's continue with our football betting app!
        This time, we have a map with a log of the events that happened during the game.
        The values are the events themselves, and the keys are the minutes in which each event happened.
        Note: a football game has 90 minutes plus some extra time.*/

  /* 1. Create an array 'events' of the different game events that happened (no duplicates)*/
  const events = [...(new Set(gameEvents.values()))]
  console.log(events)
  /* 2. After the game has finished, one was found that the yellow card from minute 64 was unfair.
          Remove this event from the game events log.*/
  gameEvents.delete(64);
  console.log(gameEvents)
  /* 3. Print the following string to the console: "An event happened, on average, every 9 minutes"
          (keep in mind that a game has 90 minutes)*/
  console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`)
  /*4. Loop over the events and log them to the console, marking whether it's in the first or the second half of the game
      Example: `[FIRST HALF] 17: ⚽️ GOAL` */
  for (const [time, event] of gameEvents.entries()) {
    console.log(`[${time < 45 ? "FIRST HALF" : (time < 90 ? "SECOND HALF" : "EXTRA")}] ${time}: ${event}`)
  }
}

strings()
function strings() {
  const airline = "American Airline";
  const plane = "B737";

  // Query the length of a string
  console.log(plane.length);

  // Indexing a string
  console.log(plane[0]);
  console.log(plane[1]);
  console.log(plane[2]);
  console.log('A320'[3]);

  // Locate the first occurrence of a char in the string
  console.log(airline.indexOf('r'));
  // Locate the last occurrence of a char in the string
  console.log(airline.lastIndexOf('r'));
  // Search word (case-sensitive)
  console.log(airline.indexOf('american'));
  console.log(airline.indexOf('American'));
  // Get the substring using SLICE()
  console.log(airline.slice(9));
  console.log(airline.slice(9, 12));
  // Reverse indexing
  console.log(airline.slice(-2));
  console.log(airline.slice(2, -4));

  // Manipulating string cases
  console.log(airline.toUpperCase());
  console.log('CHINA'.toLowerCase());
  console.log('china'[0].toUpperCase() + 'china'.slice(1));

  // Compare two strings -- 0 if same; 1 if  `this` is  alphabetically greater; -1 if `this` is alphabetically smaller
  console.log("abc".localeCompare('abd'));
  console.log("abe".localeCompare('abd'));
  console.log("this is smaller".localeCompare('THIS IS BIGGER'));

  // Trim extra ending spaces
  console.log('New Line \n');
  console.log('New Line \n'.trim());

  // Replacing (the first occurrence)
  const priceGB = '288,97£';
  const priceUS = priceGB.replace(',', '.').replace('£', '$');
  console.log(priceUS);

  // Replacing (all occurrences)
  const boardingPA = 'Come to boarding door 23. Boarding door 23!';
  console.log(boardingPA);
  console.log(boardingPA.replace('door', 'gate'));
  console.log(boardingPA.replaceAll('door', 'gate'));

  // Replacing with regular expression
  console.log(boardingPA.replace(/door/g, 'gate'));
  const emergency = 'Call 110 when you need place, call 120 when you need EMS';
  console.log(emergency);
  console.log(emergency.replace(/([0-9]){3}/, '911'));
  console.log(emergency.replace(/([0-9]){3}/g, '911')); // g stands for replacing globally
  console.log(emergency.replace(/(\d)+/g, '911'));

  // Check the composition of a string
  const newPlane = 'Boeing B737MAX'
  console.log(newPlane.includes('737'));
  console.log(newPlane.includes('777'));
  console.log(newPlane.startsWith('Boeing'));
  console.log(newPlane.startsWith('Airbus'));
  console.log(newPlane.endsWith('neo'));
  console.log(newPlane.endsWith('MAX'));

  // String split
  console.log('a+very+nice+string'.split('+'))
  const [firstName, lastName] = "Samuel Ji".split(' ');
  console.log(`${lastName}, ${firstName}`);

  // String joint
  console.log(['Welcome,', 'Mr.', lastName.toUpperCase()].join(' '));

  // Padding a string
  const message = 'Go to gate 23!'
  console.log(message.padStart(25, '+'))
  console.log(message.padStart(25, '+').length)
  console.log(message.padEnd(25, '-'))

  // Example: Mask credit card number
  const maskCreditCard = function (number) {
    const str = String(number);
    return str.slice(-4).padStart(str.length, '*');
  }
  console.log(8573345336597896)
  console.log(maskCreditCard(8573345336597896))

  // Repeat
  const weatherWarning = 'Bad Weather... All Departures Delayed... '
  console.log(weatherWarning.repeat(3))
}

// stringExercise()
function stringExercise() {
  // Flights data
  const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;'
    + '11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
  const flightsList = flights.split('+');
  const getCode = str => str.slice(0, 3).toUpperCase();
  for (const flight of flightsList) {
    let [status, takeoff, landing, time] = flight.split(';');
    status = status.replaceAll('_', ' ')
    if (status.toLowerCase().includes('delayed')) {
      status = '🔴' + status
    }
    takeoff = getCode(takeoff)
    landing = getCode(landing)
    time = `(${time})`
    const display = `${status} ${takeoff} ${landing} ${time}`.padStart(36)
    console.log(display)
  }
}

// codingChallenge4()
function codingChallenge4() {
  if (typeof window === `undefined`) {return null}
  /* Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
     The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the
     button is pressed.

      TEST DATA
        underscore_case
        first_name
        Some_Variable
        calculate_AGE
        delayed_departure

      SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
        underscoreCase      ✅
        firstName            ✅✅
        someVariable        ✅✅✅
        calculateAge        ✅✅✅✅
        delayedDeparture    ✅✅✅✅✅

      HINT 1: Remember which character defines a new line in the textarea 😉
      HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
      HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working
  */
  document.querySelectorAll('.hidden').forEach((el) => el.classList.remove('hidden'))

  function convert2Camel(data) {
    if (data.length === 0 || data.includes('✅')) {return data}
    data = data.trim().split('\n');
    let maxLength = 0;
    let ret = '';
    for (const [strID, strItem] of data.entries()) {
      const [firstPart, ...restPart] = strItem.trim().split('_');
      for (const [subStrID, subStringItem] of restPart.entries()) {
        restPart[subStrID] = subStringItem[0].toUpperCase() + subStringItem.slice(1);
      }
      const jointString = firstPart.toLowerCase() + restPart.join('')
      data[strID] = jointString
      maxLength = Math.max(maxLength, data[strID].length)
    }
    for (const [strID, strItem] of data.entries()) {
      const currString = strItem.padEnd(maxLength + 4, ' ') + '✅'.repeat(strID + 1) +'\n';
      console.log(currString)
      ret += currString;
    }
    console.log(maxLength)
    return ret
  }

  const inputArea = document.getElementById('input')
  document.querySelector('#submit').addEventListener('click', ()=> {
    inputArea.value = convert2Camel(inputArea.value)
  });
}