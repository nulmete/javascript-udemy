// =============================================================================
// Switch like an if else statement
// =============================================================================

// firstName = 'Nicolás';
// age = 21;

// switch (true) {
//     case age < 13:
//         console.log(firstName + ' is a boy.');
//         break;
//     case age >= 13 && age < 20:
//         console.log(firstName + ' is a teenager.');
//         break;
//     case age >= 20 && age < 30:
//         console.log(firstName + ' is a young man.');
//         break;
//     default:
//         console.log(firstName + ' is a man.');
// }

// =============================================================================
// Truthy and falsy values
// =============================================================================

// Truthy: NOT falsy values
// Falsy: undefined, null, 0, '', NaN

/* Coding challenge */

// const johnTeamAvg = [89, 120, 103].reduce((a, b) => a + b, 0) / 3;
// const mikeTeamAvg = [116, 94, 123].reduce((a, b) => a + b, 0) / 3;
// const maryTeamAvg = [97, 134, 105].reduce((a, b) => a + b, 0) / 3;

// if (johnTeamAvg > mikeTeamAvg && johnTeamAvg > maryTeamAvg) {
//     console.log('John wins');
// } else if (mikeTeamAvg > johnTeamAvg && mikeTeamAvg > maryTeamAvg) {
//     console.log('Mike wins');
// } else if (maryTeamAvg > johnTeamAvg && maryTeamAvg > mikeTeamAvg) {
//     console.log('Mary wins');
// } else {
//     console.log('Draw');
// }

// =============================================================================
// FUNCTIONS
// =============================================================================

// FUNCTION STATEMENTS OR DECLARATIONS
// Statements don't return a value. Try this:
// if (true) { console.log('hello'); }
// This prints 'hello' but also returns 'undefined'.

// function calculateAge(birthYear) {
//     return 2019 - birthYear;
// }

// // Functions can be called inside another functions
// function yearsUntilRetirement(year, firstName) {
//     const age = calculateAge(year);
//     const retirement = 65 - age;

//     if (retirement > 0) {
//         console.log(firstName + ' retires in ' + retirement + ' years.');
//     } else {
//         console.log(firstName + ' is already retired.');
//     }
    
// }

// yearsUntilRetirement(1997, 'Nicolás');
// yearsUntilRetirement(1950, 'José');

// FUNCTION EXPRESSIONS (immediate result)
// They return a single value.
// For example: 2 + 3, whatDoYouDo('John', 'teacher'), etc.

// var whatDoYouDo = function(job, firstName) {
//     switch (job) {

//         // We don't need a break here, because "return" will stop the function from running
//         case 'teacher':
//             return firstName + ' teaches kids how to code.';
//         case 'driver':
//             return firstName + ' drives a cab in Lisbon.';
//         case 'designer':
//             return firstName + ' designs beautiful websites.';
//         default:
//             return firstName + ' does something else.';
//     }
// }

// console.log(whatDoYouDo('teacher', 'John'));
// console.log(whatDoYouDo('designer', 'Nicolás'));
// console.log(whatDoYouDo('retired', 'Oscar'));

// =============================================================================
// Arrays
// =============================================================================

// var names = ['John', 'Mark', 'Jane'];
// var years = new Array(1990, 1969, 1948);

// console.log(names);
// console.log(names[0]);
// console.log(names.length);

// names[names.length] = 'Mary';

// console.log(names);

// var john = ['John', 'Smith', 1990, 'teacher', false];

// john.push('blue');
// john.unshift('Mr.');
// console.log(john);

// john.pop();
// john.shift();
// console.log(john);

// console.log(john.indexOf(1990));

// var isDesigner = john.indexOf('designer') === -1 ? 'John is not a designer' : 'John is a designer';
// console.log(isDesigner);

/* Coding challenge */

// var bills = [124, 48, 268];

// var tip = function(bill) {
//     var percentage;

//     if (bill < 50) {
//         percentage = 2;
//     } else if (bill >= 50 && bill <= 200) {
//         percentage = 15;
//     } else {
//         percentage = 1;
//     }

//     return percentage * bill;
// }

// var tips = [tip(bills[0]), tip(bills[1]), tip(bills[2])];
// var finalAmounts = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];

// console.log(tips, finalAmounts);

