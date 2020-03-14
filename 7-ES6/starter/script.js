// =============================================================================
// let / const
// =============================================================================

/*
// ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// console.log(name5);

// ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);

// ES5
function driversLicense5(passedTest) {

    // console.log(firstName); // undefined -> hoisting

    // The console.log works because vars are function scoped, so firstName and yearOfBirth are accessible,
    // even if they're inside an if block.
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }

    console.log(firstName + ', born in ' + yearOfBirth + ', is allowed to drive.');
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {

    // console.log(firstName); // not defined -> can't access the variable before they're declared

    // If we want to console.log firstName and yearOfBirth outside the if block, then we have to declare them outside of that block.
    // If they're declared inside the if block, then they won't be accessible outside of it.
    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }

    console.log(firstName + ', born in ' + yearOfBirth + ', is allowed to drive.');
}

driversLicense6(true);


// The variable 'i' inside the for loop is different from the variable 'i' declared first, because 'let' is block scoped.
let i = 23;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);

// The variable 'j' inside the for loop is the same as the variable 'j' declared first, because 'var' is function scoped.
var j = 23;

for (var j = 0; j < 5; j++) {
    console.log(j);
}

console.log(j);
*/

// =============================================================================
// Blocks and IIFEs
// =============================================================================

/*
// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b);
console.log(c);

// ES5
(function() {
    var c = 3;
})();

// console.log(c);
*/

// =============================================================================
// Strings
// =============================================================================

/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2019 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(`${firstName} `.repeat(5));
*/

// =============================================================================
// Arrow functions
// =============================================================================

/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2019 - el;
});

console.log(ages5);

// ES6
let ages6 = years.map(el => 2019 - el);
console.log(ages6);

// More than one argument between ( )
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2019 - el}.`);
console.log(ages6);

// If there is more than one line of code in the return statement (after =>), we have to use { } and use the return keyword too
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`;
});
console.log(ages6);
*/

// =============================================================================
// Arrow functions - 'this'
// =============================================================================

/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
    // this is the method
    // here we DO HAVE access to this.color and this.position

        document.querySelector('.green').addEventListener('click', function() {
            // this anonymous function is a regular function call (this points to the window object -> position and color are not defined there)

            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);

        });
    },

    clickMeSelf: function() {
        var self = this;

        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}

// method call -> we have access to color and position using the this keyword
// box5.clickMe();

// set self = this inside the method, where we have access to the object's this
// box5.clickMeSelf();




// ES6
const box6 = {
    color: 'green',
    position: 1,

    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            // Arrow functions share the 'this' keyword of its surroundings
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}

// box6.clickMe();

const box66 = {
    color: 'green',
    position: 1,

    // If we use an arrow function for the method declaration, then it will share the 'this' keyword of the global object,
    // and the result will be that position and color are undefined
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            // Arrow functions share the 'this' keyword of the function (clickMe) they're written in
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}

// box66.clickMe();



// ANOTHER EXAMPLE

// ES5
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function(friends) {

    // Here (method) we have access to the 'this' variable of Person (so, we have access to this.name)

    var arr = friends.map(function(el) {
        // this anonymous function is a regular function call, so 'this' points to the global object (which doesn't have a 'name')
        return this.name + ' is friends with ' + el;
    }.bind(this));

    // bind returns a copy of the function, with the preset this keyword and preset arguments (in this case, none)
    // works like the previous example where var self = this;

    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(el => `${this.name} is friends with ${el}`);
    console.log(arr);
}

new Person('John').myFriends6(friends);
*/

// =============================================================================
// Destructuring
// =============================================================================
/*
// ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// ES6
const [name, age] = ['John', 26];
console.log(name, age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

// Variables with the same name of the object keys
const {firstName, lastName} = obj;
console.log(firstName, lastName);

// Variables with a different name from the object keys
const {firstName: a, lastName: b} = obj;
console.log(a, b);

// Returning multiple values from a function
// Destructuring + closure
function retirement(retirementAge) {

    return function(yearOfBirth) {
        const age = new Date().getFullYear() - yearOfBirth;
        return [age, retirementAge - age];
    }

}

const [myAge, yearsLeftToRetire] = retirement(65)(1997);
console.log(`I'm ${myAge} years old and in ${yearsLeftToRetire} years I'll be retired.`);
*/

// =============================================================================
// Arrays
// =============================================================================

/*
const boxes = document.querySelectorAll('.box');

// ES5
// var boxes5 = Array.prototype.slice.call(boxes);
// boxes5.forEach(function(box) {
//     box.style.backgroundColor = 'dodgerblue';
// });

// for (var i = 0; i < boxes5.length; i++) {
//     if (boxes5[i].className === 'box blue') continue;
//     boxes5[i].textContent = 'I changed to blue';
// }

// ES6
const boxes6 = Array.from(boxes);
boxes6.forEach(element => element.style.backgroundColor = 'dodgerBlue');

for (const cur of boxes6) {
    if (cur.className.includes('blue')) continue;
    cur.textContent = 'I changed to blue';
}



// ES5
var ages = [12, 19, 8, 21, 14, 11];

// var full = ages.map(function(el) {
//     return el >= 18;
// });

// var indexFull = full.indexOf(true);
// console.log(ages[indexFull]);

// ES6 - find the index of the (first) element that is >= 18
console.log(ages.findIndex(el => el >= 18));

// ES6 - find the (first) value of the element that is >= 18
console.log(ages.find(el => el >= 18));

// ES6 - filter all the values that are >= 18
console.log(ages.filter(el => el >= 18));
*/

