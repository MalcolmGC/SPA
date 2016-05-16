// objectCreate_onlineCodeBefore_objectCreate.js
// From: http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html
// and: SPA Chapter 2 page 39 -- for factory.
/* JS Object Creation Revisited
Review of some typical ways that objects are created in JS.
Define a constructor function and then create an object by using 'new' keyword:
*/
function CarA(desc) {
    'use strict';
    this.desc = desc;
    this.color = "red";
    this.getInfo = function getInfo() {
        return 'A ' + this.color + ' ' + this.desc + '.';
    };
}

//instantiate object using the constructor function
var carA1 = new CarA('Porsche boxter');
carA1.color = "blueA";
console.log('A1: ' + carA1.getInfo()); //displays 'A blue Porsche boxter.'
/////////////////////////////////////////////////////////////
//A variation: create a constructor function for the object and append its methods to its Object prototype.
// That shares the methods across objects:
function CarB(desc) {
    'use strict';
    this.desc = desc;
    this.color = "red";
}

CarB.prototype.getInfo = function () {
    'use strict';
    return 'B ' + this.color + ' ' + this.desc + '.';
};
//instantiate object using the constructor function
var carB1 = new CarB('Porsche boxter');
carB1.color = "blueB";
console.log('B1: ' + carB1.getInfo()); //displays 'A blue Porsche boxter.'
//////////////////////////////////////
//A more sophisticated use of a prototype property is to set the value of it in one fell swoop,
//  using either a function (here with drive and stop) or with an object literal:
function CarC(desc) {
    'use strict';
    this.desc = desc;
    this.color = "red";
}

CarC.prototype = {
    getInfo: function () {
        'use strict';
        return 'A ' + this.color + ' ' + this.desc + '.';
    },
    drive: function () {
        'use strict';
        //DO SOMETHING
        console.log('');
    },
    stop: function () {
        'use strict';
        //DO SOMETHING
        console.log('');
    }
};
//instantiate object using the constructor function
var carC1 = new CarC('Porsche boxter');
carC1.color = "blueC";
console.log('C1: ' + carC1.getInfo()); //displays 'A blue Porsche boxter.'
//////////////////////////////////////
/* The Object.create() Method
The Object.create() method creates a Car object just as adeptly.
It accepts either one or two properties as follows:

Object.create(proto [, propertiesObject ])
The first argument is proto: the prototype to extend, or else you must pass a null value to the function.
The second (optional) argument is propertiesObject: an object containing the object's property descriptors.
We already have a Car prototype, so it makes sense to pass it to Object.create().
Unfortunately, what makes sense isn't always what works!
*/
function CarD(desc) {
    'use strict';
    this.desc = desc;
    this.color = "red";
}

CarD.prototype = {
    getInfo: function () {
        'use strict';
        return 'A ' + this.color + ' ' + this.desc + '.';
    }
};
//instantiate object using the constructor function:
// The description (color and desc) is lost because  Ojvect.create() method is only using the prototype and not the constructor.
var carD1 = Object.create(CarD.prototype); // Properties are undefined, unless explicitly assigned.
carD1.color = "blue";
//carD2.desc = "Cad"; // Works, but want to have defaults.
console.log('D1: ' + carD1.getInfo()); //displays 'A blue undefined.' ??!
// The description is lost. So why is that?
// Simple; the create() method only used the prototype and not the constructor.
var carD2 = Object.create(CarD.prototype);
// CarD("Cad"); // Needs 'new'!
//carD2.color = "green";
console.log('D2: ' + carD2.getInfo()); //displays 'A blue undefined.' ??!
////////////////////////////////////////////////////////////////////////////
/* See objectCreate_onlineCode.js */
console.log('E1 ================================');
var CarE = Object.create(null); //this is an empty object, like {}
CarE.prototype = {
    getInfo: function () {
        'use strict';
        return 'A ' + this.color + ' ' + this.desc + '.';
    }
};

