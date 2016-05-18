// Object.createAsConstuctor.js
// From: http://xahlee.info/js/javascript_object_create_emulating_constructor.html
console.log('========================================================');
// // using Object.create to emulate constructor
var dad = {a: 3};
// constructor version
var Fcn = function (x) {
    'use strict';
    this.y = x;
};
Fcn.prototype = dad;
var o1 = new Fcn(4);
console.log('o1 Prototype: ', Object.getPrototypeOf(o1)); // Object {a: 3}
console.log('o1: ', o1); // Fcn {y: 4} ...
console.log('o1.y: ', o1.y); // Fcn {y: 4} ...
console.log(JSON.stringify(Object.getOwnPropertyDescriptor(o1, "y")));
// Object.Create version
var yDescriptor = function (x) {
    'use strict';
    return {y: {
        value: x,
        writable: true,
        enumerable: true,
        configurable: true
    }};
};
var fcn = function (x) {
    'use strict';
    return Object.create(dad,
            yDescriptor(x));
};

var o2 = fcn(4);
console.log('o2 Prototype: ', Object.getPrototypeOf(o2)); // Object {a: 3}
console.log('o2 : ', o2); // {y: 4}
console.log(JSON.stringify(Object.getOwnPropertyDescriptor(o2, "y")));
// --------------------------------------------------
// test
console.log(
    Object.getPrototypeOf(o1) ===
    Object.getPrototypeOf(o2)
); // true
console.log(
    JSON.stringify(Object.getOwnPropertyDescriptor(o1, "y")) ===
    JSON.stringify(Object.getOwnPropertyDescriptor(o2, "y"))
); // true
