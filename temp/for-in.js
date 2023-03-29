

var SimplePropertyRetriever = {
    getOwnEnumerables: function(obj) {
        return this._getPropertyNames(obj, true, false, this._enumerable);
         // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
    },
    getOwnNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, false, this._notEnumerable);
    },
    getOwnEnumerablesAndNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
        // Or just use: return Object.getOwnPropertyNames(obj);
    },
    getPrototypeEnumerables: function(obj) {
        return this._getPropertyNames(obj, false, true, this._enumerable);
    },
    getPrototypeNonenumerables: function(obj) {
        return this._getPropertyNames(obj, false, true, this._notEnumerable);
    },
    getPrototypeEnumerablesAndNonenumerables: function(obj) {
        return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
    },
    getOwnAndPrototypeEnumerables: function(obj) {
        return this._getPropertyNames(obj, true, true, this._enumerable);
        // Or could use unfiltered for..in
    },
    getOwnAndPrototypeNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, true, this._notEnumerable);
    },
    getOwnAndPrototypeEnumerablesAndNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
    },
    // Private static property checker callbacks
    _enumerable: function(obj, prop) {
        return obj.propertyIsEnumerable(prop);
    },
    _notEnumerable: function(obj, prop) {
        return !obj.propertyIsEnumerable(prop);
    },
    _enumerableAndNotEnumerable: function(obj, prop) {
        return true;
    },
    // Inspired by http://stackoverflow.com/a/8024294/271577
    _getPropertyNames: function getAllPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
        var props = [];

        do {
            if (iterateSelfBool) {
                Object.getOwnPropertyNames(obj).forEach(function(prop) {
                    if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
                        props.push(prop);
                    }
                });
            }
            if (!iteratePrototypeBool) {
                break;
            }
            iterateSelfBool = true;
        } while (obj = Object.getPrototypeOf(obj));

        return props;
    }
};


class Cls {
    aa = 1;
    m1() {}
}

function Fun() {
    this.aa = 1;
}
Fun.prototype.m1 = function() {}

let c = new Cls();
let f = new Fun();

SimplePropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(c, true, true, this._notEnumerable).forEach(val => {
    console.log(val);
}

    )
console.log('----ss---');


for (let key in c) {
    console.log(key);
}
console.log('-------');

for (let key in f) {
    console.log(key);
}
console.log('-------');


function getAllProperties(obj){
    var allProps = [], curr = obj
    do{
        var props = Object.getOwnPropertyNames(curr)
        props.forEach(function(prop){
            if (allProps.indexOf(prop) === -1)
            allProps.push(prop)
        })
    }while(curr = Object.getPrototypeOf(curr))
    return allProps
}

function getAllProperties2(obj, isObject){
    var allProps = [], curr = obj;
    var is = isObject || false;
    do{
        var props = Object.getOwnPropertyNames(curr)
        props.forEach(function(prop){
            if (allProps.indexOf(prop) === -1 && (isObject || !Object.prototype.hasOwnProperty(prop)))
            allProps.push(prop)
        })
    }while(curr = Object.getPrototypeOf(curr))
    return allProps
}


// console.log(getAllProperties([1,2,3]));
console.log(getAllProperties(c));
console.log('-------');

getAllProperties(c).forEach((val) => {
    // console.log(val);
    // if (Object.hasOwnProperty(val)) console.log(val)
    if (!Object.prototype.hasOwnProperty(val)) console.log(val)
    
})
console.log('-------');

getAllProperties(f).forEach((val) => {
    // console.log(val);
    // if (Object.hasOwnProperty(val)) console.log(val)
    if (!Object.prototype.hasOwnProperty(val)) console.log(val)
    else     console.log('not: '+val)
})
console.log('-------');

getAllProperties2(f).forEach((val) => {
    console.log(val);
    // if (Object.hasOwnProperty(val)) console.log(val)
    // if (!Object.prototype.hasOwnProperty(val)) console.log(val)
    // else     console.log('not: '+val)
})
console.log('-------');
getAllProperties2(c, true).forEach((val) => {
    console.log(val);
    // if (Object.hasOwnProperty(val)) console.log(val)
    // if (!Object.prototype.hasOwnProperty(val)) console.log(val)
    // else     console.log('not: '+val)
})

console.log('-------');

console.log('End');