var carE1 = Object.create(CarE.prototype, {
    //value properties
    color: {writable: true, configurable: true, value: 'red'},
    //concrete desc value
    //desc: {writable: true, configurable: true, value: 'Porsche boxter'},
    rawDesc: {writable: true, configurable: true, value: 'Porsche boxter'},
    // data properties (assigned using getters and setters)
    desc: {
        configurable: true,
        get: function () {
            'use strict';
            return this.rawDesc.toUpperCase();
        },
        set: function (value) {
            'use strict';
            this.rawDesc = value.toLowerCase();
        }
    }
});
carE1.color = 'blue';
//carE1.rawDesc = "Caddy"; // Does nothing.
// carE1.desc = "Cadillac"; // TypeError: Cannot assign to read only property 'rawDesc' of object '#<Object>'.
//carE1.desc.set('Ford'); // TypeError: carE1.desc.set is not a function.
console.log('desc ' + carE1.desc); // "Porche Boxter" in CAPS
carE1.desc = "Caddy"; // Works now - had writeable false.
console.log('desc ' + carE1.desc); // "CADDY"
console.log('rawDesc ', carE1.rawDesc); // "caddy"
// console.log('set ', carE1.desc.set); // undefined.
// console.log('value ', carE1.desc.value); // undefined.
console.log('E1: ' + carE1.getInfo()); //displays 'A blue CADDY.'
////////////////////////////////////////////////////////////////////////
/*
Each property has its own set of properties known collectively as a descriptor.
For example (below) rawBrand prperty of CarF1 has properties (a descriptor):
    {writable: true, configurable: true, value: 'Porsche boxter'},
A Descriptor is an object that can be one of two types:
 - Data Descriptor (such as above for rawBrand) or
 - Accessor Descriptor, such as for brand:
    {
        configurable: true,
        get: function () {
            'use strict';
            return this.rawBrand.toUpperCase();
        },
        set: function (value) {
            'use strict';
            this.rawBrand = value.toLowerCase();
        }
    }
Data Descriptor: (* only applies to data descriptors)
*   writable: Whether the concrete value of the property may be changed.
    configurable: Whether the type of descriptor may be changed, or if the property can be removed.
    enumerable: Whether the property is listed in a loop through the properties of the object.
*   value: The value of a property. This property references a concrete value -- value describes the concrete data bound to the property.
Accessor Descriptor:
Accessor descriptor proxies access to the concrete value through getter and setter functions.
    It useful when some type of transformation or constraints are required.
    When not set, they'll default to undefined.
    get (): A function called with no arguments when the property value is requested using dot notation (i,e: obj.prop).
    set (newValue): A function called with the new value for the property when
        the user modifies the value of the property using dot notation (i,e: obj.prop = 'new value').
*/ ///////////////////////////////////////////////////////////////////////
console.log('F ================================');
var CarF = Object.create(null); //this is an empty object, like {}
CarF.prototype = {
    getInfo: function () {
        'use strict';
        return 'A ' + this.color + ' ' + this.brand + '.';
    }
};
var CarFdescriptors = {
    // Data Descriptors:
    // Includes concrete color value:
    color: {writable: true, configurable: true, value: 'red'},
    // Includes concrete brand value:
    rawBrand: {writable: true, configurable: true, value: 'Porsche boxter'},
    // data properties (assigned using accessor descriptors: getters and setters)
    brand: {
        configurable: true,
        get: function () {
            'use strict';
            return this.rawBrand.toUpperCase();
        },
        set: function (value) {
            'use strict';
            this.rawBrand = value.toLowerCase();
        }
    }
};
var carF1 = Object.create(CarF.prototype, CarFdescriptors);
carF1.color = 'blue';
carF1.brand = "Caddy";
console.log('F1: ' + carF1.getInfo()); //displays 'A blue CADDY.'
var carF2 = Object.create(CarF.prototype, CarFdescriptors);
carF2.color = 'white';
carF2.brand = "Sedan DeVille";
console.log('F2: ' + carF2.getInfo()); //displays 'A white SEDAN DEVILLE.'
////////////////////////////////////////////////////////////////////////////
/*
Now need an object factory modeled from:
var proto = {
    sentence : 4,
    probation : 2
};
var makePrisoner = function( name, id ) {
    var prisoner = Object.create( proto );
    prisoner.name = name;
    prisoner.id = id;
    return prisoner;
};
var firstPrisoner = makePrisoner( 'Joe', '12A' );
*/
console.log('G ================================');
var CarG = Object.create(null); //this is an empty object, like {}
CarG.prototype = {
    getInfo: function () {
        'use strict';
        return 'A ' + this.color + ' ' + this.brand + '.';
    }
};
var CarGdescriptors = {
    // Data Descriptors:
    // Includes concrete color value:
    color: {writable: true, configurable: true, value: 'red'},
    // Includes concrete brand value:
    rawBrand: {writable: true, configurable: true, value: 'Porsche boxter'},
    // data properties (assigned using accessor descriptors: getters and setters)
    brand: {
        configurable: true,
        get: function () {
            'use strict';
            return this.rawBrand.toUpperCase();
        },
        set: function (value) {
            'use strict';
            this.rawBrand = value.toLowerCase();
        }
    }
};
var makeCarG = function (color, brand) {
    'use strict';
    var carG = Object.create(CarG.prototype, CarGdescriptors);
    carG.color = color;
    carG.brand = brand;
    return carG;
};
var carG1 = makeCarG("white", "Sedan DeVille");
console.log('G1: ' + carG1.getInfo()); //displays 'A blue CADDY.'
// carG2.color = 'white';
// carG2.brand = "Sedan DeVille";
var carG2 = makeCarG("silver", "Rolls Royce");
console.log('G2: ' + carG2.getInfo()); //displays 'A white SEDAN DEVILLE.'