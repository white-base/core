

const {extendType, typeObject, typeOf}  = require('../src/util-type');
const {isAllowType, allowType }  = require('../src/util-type');
const { isMatchType, matchType }  = require('../src/util-type');

 


matchType([[Array, String]], 1)
// 
allowType(['_seq_', Number], ['_seq_', Boolean])

// a  / b

var origin = {
    $type: 'array', kind: '_seq_', list: [{ $type: 'number' }]
}

var target = {
    $type: 'array', kind: '_seq_', list: [{ $type: 'boolean' }]
}

class MyError extends Error {
    
    msg = [];

    constructor(message) {
      super(message)
      this.name = 'MyError'
      this.msg.push(this.name)
    }
  
    toString() {
      return this.name + ': ' + this.message + ':: ' + this.msg.length
    }
  }

// function start() {
//     throw new MyError('1')
//     // throw new CustomError('2')
//   }


class Type2Error extends Error {
  constructor(message) {
    super(message);
  }
}
class ExtendTypeError extends Error {

  constructor(message) {
    super(message);
  }
}



// try {

//   try {
//     // start()
//     // throw new MyError('생성메세지')
//     // throw new MyError()
//     throw new ExtendTypeError()

//   } catch (e) {
//     // if (e instanceof MyError) {
//     //   console.log('catch MyError')
//     // } else if (e instanceof CustomError) {
//     //   console.log('catch CustomError')
//     // }
//     console.log('2')
//     // e.msg.push('외부')
//     throw e;
//   }

// } catch(ee) {
//   console.log('22')
//   throw ee;
// }





// console.error('aaa')  


// throw new Error('\t 오류\n\t\t오류2\n\t\t오류3')

// throw new Error('오류\n  + 오류2\n  + 오류3')

// throw new Error(
// `오류
//   + 오류2
//     + 오류3
//         + 오류4
// `)

// throw new Error(`allow 매칭 오류가 발생하였습니다'
// path: aaa[array(_seq_)] > bbb[choice(any)]  
// path: aaa[array(_seq_)] > 2[choice(any)]  
// path: aaa[0]<array(seq)>[aaa]
// path: aaa[0][bbb][ccc] : array(seq)
// `)

// throw new Error(`allow 매칭 오류가 발생하였습니다'
// type path: aaa[0][bbb][ccc] : array(seq)
// `)

/**
 * allow 는 구조를 표현해야 할듯하고
 * match 에는 대상은 명칭으로만 표현하고, origin 타입을 표현해야함
 */

/**
 * allow - array seq - 원본: number, 대상: boolean 대상이 다릅니다. 
 * allow < array(seq) < 원본: number, 대상: boolean 대상이 다릅니다. 
 * position : type.aa.bb (기본값은 origin)
 * 
 * allow 
 *  + array(seq)
 *      + 계층 오류 방식
 * 
 * target
 * union 의 경우 객체의 실패 위치
 * 블럭
 */

console.log('.');
