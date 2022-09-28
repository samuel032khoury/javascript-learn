'use strict';

// constructFn();
function constructFn() {
  // constructor function -- Arrow functions cannot be used as constructors and will throw an error when used with new
  // We don't put function/methods inside the constructor function
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  const sam = new Person('Samuel', 2002);
  // By using a new keyword
  // 1. A new (empty) object is created
  // 2. function is called, `this` is pointing to the newly created object
  // 3. The object is linked to the prototype
  // 4. function automatically return the object with full properties
  console.log(sam);
  console.log(sam instanceof Person, 'sam' instanceof Person, typeof (sam), typeof ('sam'));
  const dan = new Person("Danny", 2001);

  // Add a method to the prototype and all the instances can access
  Person.prototype.calAge = function () {
    return new Date().getFullYear() - this.birthYear;
  };
  // Apply the method
  console.log(sam.calAge());
  console.log(dan.calAge());

  // To access an instance's prototype
  console.log(sam.__proto__);

  // Note a constructor-function's prototype is not of the function itself, but is the object created by it
  console.log(sam.__proto__ === Person.prototype);
  console.log(Person.prototype.isPrototypeOf(dan));
  console.log(Person.prototype.isPrototypeOf(Person));

  // To add properties to the prototype of a "class"
  Person.prototype.species = "Homo Sapiens";
  console.log(sam.species, dan.species);

  // To check if the properties is from the instance its own or from its inheritance
  console.log(sam.hasOwnProperty('firstName'));
  console.log(sam.hasOwnProperty('species'));

  // Prototype chaining
  console.log(sam.__proto__);
  console.log(sam.__proto__.__proto__);
  console.log(sam.__proto__.__proto__.__proto__);


  // classInheritanceByConstructorFn();
  function classInheritanceByConstructorFn() {
    const Student = function (firstName, birthYear, major) {
      Person.call(this, firstName, birthYear);
      this.major = major;
    }
    let alex;
    alex = new Student("Alex", 2002, 'Public Policy');
    console.log(alex.firstName);

    // Methods were not linked
    try {
      alex.calAge()
    } catch (e) {
      console.log("Before linked:", alex.__proto__);
      console.log("Super prototype's methods have not been linked!")
    }

    // Linking prototypes
    Student.prototype = Object.create(Person.prototype);

    try {
      alex.calAge()  // __proto__ is not live updated -- either update the variable or link before any declaration
    } catch (e) {
      console.log("After linked - Before Reset:", alex.__proto__);
      console.log("Super prototype's methods have not been linked!")
    }

    alex = new Student("Alex", 2002, 'Public Policy');

    // Methods were linked
    try {
      console.log("After linked - After Reset:", alex.__proto__);
      alex.calAge()
    } catch (e) {
      console.log("Super prototype's methods have not been linked!")
    }

    Student.prototype.introduce = function () {
      console.log(`My name is ${this.firstName} and I study ${this.major}`)
    }
    alex.introduce();

    // currently `Student.prototype.constructor` is  `Person` because of the usage of Object.create
    console.log(Student.prototype.constructor);
    // if needed, correct it manually by stating
    Student.prototype.constructor = Student;
    console.log(Student.prototype.constructor);
  }
}

// challenge1();
function challenge1() {

  /* 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is
   the current speed of the car in km/h */
  /* 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the
        console */
  /* 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console */
  /* 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them */

  // DATA CAR 1: 'BMW' going at 120 km/h
  // DATA CAR 2: 'Mercedes' going at 95 km/h

  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  }
  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
  }
  Car.prototype.break = function () {
    this.speed -= 5;
    console.log(this.speed);
  }

  const car1 = new Car('BMW', 120);
  const car2 = new Car('Mercedes', 95);

  car1.accelerate();
  car1.accelerate();
  car1.accelerate();
  car2.break();
  car2.break();
  car1.break();
}

// classSyntax();
function classSyntax() {
  // class expression and class declaration are equivalent
  const PersonCl = class {};

  class PersonClass {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }

    // All methods will be placed to the *prototype* of the object
    calAge() {
      return new Date().getFullYear() - this.birthYear;
    }
  }

  PersonClass.prototype.greet = function () {
    console.log(`${this.firstName} just waved!`);
  }
  const jessica = new PersonClass('Jessica', 1996);
  jessica.greet();
  console.log(jessica.calAge());

  // classInheritanceByClassSyntax()
  function classInheritanceByClassSyntax() {
    // Subclass of PersonClass
    class StudentClass extends PersonClass {
      constructor(firstName, birthYear, major) {
        // super always needs to happen first
        super(firstName, birthYear);
        this.major = major;
      }

      introduce() {
        console.log(`My name is ${this.firstName} and I study ${this.major}`)
      }
    }

    const martha = new StudentClass("Martha Roberson", 2008, "Computer Science")
    martha.introduce();
    console.log(martha.calAge());
  }
}

// getSet();
function getSet() {
  /* Getters and Setters for Objects */
  const account = {
    owner: "Samuel",
    transaction: [200, 530, 120, 300],

    get latest() {
      return this.transaction.slice(-1).pop();
    },

    set latest(trans) {
      this.transaction.push(trans)
    }
  }
  // Use the getter as a property
  console.log(account.latest);
  // Use the setter as a property
  account.latest = 4000;
  console.log(account.latest);

  /* Getters and Setters for Class */
  class Student {
    constructor(fullName, major, year, birthYear) {
      this._fullName = fullName;
      this._major = major;
      this.year = year;
      this.birthYear = birthYear;
    }

    get age() {
      return new Date().getFullYear() - this.birthYear;
    }

    get _year() {
      return this.year;
    }

    set _major(major) {
      this.major = major;
    }

    // Application on Data Validation
    set _fullName(name) {
      if (name.includes(" ")) this.fullName = name;
      else console.log(`${name} is not a valid full name!`)
    }
  }

  const validStudent = new Student('Danny Emerson', "CompSci", 3, 2001);
  console.log(validStudent);
  console.log(validStudent._year)
  console.log(validStudent.age);
  validStudent.major = "Physics";
  console.log(validStudent.major);
  const invalidStudent = new Student('Walter', "History", 2010);
  console.log(invalidStudent);
}

