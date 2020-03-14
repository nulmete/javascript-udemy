///////////////////////////////////////
// Lecture: Hoisting

/*

// FUNCTION DECLARATIONS
// They can be called before because of hoisting (before execution phase, the function is already defined).

calculateAge(1997);

function calculateAge(year) {
    console.log(2019 - year);
}

// FUNCTION EXPRESSIONS

// retirement(1997); // retirement is not a function

var retirement = function(year) {
    console.log(65 - (2019 - year));
}

retirement(1997);

// VARIABLES
// Variables are set to undefined until the execution phase, so the function can't be called before.

console.log(age); // undefined
var age = 23; // global execution context
console.log(age);

function foo() {
    var age = 65; // function's execution context
    console.log(age); // 65
}

foo();
console.log(age); // 23

*/

///////////////////////////////////////
// Lecture: Scoping

/*

// First example

// Global scope
var a = 'Hello!';
first();

function first() {
    // first() function scope + global scope
    var b = 'Hi!';
    second();

    function second() {
        // first() + second() + global scopes
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

// Example to show the differece between execution stack and scope chain

// Global scope
var a = 'Hello!';
first();

function first() {
    // first() + global scopes
    var b = 'Hi!';
    second();

    function second() {
        // first() + second() + global scopes
        var c = 'Hey!';
        third();
    }
}

// Global scope
// Only has access to variables "a" and "d"
function third() {
    // third() + global scopes
    var d = 'John';
    console.log(a + b + c + d);
}

*/

///////////////////////////////////////
// Lecture: The this keyword

// Regular function call

calculateAge(1997);

function calculateAge(year) {
    console.log(2019 - year);
    console.log(this); 
}

// Method call

var john = {
    name: 'John',
    yearOfBirth: 1990,

    // Method
    calculateAge: function() {
        console.log(this);
        console.log(2019 - this.yearOfBirth);

        // Regular function call (the object won't be john, it'll be the window object)
        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1995
}

// Method borrowing
mike.calculateAge = john.calculateAge;

// 'this' will be the mike object
// This is possible because the 'this' variable IS NOT ASSIGNED A VALUE UNTIL A FUNCTION WHERE IT IS DEFINED
// IS CALLED (variables hoisting)
mike.calculateAge();