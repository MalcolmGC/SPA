// SPA_JS_prototype_factory.js
// SPA p. 39 -- JS Object.create{} with a a factory function.
// https://jsbin.com/golefi/edit?js,console,output
// The 'new' method is in https://jsbin.com/vaxoxi/edit?js,console,output
///////////////////////////////////////////////////
var proto = {
    sentence: 4,
    probation: 2
};
var makePrisoner = function (name, id) {
    'use strict';
    var prisoner = Object.create(proto);
    prisoner.name = name;
    prisoner.id = id;
    return prisoner;
};
var firstPrisoner = makePrisoner('Joe', '12A');
var secondPrisoner = makePrisoner('Sam', '2BC');

// Test:
//console.log("Prisoners: ", firstPrisoner, secondPrisoner);
//console.log("Prisoners: " + firstPrisoner + secondPrisoner); // Not good in JSbin.

// Added functionality beyond the book:
proto.sayHello = function () {
    'use strict';
    console.log("Hello, I'm " + name + ' and my sentence is ' + sentence);
    return ("Hello, I am " + this.name + ' and my sentence is ' + this.sentence);
};

// // Examples of usage:
console.log(firstPrisoner.sayHello());
secondPrisoner.sentence = 3;
secondPrisoner.sayHello();