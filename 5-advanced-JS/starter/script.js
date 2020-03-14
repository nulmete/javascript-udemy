/*

// Function constructor - the newly created object inherits from the constructor's prototype property
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    // john, jane and mark objects have this method attached to them
    // this.calculateAge = function() {
    //     console.log(2019 - this.yearOfBirth);
    // }
}

// john, jane and mark objects don't have this method attached to them, but they can access it (INHERITANCE) because it's in the PROTOTYPE
// property of the constructor
Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

// Instantiation
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

//
// The 'new' operator creates an empty object, and then the function 'Person' is called.
// In a regular function call, 'this' points to the global object (window object). But this is not what we want.
// The 'new' operator takes care of this situation, and makes the 'this' variable point to the empty object created at the beginning
//

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

*/

/*

// Object.create() - builds an object that inherits DIRECTLY from the one that we pass in the first argument
var personProto = {
    calculateAge: function() {
        console.log(2019 - this.yearOfBirth);
    }
}

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});

*/

/*

// Primitives vs Objects

// Primitives
var a = 23;
var b = a; // 23
a = 46;
console.log(a);
console.log(b);

// Objects
var obj1 = {
    name: 'John',
    age: 26
}
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
}

function change(a, b) {
    a = 30; // this is a primitive - so a copy of 'age' is made into 'a' - then 'a' changes, but 'age' is still 27
    b.city = 'San Francisco'; // this is an object - so 'b' is a reference of the place in memory where 'obj' is located - then, the value of 'city' property actually changes
}

change(age, obj);

console.log(age); // 27
console.log(obj.city); // 'San Francisco'

*/

/*

// Passing functions as arguments
// Separate various tasks into simple tasks

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];

    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
}

// Callback function - it's called later, inside the arrayCalc function
function calculateAge(el) {
    return 2019 - el;
}

// Another callback function
function isFullAge(el) {
    return el >= 18;
}

// Another another callback function
function maxHeartRate(el) {
    // Only valid for people between 18 and 81 years old
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge); // ages = arrRes that is returned from arrayCalc
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(rates);

*/

/*

// Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ', what subject do you teach?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

// Function that is returned from the interviewQuestion function, when we pass the 'teacher' argument
// the variable 'teacherQuestion', will be the function that is returned from the else if block
// it is like storing a function expression in a variable
var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

// Now, the variable is called (which is the function that was returned previously)
teacherQuestion('John');
designerQuestion('Mark');

// Another way of doing this - without creating a variable to store the returned function
interviewQuestion('teacher')('Kate');

*/

/*

// Immediately Invoked Function Expressions (IIFE) - data privacy
// create a new scope that is hidden from the outside scope
// not using the function to create reusable code

function game() {
    var score = Math.random() * 10;
    console.log(score);
}

(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

// The higher goodLuck is, the higher probability there is to obtain 'true'
(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(4);

*/



// Closures

// function retirement(retirementAge) {
//     var a = ' years left until retirement.';
//     return function(yearOfBirth) {
//         var age = 2019 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     }
// }

// Create different functions for different retirement ages of different countries

// returns a function where retirementAge = 66 and a = ' years...' - the retirement() functions ends its execution
// var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);

// call the returned function - has access to retirementAge, a, yearOfBirth and age, even after retirement() ends executing
// retirementGermany(1990);
// retirementUS(1990);
// retirementIceland(1990);

/* Challenge: rewrite the interviewQuestion with closures */
/*

// Now, the 'decision' is made inside the function that is returned, not in the outer function (using the job variable of the outer function)
// Only 1 function instead of 3 functions
function interviewQuestion(job) {
    return function(name) {
        switch (job) {
            case 'designer':
                console.log(name + ', can you please explain what UX design is?');
                break;
            
            case 'teacher':
                console.log(name + ', what subject do you teach?');
                break;

            default:
                console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('designer')('Mark');
interviewQuestion('teacher')('Monica');

*/

/*

// Bind, call, apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay);
        }
    }
}

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer',
}

john.presentation('formal', 'morning');

// Method borrowing - call()
// First argument: set 'this' = 'emily'
john.presentation.call(emily, 'friendly', 'afternoon');

// apply() - same as call(), but passing the arguments of the method in an array
john.presentation.apply(emily, ['friendly', 'afternoon']);

// Carrying - bind()
// Doesn't immediately call the function - returns a copy of the function with preset arguments
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('evening');


// Remake of passing functions as arguments

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];

    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
}

// Callback function - it's called later, inside the arrayCalc function
function calculateAge(el) {
    return 2019 - el;
}

// Another callback function
// Full age varies from country to country
function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

// isFullAge accepts 2 arguments, but the callback function (fn) only accepts 1 argument
// use bind() to PRESET the limit argument (limit = 18) - don't really care about the 'this' argument
var fullArgentina = arrayCalc(ages, isFullAge.bind(this, 18));
console.log(ages);
console.log(fullArgentina);

// This was the original fullAges method
// var fullAges = arrayCalc(ages, isFullAge);

*/

// =============================================================================
// Coding challenge 7
// =============================================================================

/*
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

// Use an IIFE so that the code is private
(function() {
    // Function constructor
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    
    // Sample questions
    var nameQuestion = new Question('What is my name?', ['Nicolás', 'Juan', 'Agustín'], 0);
    var cityQuestion = new Question('Where do I live?', ['Zárate', 'Escobar', 'Campana'], 2);
    var momQuestion = new Question('What\'s my mom\'s name?', ['Laura', 'María', 'Silvia'], 0);
    
    // Log the question and the possible answers
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
    
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + '. ' + this.answers[i]);
        }
    }

    // Check if the answer from the user input is correct
    Question.prototype.checkAnswer = function(answer, callback) {
        var sc;

        if (answer === this.correctAnswer) {
            console.log('Correct!!');
            sc = callback(true); // keepScore function with the 'correct' argument
        } else {
            console.log('Incorrect!!');
            sc = callback(false); // keepScore function with the 'correct' argument
        }

        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('*****************************');
    }

    var questionsArray = [nameQuestion, cityQuestion, momQuestion];

    function score() {
        var sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    // the outer function stops its execution, but keepScore has access to 'sc' because of CLOSURES
    // still needs the 'correct' argument from the inner function to be passed (happens inside the checkAnswer method)
    var keepScore = score();

    function nextQuestion() {
        var randomQuestion = Math.floor(Math.random() * questionsArray.length);
        
        // Display a random question
        questionsArray[randomQuestion].displayQuestion();
        
        var answer = prompt('Please select the correct answer');
    
        if (answer !== 'exit') { 
            // Let the user answer the question
            questionsArray[randomQuestion].checkAnswer(parseInt(answer), keepScore);

            // Keep calling the function
            nextQuestion();
        }
    }

    nextQuestion();
   
})();