// staticMethod();
function staticMethod() {
  const Shape = function (shape) {
    this.shape = shape;
  }
  Shape.drawACirc = () => console.log("You just drew a circle");
  Shape.drawACirc();

  class Flight {
    constructor(number, from, to) {
      this.number = number;
      this.from = from;
      this.to = to;
    }

    static definition() {
      console.log("Flight or flying is the process by which an object moves through a space without contacting any" +
        " planetary surface, either within an atmosphere or through the vacuum of outer space.");
    }
  }

  Flight.definition();
}

// objCreate();
function objCreate() {
  // Construct a prototype of new objects
  // Only (common/public) methods can be defined in this block, properties cannot be set without an initializer
  const PersonProto = {
    calAge() {
      return this.birthYear && new Date().getFullYear() - this.birthYear || "No birth year info!";
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }
  };

  const steve = Object.create(PersonProto);
  console.log(steve);
  steve.calAge();
  steve.firstName = "Steve";
  steve.birthYear = 1997;
  steve.calAge();
  console.log(steve.__proto__ === PersonProto);

  const sarah = Object.create(PersonProto);
  sarah.init("Sarah", 1979);
  sarah.calAge();


  classInheritanceByObjCreate()

  function classInheritanceByObjCreate() {
    const StudentProto = Object.create(PersonProto)
    StudentProto.init = function (firstName, birthYear, major) {
      PersonProto.init.call(this, firstName, birthYear);
      this.major = major
    }
    StudentProto.introduce = function () {
      console.log(`My name is ${this.firstName} and I study ${this.major}`)
    }
    const tim = Object.create(StudentProto);
    tim.init("Tim", 1973, "Business");
    tim.introduce();
    console.log(tim.calAge());
  }
}

// challenge2();
function challenge2() {
  /* 1. Re-create challenge 1, but this time using an ES6 class */
  class Car {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }

    accelerate() {
      this.speed += 10;
      console.log(this.speed);
    }

    break() {
      this.speed -= 5;
      console.log(this.speed);
    }

    get speedUS() {
      return this.speed / 1.6;
    }

    set speedUS(currSpeed) {
      this.speed = currSpeed * 1.6;
    }
  }

  const car1 = new Car('BMW', 120);
  const car2 = new Car('Mercedes', 95);

  car1.accelerate();
  car1.accelerate();
  car1.accelerate();
  car2.break();
  car2.break();
  car1.break();

  /* 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6) */
  /* 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the
        value, by multiplying the input by 1.6) */
  /* 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter */

  console.log(car1.speedUS);
  car2.speedUS = 60;
  console.log(car2.speed);
  console.log(car2.speedUS);
}

// challenge3();
function challenge3() {
  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  }
  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
  }
  Car.prototype.break = function () {
    this.speed -= 5;
    console.log(this.speed);
  }
  /* 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a
        make and current speed, the EV also has the current battery charge in % ('charge' property) */
  const EV = function (make, speed, battery) {
    Car.call(this, make, speed);
    this.battery = battery;
  }
  EV.prototype = Object.create(Car.prototype);
  EV.prototype.constructor = EV;
  /* 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to
        'chargeTo' */
  EV.prototype.chargeBattery = function (chargeTo) {
    this.battery = chargeTo;
  }
  /* 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%.
        Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%' */
  EV.prototype.accelerate = function () {
    this.speed += 20;
    this.battery--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.battery}%`)
  }
  /* 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge
        to 90%). Notice what happens when you 'accelerate'! HINT: use polymorphism */
  // DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
  const tesla = new EV("Tesla", 120, 23);
  console.log(tesla.make);
  console.log(tesla.battery);
  tesla.accelerate();
  tesla.break();
  tesla.chargeBattery(90);
  console.log(tesla.battery);
}

// accessCtrl()
function accessCtrl() {
  // add underscore before a variable / method to make it protected
  // They are still accessible from the outside, but we should not do that

  class Student {
    // public fields
    nationality;
    age;
    // private fields
    #gpa;

    constructor(fullName, major, nationality, age, gpa) {
      this.fullName = fullName;
      this.major = major;
      this.nationality = nationality;
      this.age = age;
      this.#gpa = gpa;
    }

    // public interfaces (methods)
    getGPA() {
      return this.#gpa;
    }

    overrideGrades(adminPass, gpa) {
      if (String(adminPass) === '7324') {this.#changeGrade(gpa);}
    }

    // private methods -- not yet available
    #changeGrade(gpa) {
      this.#gpa = gpa;
    }
  }

  const mary = new Student("Marry", "Music", "UK", 19, "3.97")
  console.log(mary)
  console.log(mary.getGPA())
  // We are not able to access mary.#gpa because it is a private field
  mary.overrideGrades(7324, '4.0')
  console.log(mary)
  console.log(mary.getGPA())
}

//challenge4():
function challenge4() {
  /* 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class */
  /* 2. Make the 'charge' property private */
  /* 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update
   the 'brake' method in the 'CarCl' class. They experiment with chaining! */

  // DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
}

