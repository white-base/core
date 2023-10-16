

var inherits = (function () {

    if (typeof Object.create === 'function') {
        // implementation from standard node.js 'Util' module
        return function(ctor, superCtor) {
            if (superCtor) {
                ctor.super = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        writable: true,
                        configurable: true,
                        enumerable: false,
                    }
                });
                // 상위 조회를 위해
                // Object.setPrototypeOf(ctor, superCtor);
                // Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
            }
        };
    } else {
        // old school shim for old browsers
        return function (ctor, superCtor) {
            if (superCtor) {
                ctor.super = superCtor;
                var TempCtor = function () {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
                // 상위 조회를 위해
                // Object.setPrototypeOf(ctor, superCtor);
            }
        }
    }
}());

class Class1 {
    aa =1
}
class Class2 extends Class1 {
    bb = 1
    constructor(){super()}
}

function Fun1 () {
    this.aa = 1
}
function Fun2 () {
    Fun1.call(this);

    this.bb = 1
}
inherits(Fun2, Fun1);


// Class2.


console.log(0);
