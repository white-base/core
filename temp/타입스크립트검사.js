// ts-check



var a = 1;


// a = 'str'    // 타입 에러

console.log('0');

var core = require('../');
// var {Observer} = require('../');

// import {Observer} from 'logic-core'
// const {Observer} = require('logic-core')
const {Observer} = require('../')

var i  = new core.Observer({})
i.publish()

var i2 = new Observer({})


var assert = require('assert')


var ii = new assert.AssertionError({})



console.log(0);
// i.