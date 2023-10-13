/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const { getAllProperties, getTypeMap, checkType, equalType }       = require('../src/util-type');
const { checkUnionType, validType, validUnionType }     = require('../src/util-type');

//==============================================================
// test
describe("[target: util-type.js.js]", () => {
    beforeAll(() => {
        // 경고 모킹 = 숨감
        // global.console.warn = jest.fn();
    });
    describe('< 기본 >', () => {
        it('- getTypeMap() ', () => {
            function User() {};
            function Corp() {this.nm = 1};
    
            // null, undefined
            expect(getTypeMap().name).toBe('undefined');
            expect(getTypeMap(null).name).toBe('null');
            // or, and
            expect(getTypeMap([String]).name).toBe('choice');
            expect(getTypeMap([String, Number]).name).toBe('choice');
            expect(getTypeMap({fill:true}).name).toBe('union');
            expect(getTypeMap(new Corp).name).toBe('union');
            // array
            expect(getTypeMap([]).name).toBe('array');
            expect(getTypeMap(Array).name).toBe('array');
            expect(getTypeMap([[]]).name).toBe('array');
            expect(getTypeMap([['_seq_']]).name).toBe('array');
            expect(getTypeMap([['_opt_']]).name).toBe('array');
            expect(getTypeMap([['_any_']]).name).toBe('array');
            // object
            expect(getTypeMap(Object).name).toBe('object');
            expect(getTypeMap({}).name).toBe('object');
            expect(getTypeMap(new User).name).toBe('object');
            expect(getTypeMap(/reg/).name).toBe('object');
            // function
            expect(getTypeMap(Function).name).toBe('function');
            // class
            expect(getTypeMap(User).name).toBe('class');
            expect(getTypeMap(Date).name).toBe('class');    // Data
            // number, NaN
            expect(getTypeMap(Number).name).toBe('number');
            expect(getTypeMap(1).name).toBe('number');
            expect(getTypeMap(NaN).name).toBe('number');
            expect(getTypeMap(2).default).toBe(2);
            // string
            expect(getTypeMap(String).name).toBe('string');
            expect(getTypeMap('str').name).toBe('string');
            expect(getTypeMap('str').default).toBe('str');
            // boolean
            expect(getTypeMap(Boolean).name).toBe('boolean');
            expect(getTypeMap(true).name).toBe('boolean');
            expect(getTypeMap(true).default).toBe(true);
            // Symbol   => new 생성이 안됨
            expect(getTypeMap(Symbol).name).toBe('symbol');  
            expect(getTypeMap(Symbol('a')).name).toBe('symbol');  // 존재하지 않는 타입
            // BigInt는 사용 안함
            expect(() => getTypeMap(2n ** 53n).name).toThrow('ES022');
        });
        it('- 예외 : validType(), validUnionType()  ', () => {
            expect(() => validType(undefined, {})).toThrow(/ES026/);

            // expect(() => validUnionType({}, undefined, Object)).toThrow(/ES022/);
        });
    });
    describe('< 타입 비교 >', () => {
        it('- equalType(a, b) : array choice', () => {
            var typeA1_0 = [];
            var typeB1_0 = [];
            var typeA3_0 = [['_any_']];
            var typeB3_1 = [[null]];
            var typeB3_2 = [];                              // false
            var typeB3_3 = undefined;                       // false
            var typeB3_4 = [[]];                            // false
            var typeA4_0 = [['_any_', String]]
            var typeB4_1 = [['_any_', String]]
            var typeB4_2 = [[String]]
            var typeB4_3 = [[Number]]
            var typeA5_0 = [['_seq_']];
            var typeB5_1 = [['_seq_']];
            var typeB5_2 = [['_seq_', Boolean]];
            var typeB5_3 = [[]];                            // false
            var typeA6_0 = [['_seq_', Number]];
            var typeB6_1 = [['_seq_', Number]];
            var typeB6_2 = [['_seq_', Number, String]];
            var typeB6_3 = [['_seq_']];                     // false
            var typeB6_4 = [['_seq_', Boolean]];            // false
            var typeB6_5 = [[Number]];                      // false
            var typeA7_0 = [['_opt_']];
            var typeB7_1 = [['_opt_']];
            var typeB7_2 = [['_opt_', String]];
            var typeB7_3 = [['_any_']];
            var typeB7_4 = [[]];                            
            var typeA8_0 = [['_opt_', String]];
            var typeB8_1 = [['_opt_', String]];
            var typeB8_2 = [['_opt_', Number, String]];
            var typeB8_3 = [['_opt_', Number]];             // false
            var typeB8_4 = [['_opt_']];                     // false
            var typeB8_5 = [['_any_']];                     // false


            expect(equalType(typeA1, typeB1_0)).toBe(true);
            expect(equalType(typeA3, typeB3_1)).toBe(true);
            expect(equalType(typeA3, typeB3_2)).toBe(false);
            expect(equalType(typeA3, typeB3_3)).toBe(false);
            expect(equalType(typeA3, typeB3_4)).toBe(false);
            expect(equalType(typeA4, typeB4_1)).toBe(true);
            expect(equalType(typeA4, typeB4_2)).toBe(true);
            expect(equalType(typeA4, typeB4_3)).toBe(true);
            expect(equalType(typeA5, typeB5_1)).toBe(true);
            expect(equalType(typeA5, typeB5_2)).toBe(true);
            expect(equalType(typeA5, typeB5_3)).toBe(false);
            expect(equalType(typeA6, typeB6_1)).toBe(true);
            expect(equalType(typeA6, typeB6_2)).toBe(true);
            expect(equalType(typeA6, typeB6_3)).toBe(false);
            expect(equalType(typeA6, typeB6_4)).toBe(false);
            expect(equalType(typeA6, typeB6_5)).toBe(false);
            expect(equalType(typeA7, typeB7_1)).toBe(true);
            expect(equalType(typeA7, typeB7_2)).toBe(true);
            expect(equalType(typeA7, typeB7_3)).toBe(true);
            expect(equalType(typeA7, typeB7_4)).toBe(true);
            expect(equalType(typeA8, typeB8_1)).toBe(true);
            expect(equalType(typeA8, typeB8_1)).toBe(true);
            expect(equalType(typeA8, typeB8_2)).toBe(true);
            expect(equalType(typeA8, typeB8_3)).toBe(false);
            expect(equalType(typeA8, typeB8_4)).toBe(false);
            expect(equalType(typeA8, typeB8_5)).toBe(false);
        });

        it('- equalType(a, b) : 원시 자료형 ', () => {
            var typeA1 = String;
            var typeB1 = String;
            var typeA2 = 'str';
            var typeB2 = 'str';

            expect(equalType(typeA1, typeB1)).toBe(true);
            expect(equalType(typeA2, typeB2)).toBe(true);
        });
        it('- equalType(a, b) : choice ', () => {
        });
        it('- equalType(a, b) : function ', () => {
        });
        it('- equalType(a, b) : object ', () => {
        });
        it('- equalType(a, b) : union (기본) ', () => {
            var typeA1 = {
                str: String,
                num: Number
            };
            var typeB1_1 = {
                str: String,
                num: Number
            };
            var typeB1_2 = {
                str: '',
                num: 0
            };
            var typeB1_3 = {
                str: ''
            };

            expect(equalType(typeA1, typeB1_1)).toBe(true);
            expect(equalType(typeA1, typeB1_2)).toBe(true);
            expect(equalType(typeB1_2, typeA1)).toBe(false);
            expect(equalType(typeA1, typeB1_3)).toBe(false);
        });
        it('- equalType(a, b) : union (choice) ', () => {
            var typeA1 = {
                str: [String, Number],
                bool: ['_any_'],
                num: ['_opt_', Number]
            };
            var typeB1_1 = {
                str: String,
                bool: null,
                num: Number
            };
            var typeB1_2 = {
                str: String,
                bool: null,
                num: Number
            };
            var typeB1_3 = {
                str: '',
                bool: true,
            };
            var typeB1_4 = {
                str: String,
                bool: false,
                num: String
            };
            var typeB1_5 = {
                str: String,
            };

            expect(equalType(typeA1, typeB1_1)).toBe(true);
            expect(equalType(typeA1, typeB1_2)).toBe(true);
            expect(equalType(typeA1, typeB1_3)).toBe(true);
            expect(equalType(typeA1, typeB1_4)).toBe(false);
            expect(equalType(typeA1, typeB1_5)).toBe(false);
        });


    });
    describe('< or 조건 검사 >', () => {
        it('- checkType() : 배열 ', () => {
            var arr1 = [];
            var arr2 = Array;
            var arr3 = [[]];
            var arr4 = [['_any_']];
            var arr5 = [['_seq_', String, Number]];
            var arr6 = [['_seq_']];
            var arr7 = [['_opt_', String, Number]];
            var arr8 = [['_opt_']];
            var arr9 = [[String, Number]];

            // arr1
            expect(checkType(arr1, [1,2,3])).toBe(true);
            expect(checkType(arr1, 10)).toBe(false);
            // arr2
            expect(checkType(arr2, [1,2,3])).toBe(true);
            expect(checkType(arr2, 10)).toBe(false);
            // arr3
            expect(checkType(arr3, [1,2,3])).toBe(true);
            expect(checkType(arr3, 10)).toBe(false);
            // arr4
            expect(checkType(arr4, [1, 'str'])).toBe(true);
            expect(checkType(arr4, [0])).toBe(true);
            expect(checkType(arr4, [])).toBe(true);
            expect(checkType(arr4, [undefined])).toBe(false);
            expect(checkType(arr4, 10)).toBe(false);
            // arr5
            expect(checkType(arr5, ['str', 10])).toBe(true);
            expect(checkType(arr5, ['str', 10, true])).toBe(true);
            expect(checkType(arr5, [10, 'str'])).toBe(false);
            expect(checkType(arr5, ['str'])).toBe(false);
            expect(checkType(arr5, 10)).toBe(false);
            // arr6 : 모든값 ture, 의미 없음!
            expect(checkType(arr6, ['str', 10])).toBe(true);
            expect(checkType(arr6, ['str', 10, true])).toBe(true);
            expect(checkType(arr6, [10, 'str'])).toBe(true);
            expect(checkType(arr6, ['str'])).toBe(true);
            expect(checkType(arr6, 10)).toBe(false);
            // arr7
            expect(checkType(arr7, ['str', 10])).toBe(true);
            expect(checkType(arr7, [10])).toBe(true);
            expect(checkType(arr7, [])).toBe(true);
            expect(checkType(arr7, ['str'])).toBe(true);
            expect(checkType(arr7, [true])).toBe(false);
            expect(checkType(arr7, [{}])).toBe(false);
            expect(checkType(arr7, 10)).toBe(false);
            // arr8 : 모두 true, 의미 없음!
            expect(checkType(arr8, ['str', 10])).toBe(true);
            expect(checkType(arr8, [10])).toBe(true);
            expect(checkType(arr8, ['str'])).toBe(true);
            expect(checkType(arr8, [true])).toBe(true);
            expect(checkType(arr8, [{}])).toBe(true);
            expect(checkType(arr8, [])).toBe(true);
            expect(checkType(arr8, 10)).toBe(false);
            // arr9
            expect(checkType(arr9, ['str', 10])).toBe(true);
            expect(checkType(arr9, [10])).toBe(true);
            expect(checkType(arr9, ['str'])).toBe(true);
            expect(checkType(arr9, [])).toBe(false);
            expect(checkType(arr9, [true])).toBe(false);
            expect(checkType(arr9, [{}])).toBe(false);
            expect(checkType(arr9, 10)).toBe(false);
        });
        it('- checkType() : 일반 ', () => {
            var arr1 = ['_any_'];
            var arr2 = ['_seq_', String, Number];
            var arr3 = ['_seq_'];
            var arr4 = ['_opt_', String, Number];
            var arr5 = ['_opt_'];
            var arr6 = [String, Number];


            // arr1
            expect(checkType(arr1, 10)).toBe(true);
            expect(checkType(arr1,'str')).toBe(true);
            expect(checkType(arr1, [])).toBe(true);
            expect(checkType(arr1, {})).toBe(true);
            expect(checkType(arr1, true)).toBe(true);
            expect(checkType(arr1, undefined)).toBe(false);
            // arr2 : 모두실패
            expect(checkType(arr2, [1,2,3])).toBe(false);
            expect(checkType(arr2, 10)).toBe(false);
            // arr3 : 모두 실패
            expect(checkType(arr3, [1,2,3])).toBe(false);
            expect(checkType(arr3, 10)).toBe(false);
            // arr4
            expect(checkType(arr4, 10)).toBe(true);
            expect(checkType(arr4, 'str')).toBe(true);
            expect(checkType(arr4, undefined)).toBe(true);
            expect(checkType(arr4, true)).toBe(false);
            expect(checkType(arr4, [])).toBe(false);
            expect(checkType(arr4, {})).toBe(false);
            // arr5 : 모두 true
            expect(checkType(arr5, ['str', 10])).toBe(true);
            expect(checkType(arr5, ['str', 10, true])).toBe(true);
            expect(checkType(arr5, [10, 'str'])).toBe(true);
            expect(checkType(arr5, ['str'])).toBe(true);
            expect(checkType(arr5, 10)).toBe(true);
            // arr6 
            expect(checkType(arr6, 10)).toBe(true);
            expect(checkType(arr6, 'str')).toBe(true);
            expect(checkType(arr6, undefined)).toBe(false);
            expect(checkType(arr6, true)).toBe(false);
            expect(checkType(arr6, [])).toBe(false);
            expect(checkType(arr6, {})).toBe(false);
        });
        it('- 커버리지 : 일반 ', () => {
            expect(checkType(['default'], 'str')).toBe(true);   // 기본값 의미
            expect(checkType(['default'], ['str'])).toBe(false); 
        });

    });

    // POINT:
    describe('< function 타입 >', () => {
        it('- function : 선언 타입 검사 ', () => {
            // 타입 
            var type1 = function(){};
            var type2 = function(){};
            type2._TYPE = {args: [String, Number], return: Object};
            var type2_1 = function(String, Number){return Object};
            var type3 = function(){};
            type3._TYPE = {args: [], return: [Object, String]};
            var type3_1 = function(){return [Object, String]};
            
            var args4 = {aa: 1, bb: function(String, Number){}}
            var type4 = function(args4, Number) {};
            var type5 = (Number) => {};
            var type6 = ({fun: String}, Number) => {return Number};


            // 타겟
            var tar1 = function(){}; 
            var tar2 = function(){}; 
            tar2._TYPE = {args: [String, Number], return: [Object]}
            var tar3 = function(){}; 
            tar3._TYPE = {args: [], return: [Object, String]}
            var tar4 = function(){}; 
            tar4._TYPE = {args: [String], return: [Object, String]}
            

            // type1
            expect(checkType(type1, tar1)).toBe(true);
            expect(checkType(type1, tar2)).toBe(true);
            expect(checkType(type1, tar3)).toBe(true);
            // type2
            expect(checkType(type2_1, tar1)).toBe(false);
            expect(checkType(type2, tar1)).toBe(false);
            expect(checkType(type2, tar2)).toBe(true);
            expect(checkType(type2, tar3)).toBe(false);
        });
        it('- function : 외부 참조형 타입 비교 ', () => {
            /**
             * function 의 args 영역 규칙
             * - 거부
             *  + 정수명(0~9) 입력 불가
             *  + 내부에 function 사용 불가, ()=> {} 또한 불가
             * - 허용 
             *  + 객체 및 배열은 가능
             *  + String 원시함수이름을 사용하면, 변수로 인식한다.
             */
            var arg1 = [String, {aa: Number}]
            var type1 = function(arg1){}
            var type2 = function(String, {aa: Number}){}  
            var type3 = function(){}
            type3._TYPE = {args: arg1}
            var type4 = function([{aa: Number}]){}
            
            var tar1 = function(){}; 
            tar1._TYPE = {args: [String, {aa: Number}], return: [Object]}
            var tar2 = function(){};
            tar2._TYPE = {args: [[{aa: Number}]]}

            expect(()=> validType(type1, tar1)).toThrow(/arg1/);    // func 내부 참조변수 오류
            expect(validType(type2, tar1)).toBe(true);
            expect(validType(type3, tar1)).toBe(true);
            expect(validType(type4, tar2)).toBe(true);
            
            // TODO: 확인해야함
            // expect(validType(type3, tar1)).toBe(false);  
            // expect(validType(type3, tar2)).toBe(true);

        });
    });

    describe('< 기본 >', () => {
        it('- getTypeMap() ', () => {
            function User() {};
            function Corp() {this.nm = 1};
    
            // null, undefined
            expect(getTypeMap().name).toBe('undefined');
            expect(getTypeMap(null).name).toBe('null');
            // or, and
            expect(getTypeMap([String]).name).toBe('choice');
            expect(getTypeMap([String, Number]).name).toBe('choice');
            expect(getTypeMap({fill:true}).name).toBe('union');
            expect(getTypeMap(new Corp).name).toBe('union');
            // array
            expect(getTypeMap([]).name).toBe('array');
            expect(getTypeMap(Array).name).toBe('array');
            // object
            expect(getTypeMap(Object).name).toBe('object');
            expect(getTypeMap({}).name).toBe('object');
            expect(getTypeMap(new User).name).toBe('object');
            expect(getTypeMap(/reg/).name).toBe('object');
            // function
            expect(getTypeMap(Function).name).toBe('function');
            // class
            expect(getTypeMap(User).name).toBe('class');
            expect(getTypeMap(Date).name).toBe('class');    // Data
            // number, NaN
            expect(getTypeMap(Number).name).toBe('number');
            expect(getTypeMap(1).name).toBe('number');
            expect(getTypeMap(NaN).name).toBe('number');
            expect(getTypeMap(2).default).toBe(2);
            // string
            expect(getTypeMap(String).name).toBe('string');
            expect(getTypeMap('str').name).toBe('string');
            expect(getTypeMap('str').default).toBe('str');
            // boolean
            expect(getTypeMap(Boolean).name).toBe('boolean');
            expect(getTypeMap(true).name).toBe('boolean');
            expect(getTypeMap(true).default).toBe(true);
            // Symbol   => new 생성이 안됨
            expect(getTypeMap(Symbol).name).toBe('symbol');  
            expect(getTypeMap(Symbol('a')).name).toBe('symbol');  // 존재하지 않는 타입
            // BigInt는 사용 안함
            expect(() => getTypeMap(2n ** 53n).name).toThrow('ES022');
        });
        it('- 예외 : validType(), validUnionType()  ', () => {
            expect(() => validType(undefined, {})).toThrow(/ES026/);
            // expect(() => validUnionType({}, undefined, Object)).toThrow(/ES022/);
        });
    });
    describe('< 비교 >', () => {
        it('- checkType() vs validType() 비교', () => {
            const Func1 = function() { this.aa = 1 };   // 기본값으로 설정
            const compare = {
                // 원시 타입
                p0: {target: null, type: null },
                p1: {target: NaN, type: Number },
                p2: {target: 1, type: Number },
                p3: {target: 'str', type: String },
                p4: {target: true, type: Boolean },
                p5: {target: 1, type: 1 },
                p6: {target: 'str', type: '' },
                p7: {target: true, type: false },
                // 참조 타입
                r1: {target: function any(){}, type: Function },
                r2: {target: {aa: 1}, type: Object },
                r3: {target: [], type: Array },
                // 객체 타입
                o1: {target: /reg/, type: RegExp },
                o2: {target: Symbol(), type: Symbol },
                o3: {target: new Date(), type: Date },
                o4: {target: new Func1(), type: Func1 },
            };
            // checkType()
            expect(checkType(compare.p0.type, compare.p0.target)).toBe(true);
            expect(checkType(compare.p1.type, compare.p1.target)).toBe(true);
            expect(checkType(compare.p2.type, compare.p2.target)).toBe(true);
            expect(checkType(compare.p3.type, compare.p3.target)).toBe(true);
            expect(checkType(compare.p4.type, compare.p4.target)).toBe(true);
            expect(checkType(compare.p5.type, compare.p5.target)).toBe(true);
            expect(checkType(compare.p6.type, compare.p6.target)).toBe(true);
            expect(checkType(compare.p7.type, compare.p7.target)).toBe(true);
            expect(checkType(compare.r1.type, compare.r1.target)).toBe(true);
            expect(checkType(compare.r2.type, compare.r2.target)).toBe(true);
            expect(checkType(compare.r3.type, compare.r3.target)).toBe(true);
            expect(checkType(compare.o1.type, compare.o1.target)).toBe(true);
            expect(checkType(compare.o2.type, compare.o2.target)).toBe(true);
            expect(checkType(compare.o3.type, compare.o3.target)).toBe(true);
            expect(checkType(compare.o4.type, compare.o4.target)).toBe(true);
            // validType()
            expect(validType(compare.p0.type, compare.p0.target)).toBe(true);
            expect(validType(compare.p1.type, compare.p1.target)).toBe(true);
            expect(validType(compare.p2.type, compare.p2.target)).toBe(true);
            expect(validType(compare.p3.type, compare.p3.target)).toBe(true);
            expect(validType(compare.p4.type, compare.p4.target)).toBe(true);
            expect(validType(compare.p5.type, compare.p5.target)).toBe(true);
            expect(validType(compare.p6.type, compare.p6.target)).toBe(true);
            expect(validType(compare.p7.type, compare.p7.target)).toBe(true);
            expect(validType(compare.r1.type, compare.r1.target)).toBe(true);
            expect(validType(compare.r2.type, compare.r2.target)).toBe(true);
            expect(validType(compare.r3.type, compare.r3.target)).toBe(true);
            expect(validType(compare.o1.type, compare.o1.target)).toBe(true);
            expect(validType(compare.o2.type, compare.o2.target)).toBe(true);
            expect(validType(compare.o3.type, compare.o3.target)).toBe(true);
            expect(validType(compare.o4.type, compare.o4.target)).toBe(true);
        });
        
        it.skip('- checkUnionType() vs validUnionType() 비교', () => {
            const Func1 = function() { this.aa = 1 };   // 기본값으로 설정
            const compare = {
                // 원시 타입
                p0: {target: null, type: [null, Object] },
                p1: {target: NaN, type: [String, Object] },
                p2: {target: 1, type: [Boolean, Object] },
                p3: {target: 'str', type: [String, Object] },
                p4: {target: true, type: [Boolean, Object] },
                p5: {target: 1, type: [1, Number] },
                p6: {target: 'str', type: ['', String] },
                p7: {target: true, type: [false, Boolean] },
                // 참조 타입
                r1: {target: function any(){}, type: [Function, Object] },
                r2: {target: {aa: 1}, type: [Object, null] },
                r3: {target: [], type: [Array, Object] },
                // 객체 타입
                o1: {target: /reg/, type: [RegExp, Object] },
                o2: {target: Symbol(), type: [Symbol, Object] },
                o3: {target: new Date(), type: [Date, Function] },
                o4: {target: new Func1(), type: [Func1, Object] },
                o5: {target: new Func1(), type: [Func1, Date] },
            };
            // checkUnionType()
            expect(checkUnionType(compare.p0.target, compare.p0.type[0], compare.p0.type[1])).toBe(false);
            expect(checkUnionType(compare.p1.target, compare.p1.type[0], compare.p1.type[1])).toBe(false);
            expect(checkUnionType(compare.p2.target, compare.p2.type[0], compare.p2.type[1])).toBe(false);
            expect(checkUnionType(compare.p3.target, compare.p3.type[0], compare.p3.type[1])).toBe(false);
            expect(checkUnionType(compare.p4.target, compare.p4.type[0], compare.p4.type[1])).toBe(false);
            expect(checkUnionType(compare.p5.target, compare.p5.type[0], compare.p5.type[1])).toBe(true);
            expect(checkUnionType(compare.p6.target, compare.p6.type[0], compare.p6.type[1])).toBe(true);
            expect(checkUnionType(compare.p7.target, compare.p7.type[0], compare.p7.type[1])).toBe(true);
            expect(checkUnionType(compare.r1.target, compare.r1.type[0], compare.r1.type[1])).toBe(true);
            expect(checkUnionType(compare.r2.target, compare.r2.type[0], compare.r2.type[1])).toBe(true);
            expect(checkUnionType(compare.r3.target, compare.r3.type[0], compare.r3.type[1])).toBe(true);
            expect(checkUnionType(compare.o1.target, compare.o1.type[0], compare.o1.type[1])).toBe(true);
            expect(checkUnionType(compare.o2.target, compare.o2.type[0], compare.o2.type[1])).toBe(false);
            expect(checkUnionType(compare.o3.target, compare.o3.type[0], compare.o3.type[1])).toBe(false);
            expect(checkUnionType(compare.o4.target, compare.o4.type[0], compare.o4.type[1])).toBe(true);
            expect(checkUnionType(compare.o5.target, compare.o5.type[0], compare.o5.type[1])).toBe(false);
            // validUnionType()
            expect(()=> validUnionType(compare.p0.target, compare.p0.type[0], compare.p0.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p1.target, compare.p1.type[0], compare.p1.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p2.target, compare.p2.type[0], compare.p2.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p3.target, compare.p3.type[0], compare.p3.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.p4.target, compare.p4.type[0], compare.p4.type[1])).toThrow(/ES065/);
            expect(validUnionType(compare.p5.target, compare.p5.type[0], compare.p5.type[1])).toBe(true);
            expect(validUnionType(compare.p6.target, compare.p6.type[0], compare.p6.type[1])).toBe(true);
            expect(validUnionType(compare.p7.target, compare.p7.type[0], compare.p7.type[1])).toBe(true);
            expect(validUnionType(compare.r1.target, compare.r1.type[0], compare.r1.type[1])).toBe(true);
            expect(validUnionType(compare.r2.target, compare.r2.type[0], compare.r2.type[1])).toBe(true);
            expect(validUnionType(compare.r3.target, compare.r3.type[0], compare.r3.type[1])).toBe(true);
            expect(validUnionType(compare.o1.target, compare.o1.type[0], compare.o1.type[1])).toBe(true);
            expect(()=> validUnionType(compare.o2.target, compare.o2.type[0], compare.o2.type[1])).toThrow(/ES065/);
            expect(()=> validUnionType(compare.o3.target, compare.o3.type[0], compare.o3.type[1])).toThrow(/ES065/);
            expect(validUnionType(compare.o4.target, compare.o4.type[0], compare.o4.type[1])).toBe(true);
            expect(()=> validUnionType(compare.o5.target, compare.o5.type[0], compare.o5.type[1])).toThrow(/ES065/);
        });
    });

    describe('< type 기준 >', () => {
        it('- 타입이 없는 경우 ', () => {
            expect(checkType(1)).toBe(true);
            // expect(checkUnionType(1)).toBe(false);
            // expect(()=> validType(1)).toThrow('ES026');
            // expect(()=> validUnionType(1)).toThrow('ES026');
        });
        it('- [_any_] : any 타입 (단독, or, and) ', () => {
            // 단독 검사
            expect(checkType(['_any_'], function any(){})).toBe(true);
            expect(checkType(['_any_'], function any(){})).toBe(true);
            expect(checkType(['_any_'], null)).toBe(true);
            expect(checkType(['_any_'], 1)).toBe(true);
            expect(checkType(['_any_'], NaN)).toBe(true);
            expect(checkType(['_any_'], 'str')).toBe(true);
            expect(checkType(['_any_'], true)).toBe(true);
            expect(checkType(['_any_'], /reg/)).toBe(true);
            expect(checkType(['_any_'], Symbol())).toBe(true);
            expect(checkType(['_any_'], [])).toBe(true);
            expect(checkType(['_any_'], {aa: 1})).toBe(true);
            expect(checkType(['_any_'], Number)).toBe(true);
            expect(checkType(['_any_'], String)).toBe(true);
            expect(checkType(['_any_'], Function)).toBe(true);
            expect(checkType(['_any_'], Object)).toBe(true);
            expect(checkType(['_any_'], Symbol)).toBe(true);
            // or 검사
            expect(checkType([String, ['_any_']], function any() {})).toBe(true);
            expect(checkType(String, function any() {}, null)).toBe(false); // args 전달 안받음 배열로만 받음
            // TODO: 넘치면 오류 또는 경고 처리해야 오류를 낮출듯
            // and 검사
            // expect(checkUnionType(function any(){}, null, Function)).toBe(true);
            // expect(checkUnionType(function any(){}, null, Object)).toBe(true);  // 상위
            // expect(checkUnionType(function any(){}, null, String)).toBe(false);
            // 타겟이 없는(undefind)인 경우
            expect(checkType(undefined, null)).toBe(false);
            expect(checkType(null, null)).toBe(true);
        });
        it('- Number, 1,2, NaN : number 타입', () => {
            // true
            expect(checkType(1, 0)).toBe(true);
            expect(checkType(Number, 0)).toBe(true);
            expect(checkType(NaN, 0)).toBe(true);
            expect(checkType(NaN, NaN)).toBe(true);
            // false (예외)
            expect(()=> validType(1, function any(){})).toThrow('ES024');
            expect(()=> validType(NaN, function any(){})).toThrow('ES024');
            expect(()=> validType(Number, function any(){})).toThrow('ES024');
            expect(()=> validType(Number, null)).toThrow('ES024');
            expect(()=> validType(Number, true)).toThrow('ES024');
            expect(()=> validType(Number, /reg/)).toThrow('ES024');
            expect(()=> validType(Number, 'str')).toThrow('ES024');
            expect(()=> validType(Number, Symbol())).toThrow('ES024');
            expect(()=> validType(Number, [])).toThrow('ES024');
            expect(()=> validType(Number, {aa:1})).toThrow('ES024');
            expect(()=> validType(Number)).toThrow('ES024');
            expect(()=> validType(Number, Symbol)).toThrow('ES024');
        });
        it('- String, "str" : string 타입 ', () => {
            // true
            expect(checkType('str', '')).toBe(true);
            expect(checkType(String, '')).toBe(true);
            // false (예외)
            expect(()=> validType('str', function any(){})).toThrow('ES024');
            expect(()=> validType(String, function any(){})).toThrow('ES024');
            expect(()=> validType(String, null)).toThrow('ES024');
            expect(()=> validType(String, true)).toThrow('ES024');
            expect(()=> validType(String, /reg/)).toThrow('ES024');
            expect(()=> validType(String, 1)).toThrow('ES024');
            expect(()=> validType(String, Symbol())).toThrow('ES024');
            expect(()=> validType(String, [])).toThrow('ES024');
            expect(()=> validType(String, {aa:1})).toThrow('ES024');
            expect(()=> validType(String, Number)).toThrow('ES024');
            expect(()=> validType(String, Symbol)).toThrow('ES024');
        });
        it('- Boolean, true, false : boolean 타입 ', () => {
            // true
            expect(checkType(true, false)).toBe(true);
            expect(checkType(Boolean, false)).toBe(true);
            // false (예외)
            expect(()=> validType(true, function any(){})).toThrow('ES024');
            expect(()=> validType(Boolean, function any(){})).toThrow('ES024');
            expect(()=> validType(Boolean, null)).toThrow('ES024');
            expect(()=> validType(Boolean, 'str')).toThrow('ES024');
            expect(()=> validType(Boolean, /reg/)).toThrow('ES024');
            expect(()=> validType(Boolean, 1)).toThrow('ES024');
            expect(()=> validType(Boolean, Symbol())).toThrow('ES024');
            expect(()=> validType(Boolean, [])).toThrow('ES024');
            expect(()=> validType(Boolean, {aa:1})).toThrow('ES024');
            expect(()=> validType(Boolean, Number)).toThrow('ES024');
            expect(()=> validType(Boolean, Symbol)).toThrow('ES024');
        });
        
        it('- Array, [] : array 타입 ', () => {
            // true
            expect(checkType(Array, [])).toBe(true);
            expect(checkType([], [false])).toBe(true);
            // false (예외)
            expect(()=> validType(Array, function any(){})).toThrow('ES024');
            expect(()=> validType(Array, function any(){}, [])).toThrow('ES024');
            expect(()=> validType(Array, null)).toThrow('ES024');
            expect(()=> validType(Array, 'str')).toThrow('ES024');
            expect(()=> validType(Array, /reg/)).toThrow('ES024');
            expect(()=> validType(Array, 1)).toThrow('ES024');
            expect(()=> validType(Array, Symbol())).toThrow('ES024');
            expect(()=> validType(Array, true)).toThrow('ES024');
            expect(()=> validType(Array, {aa:1})).toThrow('ES024');
            expect(()=> validType(Array, Number)).toThrow('ES024');
            expect(()=> validType(Array, Symbol)).toThrow('ES024');
        });
        it('- Function : function 타입 ', () => {
            // true
            expect(checkType(Function, function any(){})).toBe(true);
            // false (예외)
            expect(()=> validType(Function, [])).toThrow('ES024');
            expect(()=> validType(Function, null)).toThrow('ES024');
            expect(()=> validType(Function, 'str')).toThrow('ES024');
            expect(()=> validType(Function, /reg/)).toThrow('ES024');
            expect(()=> validType(Function, 1)).toThrow('ES024');
            expect(()=> validType(Function, Symbol())).toThrow('ES024');
            expect(()=> validType(Function, true)).toThrow('ES024');
            expect(()=> validType(Function, {aa:1})).toThrow('ES024');
        });
        it('- Object, {} : object 타입 (regex, new, null) ', () => {
            const Func = function() {};
            // true
            expect(checkType({}, Object)).toBe(true);
            // expect(checkType(null, Object)).toBe(true);
            expect(checkType({}, /reg/)).toBe(true);
            expect(checkType({}, new Func())).toBe(true);
            expect(checkType({}, function any(){})).toBe(true);
            expect(checkType({}, Number)).toBe(true);
            expect(checkType({}, Symbol)).toBe(true);
            // false (예외)
            // expect(()=> validType(function any(){}, Object)).toThrow(/object.*타입/);
            expect(()=> validType(Object, 'str')).toThrow('ES024');
            expect(()=> validType(Object, 1)).toThrow('ES024');
            expect(()=> validType(Object, Symbol())).toThrow('ES024');
            expect(()=> validType(Object, true)).toThrow('ES024');
            // expect(()=> validType(Number, Object)).toThrow(/object.*타입/);
            // expect(()=> validType(Symbol, Object)).toThrow(/object.*타입/);
            expect(()=> validType(Object, null)).toThrow('ES024');
        });
        it('- function() : class 타입', () => {
            const Func1 = function() { this.aa = Number };
            const Func2 = function() { this.aa = 1 };   // 기본값으로 설정
            const Func3 = function() { this.aa = Date };
            // true
            expect(checkType(Func1, new Func2())).toBe(true);
            expect(checkType(Func1, new Func1())).toBe(true);
            expect(checkType(Func1, { aa:10 })).toBe(true);
            expect(checkType(Func2, { aa:10 })).toBe(true);
            expect(checkType(Func3, { aa: new Date() })).toBe(true);
            // false (예외)
                // expect(()=> validType(new Func1(), Func1)).toThrow(/aa.*number.*타입/);   // function 으로 생각하므로 오류
            expect(()=> validType(Func1, function any(){})).toThrow('ES032');
            expect(()=> validType(Func1, null)).toThrow('ES032');
            expect(()=> validType(Func1, 'str')).toThrow('ES032');
            expect(()=> validType(Func1, /reg/)).toThrow('ES031');
            expect(()=> validType(Func1, 1)).toThrow('ES032');
            expect(()=> validType(Func1, Symbol())).toThrow('ES032');
            expect(()=> validType(Func1, true)).toThrow('ES032');
            expect(()=> validType(Func1, Number)).toThrow('ES032');
            expect(()=> validType(Func1, Symbol)).toThrow('ES032');
        });

        it('- [] : or 타입 (내장 타입) ', () => {
            const Func1 = function() { this.aa = Number };
            // true (베열)
            expect(checkType([String, Number], 1)).toBe(true);
            expect(checkType([String, Number], 'str')).toBe(true);
            expect(checkType([Boolean, Number], true)).toBe(true);
            expect(checkType([Boolean, null], null)).toBe(true);
            expect(checkType([Boolean, ['_any_']], /reg/)).toBe(true);       // any
            expect(checkType([Boolean, Object], /reg/)).toBe(true);     // objct 최상위
            expect(checkType([Boolean, RegExp], /reg/)).toBe(true);     // 내장 함수
            expect(checkType([Func1, Number], new Func1())).toBe(true);
            expect(checkType([[String, Func1], Number], new Func1())).toBe(true);   // 복합 배열
            expect(checkType([[[Func1]], Number], [new Func1()])).toBe(true);         // 복합 하위 배열
            // [[[Func1]]  는 배열안에 함수를 의미함!
            // false (예외)
            expect(()=> validType([Array, String], 1)).toThrow(/ES024.*ES024/);
            expect(()=> validType([Array], function any(){})).toThrow(/ES024/);
            expect(()=> validType([String], function any(){})).toThrow(/ES024/);
            expect(()=> validType([String, Number], null)).toThrow(/ES024.*ES024/);
            expect(()=> validType([Array, Number, Boolean], 'str')).toThrow(/ES024.*ES024.*ES024/);
        });
        it('- {obj:...} : and 타입 ', () => {
       
        });
        it('- Symbol() : symbol 타입', () => {
            // true
            expect(checkType(Symbol, Symbol())).toBe(true);
            // false (예외)
            expect(()=> validType(Symbol, function any(){})).toThrow('ES024');
            expect(()=> validType(Symbol, function any(){})).toThrow('ES024');
            expect(()=> validType(Symbol, null)).toThrow('ES024');
            expect(()=> validType(Symbol, 'str')).toThrow('ES024');
            expect(()=> validType(Symbol, /reg/)).toThrow('ES024');
            expect(()=> validType(Symbol, 1)).toThrow('ES024');
            expect(()=> validType(Symbol, true)).toThrow('ES024');
            expect(()=> validType(Symbol, [])).toThrow('ES024');
            expect(()=> validType(Symbol, {aa:1})).toThrow('ES024');
            expect(()=> validType(Symbol, Number)).toThrow('ES024');
            expect(()=> validType(Symbol, Symbol)).toThrow('ES024');
        });
        it('- Date : object 타입 (class) ', () => {    
            // true
            expect(checkType(Date, new Date())).toBe(true);
            expect(checkType(new Date(), new Date())).toBe(true);
            // false
            expect(()=> validType(Date, function any(){})).toThrow('ES032');
            expect(()=> validType(Date, null)).toThrow('ES032');
            expect(()=> validType(Date, true)).toThrow('ES032');
            expect(()=> validType(Date, 1)).toThrow('ES032');
            expect(()=> validType(Date, 'str')).toThrow('ES032');
            expect(()=> validType(Date, [])).toThrow('ES032');
            expect(()=> validType(Date, {aa:1})).toThrow('ES032');
            expect(()=> validType(Date, Number)).toThrow('ES032');
            expect(()=> validType(Date, /reg/)).toThrow('ES032');
            expect(()=> validType(Date, Symbol())).toThrow('ES032');
            expect(()=> validType(Date, Symbol)).toThrow('ES032');
        });
        it('- RegExp : object 타입 (class)', () => {
            // true
            expect(checkType(RegExp, /reg/)).toBe(true);
            expect(checkType(/reg/, /target/)).toBe(true);
            // false
            expect(()=> validType(RegExp, function any(){})).toThrow('ES032');
            expect(()=> validType(RegExp, null)).toThrow('ES032');
            expect(()=> validType(RegExp, true)).toThrow('ES032');
            expect(()=> validType(RegExp, 1)).toThrow('ES032');
            expect(()=> validType(RegExp, 'str')).toThrow('ES032');
            expect(()=> validType(RegExp, [])).toThrow('ES032');
            expect(()=> validType(RegExp, {aa:1})).toThrow('ES032');
            expect(()=> validType(RegExp, Number)).toThrow('ES032');
            expect(()=> validType(RegExp, new Date())).toThrow('ES032');
            expect(()=> validType(RegExp, Symbol())).toThrow('ES032');
            expect(()=> validType(RegExp, Symbol)).toThrow('ES032');
        });
    });
    
    

    describe('checkType() <or 조건>', () => {
        it('- 객체 타입 ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = Number };
            var obj1 = { aa: 'STR', bb: 10};
            var obj2 = { aa: 'STR'};
            var obj3 = { bb: 10};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};
    
            // true
            expect(checkType([Func1, Func2], obj1)).toBe(true);
            expect(checkType(Func1, obj1)).toBe(true);
            expect(checkType(Func2, obj1)).toBe(true);
            expect(checkType([Func1, Func2], obj2)).toBe(true);
            expect(checkType(Func1, obj2)).toBe(true);
            expect(checkType(Func2, obj2)).toBe(false);
            expect(checkType([Func1, Func2], obj3)).toBe(true);
            expect(checkType(Func1, obj3)).toBe(false);
            expect(checkType(Func2, obj3)).toBe(true);
            expect(checkType([Func1, Func2], obj4)).toBe(true);
            expect(checkType(Func1, obj4)).toBe(true);
            expect(checkType(Func2, obj4)).toBe(false);
            // false (예외)
            expect(()=> validType([Func1, Func2], obj5)).toThrow(/ES027(.|\s)*ES027/);
        });
        it('- 원시 타입 ', () => {
            // true
            expect(checkType([Number, String, Boolean], 1)).toBe(true);
            expect(checkType([Number, String, Boolean], 'str')).toBe(true);
            expect(checkType([Number, String, Boolean], true)).toBe(true);            
            // false
            expect(checkType([Number, String, Boolean], new Date())).toBe(false);
            expect(checkType([Number, String, Boolean], /reg/)).toBe(false);
            expect(checkType([Number, String, Boolean], Symbol())).toBe(false);
            expect(checkType([Number, String, Boolean], [])).toBe(false);
            expect(checkType([Number, String, Boolean], {})).toBe(false);
        });
        it('- 내장 객체 타입 ', () => {
            // true
            expect(checkType([RegExp, Date, Symbol], new Date())).toBe(true);
            expect(checkType([RegExp, Date, Symbol], /reg/)).toBe(true);
            expect(checkType([RegExp, Date, Symbol], Symbol())).toBe(true);            
            // false
            expect(checkType([RegExp, Date, Symbol], 1)).toBe(false);
            expect(checkType([RegExp, Date, Symbol], true)).toBe(false);
            expect(checkType([RegExp, Date, Symbol], 'str')).toBe(false);       
            expect(checkType([RegExp, Date, Symbol], [])).toBe(false);       
            expect(checkType([RegExp, Date, Symbol], {})).toBe(false);       
        });
        it('- 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            // true
            expect(checkType([Super, Sub], new Sub())).toBe(true);
            expect(checkType(Super, new Sub())).toBe(true);
            expect(checkType(Sub, new Sub())).toBe(true);
            expect(checkType(Object, new Sub())).toBe(true);       
        });
        
    });
    describe.skip('checkUnionType() <and 조건>', () => {
        it('- 객체 타입 ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = Number };
            var obj1 = { aa: 'STR', bb: 10};
            var obj2 = { aa: 'STR'};
            var obj3 = { bb: 10};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};

            expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
            expect(checkUnionType(obj1, Func1)).toBe(true);
            expect(checkUnionType(obj1, Func2)).toBe(true);
            expect(checkUnionType(obj2, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj2, Func1)).toBe(true);
            expect(checkUnionType(obj2, Func2)).toBe(false);
            expect(checkUnionType(obj3, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj3, Func1)).toBe(false);
            expect(checkUnionType(obj3, Func2)).toBe(true);
            expect(checkUnionType(obj4, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj4, Func1)).toBe(true);
            expect(checkUnionType(obj4, Func2)).toBe(false);
            expect(checkUnionType(obj5, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj5, Func1)).toBe(false);
            expect(checkUnionType(obj5, Func2)).toBe(false);
            expect(()=> validUnionType(obj2, Func1, Func2)).toThrow('ES027');
            expect(()=> validUnionType(obj3, Func1, Func2)).toThrow('ES027');
            expect(()=> validUnionType(obj4, Func1, Func2)).toThrow('ES024');
            expect(()=> validUnionType(obj5, Func1, Func2)).toThrow('ES027');    // aa, bb
        });
        it('- 원시 타입 ', () => {
            // true
            expect(checkUnionType(1, Number, String, Boolean)).toBe(false);
            expect(checkUnionType('str', Number, String, Boolean)).toBe(false);
            expect(checkUnionType(true, Number, String, Boolean)).toBe(false);            
        });
        it('- 내장 객체 타입 ', () => {
            // true
            expect(checkUnionType(new Date(), Date, Object)).toBe(true);
            expect(checkUnionType(/reg/, RegExp, Object)).toBe(true);
            // false
            expect(checkUnionType(Symbol(), Symbol, Object)).toBe(false);   // instanceof 아님!       
        });
        it('- 상속 객체 타입 ', () => {
            class Super {
                aa = 1;
            }
            class Sub extends Super {
                bb = 'str'
                constructor(){ super() }
            }
            // true
            expect(checkUnionType(new Sub(), Super, Sub)).toBe(true);
            expect(checkUnionType(new Sub(), Super)).toBe(true);
            expect(checkUnionType(new Sub(), Sub)).toBe(true);
            expect(checkUnionType(new Sub(), Object)).toBe(true);       
        });
    });
    describe('< 기본값 >', () => {
        
        it('- 객체 기본값 : checkType() ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = 10 };
            var obj1 = { aa: 'str', bb: 2}
            var obj2 = { aa: 'str'}
            var obj3 = { bb: 5};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};

            // true
            expect(checkType([Func1, Func2], obj1)).toBe(true);
            expect(checkType(Func1, obj1)).toBe(true);
            expect(checkType(Func2, obj1)).toBe(true);
            expect(obj1.bb).toBe(2);
            expect(checkType([Func1, Func2], obj2)).toBe(true);
            expect(checkType(Func1, obj2)).toBe(true);
            expect(checkType(Func2, obj2)).toBe(true);
            expect(obj2.bb).toBe(10);    // 객체값 복사
            expect(checkType([Func1, Func2], obj3)).toBe(true);
            expect(checkType(Func1, obj3)).toBe(false);
            expect(checkType(Func2, obj3)).toBe(true);
            expect(obj3.bb).toBe(5);    // 객체값 복사
            expect(checkType([Func1, Func2], obj4)).toBe(true);
            expect(checkType(Func1, obj4)).toBe(true);
            expect(checkType(Func2, obj4)).toBe(false);
            expect(checkType([Func1, Func2], obj5)).toBe(true);
            expect(checkType(Func1, obj5)).toBe(false);
            expect(checkType(Func2, obj5)).toBe(true);
        });
        it.skip('- 객체 기본값 : checkUnionType() ', () => {
            var Func1 = function() { this.aa = String };
            var Func2 = function() { this.bb = 10 };
            var obj1 = { aa: 'str', bb: 2}
            var obj2 = { aa: 'str'}
            var obj3 = { bb: 5};
            var obj4 = { aa: 'STR', bb: 'STR'};
            var obj5 = { cc: 'STR'};

            expect(checkUnionType(obj1, Func1, Func2)).toBe(true);
            expect(checkUnionType(obj1, Func1)).toBe(true);
            expect(checkUnionType(obj1, Func2)).toBe(true);
            expect(obj1.bb).toBe(2);
            expect(checkUnionType(obj2, Func1, Func2)).toBe(true); // 기본값에 따라 true
            expect(checkUnionType(obj2, Func1)).toBe(true);
            expect(checkUnionType(obj2, Func2)).toBe(true); // 기본값에 따라 true
            expect(obj2.bb).toBe(10);    // 객체값 복사
            expect(checkUnionType(obj3, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj3, Func1)).toBe(false);
            expect(checkUnionType(obj3, Func2)).toBe(true);
            expect(obj3.bb).toBe(5);    // 객체값 복사
            expect(checkUnionType(obj4, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj4, Func1)).toBe(true);
            expect(checkUnionType(obj4, Func2)).toBe(false);
            expect(checkUnionType(obj5, Func1, Func2)).toBe(false); 
            expect(checkUnionType(obj5, Func1)).toBe(false);
            expect(checkUnionType(obj5, Func2)).toBe(true);     // 기본값에 따라 true
        });
        it.skip('- 원시 기본값 : checkType() ', () => {
            var str = 'STR';
            var num = 100;
            var bool = true;
            var obj;
            
            expect(checkType(obj, str)).toBe(true);
            expect(checkType(obj, num)).toBe(true);
            expect(checkType(obj, bool)).toBe(true);
            expect(obj).toBeUndefined();                            // 참조 타입이 값이 전달되어 값이 설정 안됨
        });
        it.skip('- 원시 기본값 : checkUnionType() ', () => {
            var str = 'STR';
            var num = 100;
            var bool = true;
            var obj;
            
            expect(checkUnionType(obj, str)).toBe(true);
            expect(checkUnionType(obj, num)).toBe(true);
            expect(checkUnionType(obj, bool)).toBe(true);
            expect(obj).toBeUndefined();                            // 참조 타입이 값이 전달되어 값이 설정 안됨
        });
        it('- 원시 객체 기본값 ', () => {
            var reg = /reg/;
            var date = new Date();
            var symbol = Symbol();
            var obj;
            
            expect(checkType(/reg2/, reg)).toBe(true);
            expect(checkType(new Date(), date)).toBe(true);
            expect(checkType(Symbol(), symbol)).toBe(true);
            // false
            expect(checkType(obj, reg)).toBe(false);
            expect(checkType(obj, date)).toBe(false);
            expect(checkType(obj, symbol)).toBe(false);
            expect(obj).toBeUndefined();
        });
    });
    

});