// =============================================================================
// Spread operator
// takes an array and transforms it into single values - used in a function call
// =============================================================================

/*
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// Pass array as parameter - ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// Pass array as parameter - ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

// Join 2 arrays
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

// Change text color of heading and boxes
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box'); // NodeList - ... also works

const all = [h, ...boxes];

Array.from(all).forEach(el => el.style.color = 'purple');
*/

// =============================================================================
// Rest parameters
// receive a couple of single values and transform them into an array - used in a function declaration
// =============================================================================

/*
// ES5
function isFullAge5() {
    // console.log(arguments); // it's an Object - not an array
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2019 - cur) >= 18);
    });
}

isFullAge5(1990, 1999, 1965);

// ES6 - transform the arguments into an array when the function is called
function isFullAge6(...years) {
    years.forEach(cur => console.log((2019 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965, 1997, 2000);
*/

/*
// Extra argument 'limit', which depends on the country
function isFullAge5(limit) {
    var argsArr = Array.prototype.slice.call(arguments, 1); // only keep the years, not the limit

    argsArr.forEach(function(cur) {
        console.log((2019 - cur) >= limit);
    });
}

isFullAge5(21, 1990, 1999, 1965);

// ES6 - transform the arguments into an array when the function is called
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2019 - cur) >= limit));
}

isFullAge6(21, 1990, 1999, 1965);
*/

// =============================================================================
// Default parameters
// =============================================================================

/*
// ES5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

//     if (lastName === undefined) lastName = 'Smith';
//     if (nationality === undefined) nationality = 'American';

//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.lastName = lastName;
//     this.nationality = nationality;
// }

// var john = new SmithPerson('John', 1990);

// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
*/

// =============================================================================
// Maps
// key & value pair (the key doesn't have to be a string like in Objects)
// they're iterable
// size 
// =============================================================================

/*
const question = new Map();

question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, try again :(');

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)) console.log('Question 4'); // question.delete(4);

// question.clear();

// question.forEach((value, key) => console.log(`This is ${key} and it's set to ${value}`));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = parseInt(prompt('Write the correct answer'));

// get the boolean keys (either true or false)
console.log(question.get(answer === question.get('correct')));
*/

// =============================================================================
// Classes
// =============================================================================

/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

// ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting() {
        console.log('Hey!');
    }
}

var john6 = new Person6('John', 2010, 'kid');

Person6.greeting();
*/

// =============================================================================
// Classes & subclasses
// =============================================================================

// ES5
/*
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);

    this.olympicGames = olympicGames;
    this.medals = medals;
}

// Inherit from Person5 prototype
Athlete5.prototype = Object.create(Person5.prototype);

// Method specific for the Athlete5 subclass
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'runner', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();
*/

// ES6
/*
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'runner', 3, 10);

johnAthlete6.calculateAge();
johnAthlete6.wonMedal();
*/

// =============================================================================
// Coding challenge

// Suppose that you're working in a small town administration, and you're in charge of two town elements:
// 1. Parks
// 2. Streets

// It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

// At an end-of-year meeting, your boss wants a final report with the following:
// 1. Tree density of each park in the town (forumla: number of trees/park area)
// 2. Average age of each town's park (forumla: sum of all ages/number of parks)
// 3. The name of the park that has more than 1000 trees
// 4. Total and average length of the town's streets
// 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

// All the report data should be printed to the console.

// HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
// =============================================================================

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element{
    constructor(name, buildYear, numberOfTrees, area) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.area = area;
    }

    getDensity() {
        console.log(`${this.name} has a density of ${this.numberOfTrees / this.area} km2.`);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();

        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        console.log(`${this.name} was built in ${this.buildYear} and is a ${classification.get(this.size)} street.`);
    }
}

let parks = [
    new Park('Iguazu', 1934, 1000, 67000),
    new Park('Lanin', 1937, 3000, 412000),
    new Park('Talampaya', 1997, 2000, 215000)
];

let streets = [
    new Street('Lavezzari', 1930, 800, 3),
    new Street('Arenaza', 1955, 750, 2),
    new Street('Busso', 1970, 400, 1)
];

function calculateTotalAvg(array) {
    const total = array.reduce((current, next) => current + next);
    const average = total / array.length;

    return [total, average];
}

function parkReport(parks) {
    console.log('----- PARKS REPORT -----');

    // Density
    parks.forEach(park => park.getDensity());

    // Average and total age
    const ages = parks.map(park => new Date().getFullYear() - park.buildYear);
    const [totalAge, avgAge] = calculateTotalAvg(ages);

    console.log(`Our ${parks.length} parks from Argentina have an average age of ${avgAge}, with a total age of ${totalAge}`);

    // Parks with > 1000 trees
    const parksWithManyTrees = parks.filter(park => park.numberOfTrees > 1000);
    console.log(parksWithManyTrees);

    for (const park of parksWithManyTrees) {
        console.log(`${park.name} has more than 1000 trees (${park.numberOfTrees})`);
    }
}

function streetReport(streets) {
    console.log('----- STREETS REPORT -----');

    // Average and total length
    const lengths = streets.map(street => street.length);
    const [totalLength, avgLength] = calculateTotalAvg(lengths);

    console.log(`Our ${streets.length} streets from Argentina have an average length of ${avgLength}, with a total length of ${totalLength}`);

    // Size classification
    streets.forEach(street => street.classifyStreet());
}

parkReport(parks);
streetReport(streets);