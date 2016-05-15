// SPA_JS_prototype.js
// SPA p. 38 -- JS prototype and using new operator.
// https://jsbin.com/vaxoxi/edit?js,console,output
///////////////////////////////////////////////////
// Define the object constructor.
var Prisoner = function (name, id) {
    'use strict';
    this.name = name;
    this.id = id;
};
// Define a prototype object
Prisoner.prototype = {
    sentence: 4,
    probation: 2
};
// Instead of the above direct assignment to the object structur,
// the book defined the abpve object as "proto" and then assingned it.

// Adding a function to the prototype (not in book):
Prisoner.prototype.sayHello = function () {
    'use strict';
    console.log("Hello, I'm " + this.name + ' and my sentence is ' + this.sentence);
    return ("Hello, I am " + this.name + ' and my sentence is ' + this.sentence);
};
// Instantiate the objects
var firstPrisoner = new Prisoner('Joe', '12A');
var secondPrisoner = new Prisoner('Sam', '2BC');

// Adding a second function to the prototype (not in book) after instantiation!:
Prisoner.prototype.sayId = function () {
    'use strict';
    console.log(this.name + " has id of " + this.id);
};

// Examples of usage:
console.log(firstPrisoner.sayHello());
secondPrisoner.sayHello();
secondPrisoner.sayId();

// console.log('Prisoners: ', firstPrisoner, secondPrisoner);