'use strict';

// arrayUtil()
function arrayUtil() {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  // Use SLICE to get the subarray of the original -- This returns a new array
  console.log(arr.slice(2));
  console.log(arr.slice(2, 4));

  // An alternative way to shallow copy an array
  console.log(arr.slice())

  //  Use SPLICE to cut off the sub portion from the original array -- This mutates the original and return the cut-off
  console.log(arr.splice(4, 2));
  console.log(arr);
  console.log(arr.splice(-1));
  console.log(arr);

  // Use REVERSE to reverse the array -- This mutates the original!
  console.log(arr.reverse())
  console.log(arr)

  // Use JOIN to connect array items.
  console.log(arr.join('-'))

  // Use CONCAT to append one array to the other -- This returns a new array
  console.log(arr.concat(['z', 'x', 'y']))

  // Use at to get the value at the index -- Alternative of bracket indexing
  // We can use .at(-1) to get the last element of the array
  console.log(arr.at(-1));  // While console.log(arr[-1]) doesn't work

  // use forEach() to loop over the array, and execute the call back function in each iteration
  // NOTE: Continue or Break do not work on forEach()
  const bankActivities = [200, 450, -400, 3000, -650, -130, 70, 1300];
  bankActivities.forEach((activity) => {
    if (activity > 0) { console.log(`You deposited $${activity}`) } else {console.log(`You withdraw $${Math.abs(activity)}`)}
  })

  // use forEach() with current index -- Strictly follow the param order : currElement - currId - workingArr
  bankActivities.forEach((activity, index, array) => {
    const actId = `Activity ${index + 1}: `;
    if (activity > 0) { console.log(`${actId}You deposited $${activity}`) } else {console.log(`${actId}You withdraw $${Math.abs(activity)}`)}
  })

  // forEach also works on maps and sets
  const currencies = new Map([['USD', 'United States dollar'], ['EUR', 'Euro'], ['GBP', 'Pound sterling'],]);
  currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`)
  })
  // The keys of a set are identical to their values
  const shapes = new Set(['circle', 'rectangle', 'square', 'triangle', 'pentagon']);
  shapes.forEach((shape, index, set) => {
    console.log(`${index}: ${shape}`)
  })
}

// codeChallenge1()
function codeChallenge1() {
  /* Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored
   the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an
   adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

   Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the
   following things:
       1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create
           a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice
           to mutate function parameters)
       2. Create an array with both Julia's (corrected) and Kate's data
       3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5
        years old") or a puppy ("Dog number 2 is still a puppy 🐶")
       4. Run the function for both test datasets

   TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
   TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]*/
  function checkDogs(dogsJulia, dogsKate) {
    const juliaCorrected = dogsJulia.slice(1, -2);
    const dogsJoint = juliaCorrected.concat(dogsKate);
    dogsJoint.forEach((age, id) => age >= 3 ? console.log(`Dog number ${id + 1} is an adult, and is ${age}` +
      `years old`) : console.log(`Dog number ${id + 1} is still a puppy 🐶`))
    console.log("----------------END OF STATS----------------")
  }

  checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
  checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

}

// arrayTrans()
function arrayTrans() {
  const eurToUsd = 1.1;
  const usdBills = [200, 450, -400, 3000, -650, -130, 70, 1300];
  // Map method
  const eurBills = usdBills.map(item => Math.trunc(item * eurToUsd * 100) / 100);
  console.log(eurBills)
  // Map can also work with current index -- Strictly follow the param order : currElement - currId - workingArr
  const usdBillsDetails = usdBills.map((bill, id) =>
    (bill > 0) ? `Bill ${id + 1}: deposit ${bill}` : `Bill ${id + 1}: withdraw ${-bill}`
  )
  console.log(usdBillsDetails)

  // Filter method
  const spendingBill = usdBills.filter(item => item > 0)
  console.log(spendingBill)

  // Reduce method - boil down elements in an array to one single value
  // The first param of reduce() is the call-back function
  //    The first param of the callback function is the accumulator, and then are the current item + index + workingArr
  // The second param of reduce() is the initial value of the accumulator (default to the first element in the array)
  const balance = usdBills.reduce((acc, cur) => acc + cur);
  console.log(balance)
  console.log(usdBills.reduce((acc, cur) => acc + cur, 1000));

  // Use reduce to get the maximum value of the array -- starting from the first (default reducing) item to compare
  const maxExpenditure = usdBills.reduce((acc, cur) => acc > cur ? acc : cur)
  console.log(maxExpenditure);
}

// codeChallenge2_3()
function codeChallenge2_3() {
  /* Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and
     calculate the average age of the dogs in their study.

     Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following
     things in order:
        1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge =
           2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
        2. Exclude all dogs that are less than 18 human years old
          (which is the same as keeping dogs that are at least 18 years old)
        3. Calculate the average human age of all adult dogs
          (you should already know from other challenges how we calculate averages 😉)
        4. Run the function for both test datasets

  TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
  TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
  */
  function calcAverageHumanAge(ages) {
    const dog2Human = ages.map((age) => age > 2 ? 16 + age * 4 : 2 * age);
    const adultDog = dog2Human.filter((age) => age >= 18);
    console.log(adultDog);
    return adultDog.reduce((acc, cur) => acc + cur, 0) / adultDog.length
  }

  console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))
  console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))

  /* Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and
     using chaining!*/
  const calcAverageHumanAgeChain = ages => ages.map((age) => age > 2 ? 16 + age * 4 : 2 * age).filter(
    (age) => age >= 18).reduce((acc, cur, id, arr) => acc + cur / arr.length, 0)
  console.log('--------Chaining Function--------')
  console.log(calcAverageHumanAgeChain([5, 2, 4, 1, 15, 8, 3]))
  console.log(calcAverageHumanAgeChain([16, 6, 10, 5, 6, 1, 4]))
}

// arrayAdv()
function arrayAdv() {
  const usdBills = [200, 450, -400, 3000, -650, -130, 70, 1300];
  const students = [{
    name: 'Steven Robinson', age: 17, major: "Computer Science"
  }, {
    name: 'Bobby Mackenzie', age: 19, major: "Law"
  }, {
    name: 'Amy Fall', age: 20, major: "Political Science"
  }, {
    name: 'Julianne Wood', age: 20, major: "Computer Science"
  }]
  // use FIND to retrieve an (the first) element of the array that satisfies the given condition
  console.log(usdBills.find(bill => bill < 0));
  console.log(students.find(student => student.name === 'Julianne Wood'));
  console.log(students.find(student => student.major === 'Computer Science'));
  console.log(students.find(student => student.age === 19));
  console.log(students.find(student => student.major === 'Graphic Design') ?? 'Student Not Found!')

  // use FINDINDEX to retrieve the index of an (the first) element of the array that satisfies the given condition
  console.log(usdBills.findIndex(bill => bill < 0));
  console.log(students.findIndex(student => student.name === 'Julianne Wood'));
  console.log(students.findIndex(student => student.major === 'Computer Science'));
  console.log(students.findIndex(student => student.age === 19));
  console.log(students.findIndex(student => student.major === 'Graphic Design'))

  // use SOME to check if there exists one item that satisfies the given condition
  console.log(usdBills.some(bill => bill > 0));
  console.log(usdBills.some(bill => bill > 100000));

  // use EVERY to check if every item in the array satisfies the given condition
  console.log(usdBills.every(bill => typeof bill === 'number'));
  console.log(usdBills.every(bill => bill > 0));

  // use FLAT to create a new array with all sub-array elements concatenated into it recursively up to the specified
  // depth.
  const arr1 = [0, 1, 2, [3, 4]];
  console.log(arr1.flat());

  const arr2 = [0, 1, 2, [[[3, 4]]]];
  console.log(arr2.flat(2));

  // use FLATMAP to get an array which is formed by applying a given callback function to each element of the
  // array first, and then flattening the result by one level.
  const arr3 = [1, 2, 3, 4];
  console.log(arr3.flatMap((x) => [x, x ** 2]));

  // use SORT to sort an array -- This mutates the original array -- By default it sorts alphabetically
  console.log(students.map(s => s.name).sort());
  // To compare numbers, provide a callback fn(a,b) -> number, where
  //    • if fn returns a negative value then `a` goes before `b` (keep order)
  //    • if fn returns a positive value then `b` goes before `a` (switch order)
  //    • a - b for ascending order; b - a for descending order
  console.log(usdBills.sort((a, b) => a - b));
  // Utilize this property, we can solve by properties of items in the list
  console.log([[], [1,2,3], [1], [1,2,3,4,5]].sort((a, b) => a.length - b.length));
  console.log([[1,3,9], [8,9,4], [4,2,7], [6,7,3]].sort((a, b) => a[2] - b[2]));
  console.log(students.sort((a,b) => a.age - b.age))
  console.log(students.sort((a,b) => a.major.localeCompare( b.major)))

  // Array Comprehension, initialize an empty array with the array Length
  // `empty` is not a value but a property, so it's impossible to manipulate the empty value (map, filter, reduce, etc)
  const emptySize7 = new Array(7);
  console.log(emptySize7)

  // Fill/Replace element in an array
  emptySize7.fill("Fill"); // Fill the entire array
  console.log(emptySize7);
  emptySize7.fill('Replace', 5); // Replace with a start argument
  console.log(emptySize7);
  emptySize7.fill('Replace', 0,3); // Replace with start and end arguments
  console.log(emptySize7);
  emptySize7.fill('Replace'); // Replace everything
  console.log(emptySize7);

  // Use FROM to comprehend an array programmatically
  // Use "_" to throw away a worthless argument
  const arithmetic = Array.from({length : 7}, (_, i) => i + 1);
  console.log(arithmetic);

  // FROM has a second optional argument mapFn that maps every element from the arrayLike to the array.
  const set = new Set([1,2,3,4]);
  try {
    set.map((element) => element + 1)
  } catch (e) {
    console.log(e.message);
    console.log(Array.from(set, (element) => element + 1));
  }

}

// codeChallenge4()
function codeChallenge4() {
  /* Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
     Eating too much means the dog's current food portion is larger than the recommended portion, and eating too
     little is the opposite.
     Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the
     recommended portion (see hint).

       1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and
          add it to the object as a new property. Do NOT create a new array, simply loop over the array.
          Formula: recommendedFood = weight ** 0.75 * 28.
         (The result is in grams of food, and the weight needs to be in kg)
       2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have
          multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky
       3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all
          owners of dogs who eat too little ('ownersEatTooLittle').
       4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs
          eat too much!" and "Sarah and John and Michael's dogs eat too little!"
       5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just
          true or false)
       6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
       7. Create an array containing the dogs that are eating an OKAY amount of food
         (try to reuse the condition used in 6.)
       8. Create a shallow copy of the dogs array and sort it by recommended food portion in ascending order
         (keep in mind that the portions are inside the array's objects)*/

  // TEST DATA:
  const dogs = [{weight: 22, curFood: 250, owners: ['Alice', 'Bob']}, {weight: 8, curFood: 200, owners: ['Matilda']},
    {weight: 13, curFood: 275, owners: ['Sarah', 'John']}, {weight: 32, curFood: 340, owners: ['Michael']}];
  dogs.forEach((dog) => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28));
  console.log(dogs);

  const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
  console.log(`Sarah's dog eats too ${sarahDog.curFood > sarahDog.recFood ? "much!" :"little"}!`);

  const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
  const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
  console.log(ownersEatTooMuch, ownersEatTooLittle);

  console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
  console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

  console.log(dogs.some(dog => dog.curFood === dog.recFood));
  const findEatingOkayDogs = dog => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1;
  console.log(dogs.some(findEatingOkayDogs));
  console.log(dogs.filter(findEatingOkayDogs));

  console.log(dogs.slice().sort((a,b) => a.recFood - b.recFood));
}