// =============================================================================
// Objects and properties
// =============================================================================

// Object literal
// var john = {
//     firstName: 'John',
//     lastName: 'Smith',
//     birthYear: 1990,
//     family: ['Jane', 'Mark', 'Bob', 'Emily'],
//     job: 'teacher',
//     isMarried: false
// }

// console.log(john.firstName);
// console.log(john['lastName']);

// var x = 'birthYear';
// console.log(john[x]);

// john.job = 'designer';
// john['isMarried'] = true;
// console.log(john);


// var jane = new Object();
// jane.firstName = 'Jane';
// jane.birthYear = 1969;
// jane['lastName'] = 'Smith';
// console.log(jane);

// =============================================================================
// Objects and methods
// =============================================================================

// var john = {
//     firstName: 'John',
//     lastName: 'Smith',
//     birthYear: 1990,
//     family: ['Jane', 'Mark', 'Bob', 'Emily'],
//     job: 'teacher',
//     isMarried: false,

//     // Function EXPRESSION
//     calcAge: function() {
//         this.age = 2018 - this.birthYear;
//     }
// }

// john.calcAge();
// console.log(john);

/* Coding challenge */

// function calcBMI(person) {
//     return person.mass / Math.pow(person.height, 2);
// }

// const mark = {
//     fullName: 'Mark Doe',
//     mass: 80,
//     height: 1.80,
//     calcBMI: function() {
//         this.BMI = this.mass / Math.pow(this.height, 2);
//         return this.BMI;
//     }
// }

// const john = {
//     fullName: 'John Smith',
//     mass: 88,
//     height: 1.95,
//     calcBMI: function() {
//         this.BMI = this.mass / Math.pow(this.height, 2);
//         return this.BMI;
//     }
// }

// // We can use the calcBMI() method because it returns the BMI value
// if (mark.calcBMI() > john.calcBMI()) {
//     console.log(mark.fullName + ' has the highest BMI: ' + mark.BMI);
// } else if (john.calcBMI() > mark.calcBMI()) {
//     console.log(john.fullName + ' has the highest BMI: ' + john.BMI);
// } else {
//     console.log(mark.fullName + ' and ' + john.fullName + ' have the same BMI.');
// }

/* Coding challenge 5 */

const john = {
    fullname: 'John Doe',
    bills: [124, 48, 268, 180, 42],

    // Method (which is like a function expression)
    calculateTip: function() {
        this.tips = [];
        this.paidAmounts = [];

        for (let i = 0; i < this.bills.length; i++) {
            let percentage;
            let bills = this.bills;

            if (bills[i] < 50) {
                percentage = .2;
            } else if (bills[i] >= 50 && bills[i] <= 200) {
                percentage = .15;
            } else {
                percentage = .1;
            }

            this.tips[i] = percentage * bills[i];
            this.paidAmounts[i] = percentage * bills[i] + bills[i];
        }
    }
}

const mark = {
    fullname: 'Mark Smith',
    bills: [77, 375, 110, 45],

    calculateTip: function() {
        this.tips = [];
        this.paidAmounts = [];

        for (let i = 0; i < this.bills.length; i++) {
            let percentage;
            let bills = this.bills;

            if (bills[i] < 100) {
                percentage = .2;
            } else if (bills[i] >= 100 && bills[i] <= 300) {
                percentage = .1;
            } else {
                percentage = .25;
            }

            this.tips[i] = percentage * bills[i];
            this.paidAmounts[i] = percentage * bills[i] + bills[i];
        }
    }
}

john.calculateTip();
mark.calculateTip();

// Function outside the objects (not a method) to prevent repeated code in the objects
function averageTips(tips) {
    let sum = 0;

    for (let i = 0; i < tips.length; i++) {
        sum += tips[i];
    }

    return sum / tips.length;
}

john.average = averageTips(john.tips);
mark.average = averageTips(mark.tips);

console.log(john);
console.log(mark);

if (john.average > mark.average) {
    console.log(john.fullname + '\'s family pays higher tips, with an average of $' + john.average);
} else if (mark.average > john.average) {
    console.log(mark.fullname + '\'s family pays higher tips, with an average of $' + mark.average);
} else {
    console.log('Both families pay the same');
}