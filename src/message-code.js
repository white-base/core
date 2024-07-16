/**** message-code.js | _L.messageCode.core ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    //==============================================================
    // 2. module dependency check
    //==============================================================
    var messageCode = {
        eng: {},
        kor: {
            // 실패
            ES010: '기타 오류',
            ES011: '["$1"] 모듈을 가져오는데 실패하였습니다.',
            ES012: '["$1"()] 함수를 가져오는데 실패하였습니다.',
            ES013: '[$1]는 [$2] 처리가 실패하였습니다.',
            // 타입
            ES021: '[$1]는 [$2] 타입만 가능합니다.',
            ES022: '[$1]는 처리할 수 없는 타입니다.', 
            ES023: '[$1]는 [$2]타입이 아닙니다.',
            // 객체
            ES031: '[$1]는 객체가 아닙니다.',
            ES032: '[$1]는 [$2]의 인스턴스가 아닙니다.',
            ES033: '[$1]의 객체가 [$2]와 다릅니다.',
            // 중복
            ES041: '[$1]는 [$2]와 중복이 발생했습니다.',
            ES042: '[$1]에 [$2]가 존재하여 [$3]를 재거 할 수 없습니다.',
            ES043: '[$1]에 [$1]가 존재하여 [$3]를 추가 할 수 없습니다.',
            ES044: '[$1]는 예약어 입니다.',
            // 필수
            ES051: '필수값 [$1]이 없습니다.',
            ES052: '[$1]에는 [$2]이 필요합니다.',
            ES053: '[$1]에 [$2]이 존재하지 않습니다.',
            ES054: '[$1]에 공백을 입력할 수 없습니다.',
            // 범위
            ES061: '[$1]의 [$2] 범위를 초과하였습니다.',
            ES062: '[$1]는 [$2]보다 작을 수가 없습니다.',
            ES063: '[$1]와 [$2]의 길이가 다릅니다.',
            ES064: 'and(&&) 조건 검사에 실패하였습니다. $1',
            ES065: 'or(||) 조건 검사에 실패하였습니다. $1',
            ES066: '[$1]의 범위는 [$2]에서 [$3]까지 입니다. ',
            // Common.*
            // util-type : match
            EL01100: 'util-type.js match',
            EL01101: '타입 매치 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
            EL01102: '타입 매치 : target 은 \'$1\' 타입이 아닙니다. tarType: $2',
            EL01103: '타입 매치 : 처리할 수 없는 타입니다. ',
            // match array
            EL01110: '',
            EL01111: '배열 매치 : target 은 array 타입이 아닙니다. tarType: $1',
            EL01112: '배열 매치 : array(_ANY_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
            EL01113: '배열 매치 : array(_SEQ_) 타입의 길이보다 target array 의 길이가 작습니다. extType.length = $1, target.length = $2',
            EL01114: '배열 매치 : array(_SEQ_) [$1]번째 리터럴 타입이 target 값과 다릅니다. extType[$1] = $2, target[$1] = $3',
            EL01115: '배열 매치 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다. extType[$1] = $2',
            EL01116: '배열 매치 : array(_REQ_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
            EL01117: '배열 매치 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
            EL01118: '배열 매치 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
            // match choice
            EL01120: '',
            EL01121: '초이스 매치 : choice(_ANY_) 타입에 \'undefined\' 은 사용할 수 없습니다.',
            EL01122: '초이스 매치 : choice(_NON_) 타입에 \'undefined\' 만 가능합니다.',
            EL01123: '초이스 매치 : choice(_ERR_) 타입에 Errror 인스턴스 만 가능합니다.',
            EL01124: '초이스 매치 : choice(_EUM_) 타입의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
            EL01125: '초이스 매치 : choice(_DEF_) 타입의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
            EL01126: '초이스 매치 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
            EL01127: '초이스 매치 : choice 세부 타입 검사가 실패하였습니다. extType: $1, tarType: $2',
            // match class
            EL01130: '',
            EL01131: '클래스 매치 : class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
            EL01132: '클래스 매치 : target은 [$1]의 인스턴스가 아닙니다.',
            EL01133: '클래스 매치 : target 이 class, object, union 타입이 아닙니다. tarType: $1',
            // match union
            EL01140: '',
            EL01141: '유니언 매치 : target 은 union 타입이 아닙니다. tarType: $1',
            EL01142: '유니언 매치 : target[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
            EL01143: '유니언 매치 : \'$1\' 타입 검사가 실패하였습니다.',
            // match function
            EL01150: '',
            EL01151: '함수 매치 : target 은 function 타입이 아닙니다. tarType: $1',
            EL01152: '함수 매치 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
            EL01153: '함수 매치 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
            EL01154: '함수 매치 : extType.func 과 target.func 서로 다릅니다.(proto check)',
            EL01155: '함수 매치 : target의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
            EL01156: '함수 매치 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
            EL01157: '함수 매치 : return 허용검사가 거부되었습니다.',
            // allow
            EL01200: '',
            EL01201: '타입 허용 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
            EL01202: '타입 허용 : $1 타입의 리터럴 값과 다릅니다. extType = $2, tarType = $3',
            EL01203: '타입 허용 : $1 타입이 아닙니다. tarType = $2',
            EL01204: '타입 허용 : 처리할 수 없는 타입입니다.',
            // allow array
            EL01210: '',
            EL01211: '배열 허용 : array 타입이 아닙니다. tarType: $1',
            EL01212: '타입 허용 : array(_ANY_) 타입에 array(_ALL_, _OPT_) 타입을 허용하지 않습니다. tarType: $1',
            EL01213: '배열 허용 : array(_SEQ_) 타입에 array(_SEQ_) 타입만 허용합니다. tarType: $1',
            EL01214: '배열 허용 :extType 의 array(_SEQ_) 타입의 길이보다 tarType 은 같거나 커야합니다. extType.length = $1, target.length = $2',
            EL01215: '배열 허용 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다.',
            EL01216: '배열 허용 : array(_REQ_) 타입에 array(_ALL_, _ANY_, _OPT_) 타입을 허용하지 않습니다. tarType: $2',
            EL01217: '배열 허용 : array(_OPT_) 타입에 array(_ALL_, _ANY_) 타입을 허용하지 않습니다. tarType: $2',
            EL01218: '배열 허용 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
            EL01219: '배열 허용 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
            // allow choice 
            EL01220: '',
            EL01221: '초이스 허용 : choice(_ALL_) 타입에 choice(_ERR_) 타입을 허용하지 않습니다. tarType: $1',
            EL01222: '초이스 허용 : choice(_ANY_) 타입에 \'undefined\' 타입은 사용할 수 없습니다.',
            EL01223: '초이스 허용 : choice(_ANY_) 타입에 choice(_NON_, _ERR_), \'undefined\' 타입을 허용하지 않습니다. tarType: $1',
            EL01224: '초이스 허용 : choice(_NON_) 타입에 choice(_NON_) 타입만 허용합니다. tarType: $1',
            EL01225: '초이스 허용 : choice(_ERR_) 타입에 choice(_ERR_) 타입만 가능합니다. tarType: $1',
            EL01226: '초이스 허용 : choice(_REQ_) 타입에 choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
            EL01227: '초이스 허용 : choice(_OPT_) 타입에 choice(_ALL_, _ANY_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
            EL01228: '초이스 허용 : choice(_EUM_) 타입에 choice(_EUM_) 타입만 가능합니다.',
            EL01229: '초이스 허용 : choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
            EL0122A: '초이스 허용 : tarType choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. tarType[$1]: $2',
            EL0122B: '초이스 허용 : choice(_DEF_) 타입에 choice(_DEF_) 타입만 가능합니다.',
            EL0122C: '초이스 허용 : extType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
            EL0122D: '초이스 허용 : tarType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. tarType[0]: $1',
            EL0122E: '초이스 허용 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
            EL0122F: '초이스 허용 : tarType[$1] = $3 타입에 허용하는 extType 이 없습니다. extType = $2',
            // allow class
            EL01230: '',
            EL01231: '클래스 허용 : extType, tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
            EL01232: '클래스 허용 : class to class 허용이 거부 되었습니다. (opt = $1)',
            EL01233: '클래스 허용 : tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
            EL01234: '클래스 허용 : class to union 허용이 거부 되었습니다. (opt = $1)',
            EL01235: '클래스 허용 : tarType 이 class, union 타입이 아닙니다. tarType: $1',
            // allow union
            EL01240: '',
            EL01241: '유니언 허용 : tarType 은 union 타입이 아닙니다. tarType: $1',
            EL01242: '유니언 허용 : tarType[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
            EL01243: '유니언 허용 : \'$1\' 타입 검사가 실패하였습니다.',
            // allow function
            EL01250: '',
            EL01251: '함수 허용 : tarType 은 function 타입이 아닙니다. tarType: $1',
            EL01252: '함수 허용 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
            EL01253: '함수 허용 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
            EL01254: '함수 허용 : extType.func 과 target.func 서로 다릅니다.(proto check)',
            EL01255: '함수 허용 : tarType의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
            EL01256: '함수 허용 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
            EL01257: '함수 허용 : return 허용검사가 거부되었습니다.',
            // etc
            // util-type.js
            EL01300: '',
            EL01301: '파싱 검사 : function 규칙이 아닙니다. "$1"',
            EL01302: '파싱 검사 : function 에 argument, body 내용이 없습니다. "$1"',
            EL01303: '파싱 검사 : function 파싱 실패 $1',
            EL01304: '타입 검사 : [$1]는 처리할 수 스페셜타입 입니다.',
            EL01305: '타입 검사 : array($1) 타입은 처리할 수 없는 스페설타입 입니다.',
            EL01306: '타입 검사 : choice($1) 타입은 처리할 수 없는 스페셜타입 입니다.',
            EL01307: '타입 검사 : array($1) 타입은 처리할 수 없는 타입 입니다.',
            EL01308: '타입 검사 : choice($1) 타입은 처리할 수 없는 타입 입니다.',
            // EL01309: '',
            EL0130A: '타입 허용 : allowType(extType, tarType) 검사가 실패하였습니다.',
            EL0130B: '타입 매치 : matchType(extType, target) 검사가 실패하였습니다.',
            EL0130C: 'ctor 이 function 타입이 아닙니다. typeof ctor = $1',
            // util.js
            EL01400: '',
            EL01401: 'implements(ctor, obj, args..); ctor 이 <function> 타입이 아닙니다. typeof ctor == \'$1\'',
            EL01402: 'implements(ctor, obj, args..); obj 이 <object> 타입이 아닙니다. typeof obj == \'$1\'',
            EL01403: 'implements(ctor, obj, args..); args[$1] 이 <function> 타입이 아닙니다. typeof args[$1] == \'$2\'',
            EL01404: '[$1] 는 [$2] 타입을 구현해야 합니다. $1._KIND = \'$3\'',
            EL01405: 'isImplementOf(target); target 은 <function, string> 타입만 가능합니다. typeof target = \'$1\'',
            // etc
            EL01500: '',
            // observer.js
            EL01510: '',
            EL01511: 'new Observer(caller); caller 는 \'object\' 타입이 아닙니다. typeof caller = $1',
            EL01512: 'Observer.isLog 는 \'boolean\' 타입이 아닙니다. typeof isLog = $1',
            EL01513: 'Observer.isSingleMode 는 \'boolean\' 타입이 아닙니다. typeof isSingleMode = $1',
            EL01514: 'Observer.__$subscribers 값은  \'object\' 타입이 아닙니다. typeof __$subscribers = $1',
            EL01515: 'Observer.__$subscribers[\'any\'] 객체가 없습니다. { any: undefined }',
            EL01516: 'subscribe(fn, code); fn 는 \'function\' 타입이 아닙니다. typeof fn = $1',
            
            // Interface.*
            // EL02
            EL02100: '',
            // i-object.js
            EL02110: '',
            EL02111: 'getTypes(): array<function> 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02112: 'instanceOf(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02113: 'equal(any): boolena 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-marshal.js
            EL02120: '',
            EL02121: 'getObject(opt?, origin?): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02122: 'setObject(mObj) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-element.js
            EL02130: '',
            EL02131: 'clone(): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-list.js
            EL02140: '',
            // i-control-list.js
            EL02150: '',
            EL02151: 'add(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02152: 'del(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02153: 'has(key): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02154: 'find(any): any 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-collection.js
            EL02160: '',
            EL02161: 'add(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02162: 'remove(elem): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02163: 'cantains(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02164: 'indexOf(any): number 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-collection-array.js
            EL02170: '',
            EL02171: 'insertAt(pos, val, ..): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-collection-property.js
            EL02180: '',
            EL02181: 'keyOf(idx): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // i-serialize.js
            EL02190: '',
            EL02191: 'output(opt, ...): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            EL02192: 'load(any, ...) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
            // Meta.Entity.*
            EL02300: '',
            // Meta.*
            EL03100: '',
            // meta-object.js
            EL03110: '',
            EL03111: 'abstract, interface, enum 타입은 생성할 수 없습니다. $1[\'_KIND\'] = \'$2\'',
            EL03112: 'setObject(oGuid, origin); oGuid 는 \'object\' 타입입니다. typeof oGuid = \'$1\'',
            EL03113: 'setObject(oGuid, origin); 네임스페이스가 서로 다릅니다. this._type = $1, oGuid._type = $2',
            EL03114: 'setObject(oGuid, origin); origin 은 Guid 객체가 아닙니다. origin._type = \'$1\', origin._guid = \'$2\'',
            // meta-element.js
            EL03120: '',
            EL03121: '$name; val 은 \'string\' 타입입니다. typeof val = \'$1\'',
            EL03122: '$name; val.length 은 0 보다 커야 합니다.',
            // meta-registry.js
            EL03200: '',
            // object
            EL03211: 'register(meta); 등록할 meta 가 Guid 객체가 아닙니다. meta._type = \'$1\', meta._guid = \'$2\'',
            EL03212: 'register(meta); 등록할 meta._guid 가 이미 등록되어 있습니다. meta._guid = \'$1\'',
            EL03213: 'release(meta); 해제할 meta 는 string(guid) | object(Guid) 타입만 가능합니다. typeof meta = \'$1\'',
            // create
            EL03220: '',
            EL03221: 'createMetaObject(oGuid, origin); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
            EL03222: 'createMetaObject(oGuid, origin); oGuid._type 은 \'string\' 타입만 가능합니다.(length > 0) typeof oGuid._type = \'$1\'',
            EL03223: 'createMetaObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\'',
            EL03224: 'createMetaObject(oGuid, origin); [$1] 네임스페이스가 \'function\' 타입이 아닙니다. typeof coClass = \'$2\'',
            EL03225: 'createReferObject(meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\'',
            EL03226: 'createReferObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\'',
            EL03227: 'createNsReferObject(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\'',
            // ns Class
            EL03230: '',
            EL03231: 'registerClass(fun, ns, key); fun 이 \'function\' 타입이 아닙니다. typeof fun = \'$1\'',
            EL03232: 'registerClass(fun, ns, key); ns 가 \'string\' 타입이 아닙니다. typeof ns = \'$1\'',
            EL03233: 'registerClass(fun, ns, key); key 가 \'string\' 타입이 아닙니다. typeof key = \'$1\'',
            EL03234: 'releaseClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\'',
            EL03235: 'findClass(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\'',
            EL03236: 'getClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\'',
            // set, transform, load
            EL03240: '',
            EL03241: 'setMetaObject(oGuid, meta); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
            EL03242: 'setMetaObject(oGuid, meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\'',
            EL03243: 'setMetaObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\'',
            EL03244: 'transformRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
            EL03245: 'transformRefer(oGuid); $1[\'$2\'][\'$ns\'] 는 \'function\' 타입이 아닙니다.',
            EL03246: 'loadMetaObject(str, parse?); str 은 \'string\' 타입만 가능합니다. typeof str = \'$1\'',
            EL03247: 'loadMetaObject(str, parse?); str 을 파싱한 객체가 Guid 객체가 아닙니다. obj._type = \'$1\', obj._guid = \'$2\'',
            // has, valid, find
            EL03250: '',
            EL03251: 'validObject(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
            EL03252: 'hasGuidObject(oGuid, origin); guid 는 \'string\' 타입만 가능합니다.(length > 0) typeof guid = \'$1\'',
            EL03253: 'hasGuidObject(oGuid, origin); origin[$1]는 \'object\' 타입이 아닙니다. typeof origin[$1] = \'$2\'',
            EL03254: 'hasRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\'',
            EL03255: 'hasRefer(oGuid); oGuid 가 Guid 객체가 아닙니다. oGuid._type = \'$1\', oGuid._guid = \'$2\'',
            EL03256: 'findSetObject(oGuid, origin); [ oGuid._guid | oGuid ]는 \'string\' 타입만 가능합니다.(length > 0) guid = \'$1\'',
            EL03257: 'findSetObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\'',
            // namespace-manager.js
            EL03300: '',
            // private function, proterty
            EL03310: '',
            EL03311: 'NamespaceManager.isOverlap 은  \'boolean\' 타입만 가능합니다. typeof isOverlap = $1',
            EL03312: '_getArray(ns); ns 는 유효한 네임스페이스 이름 규칙이 아닙니다. ns = $1',
            EL03313: '_getArray(ns); ns 타입은 \'string\', \'array<string>\' 타입만 가능합니다. typeof ns = $1',
            EL03314: '_getArray(ns); ns[$1] 는 \'string\' 타입이 아닙니다. typeof ns[$1] = $2',
            EL03315: '_getArray(ns); ns[$1] 는 유효한 이름 규칙이 아닙니다. ns[$1] = $1',
            // addNamespace, delNamespace, path
            EL03320: '',
            EL03321: 'addNamespace(ns); 네임스페이스 추가가 실패하였습니다.',
            EL03322: 'delNamespace(ns); 네임스페이스 삭제가 실패하였습니다.',
            EL03323: 'path(ns); 네임스페이스 경로 얻기에 실패하였습니다.',
            // add, del 
            EL03330: '',
            EL03331: 'add(fullName, elem); [$1] 는 유효한 이름 규칙이 아닙니다.',
            EL03332: 'add(fullName, elem); elem 이 이미 등록되었습니다. 중복허용 [this.isOverlap = \'true\']',
            EL03333: 'add(fullName, elem); 네임스페이스에 요소 등록이 실패하였습니다.',
            EL03334: 'del(fullName); 네임스페이스에 요소 삭제가 실패하였습니다.',
            // getPath, output, load
            EL03340: '',
            EL03341: 'getPath(elem); elem 값이 없습니다. typeof elem = $1',
            EL03342: 'output(stringify, space); 네임스페이스 내보내기가 실패하였습니다. $1',
            EL03343: 'load(str, parse); str 는 \'string\' 타입이 아닙니다. typeof str = $1',
            EL03344: 'load(str, parse); 네임스페이스 로딩이 실패하였습니다. $1',
            // Collection.*
            EL04100: '',
            // base-collection.js
            EL04110: '',
            EL04111: '_remove(idx): boolean 는 추상메소드 입니다. 구현해야 합니다.',
            EL04112: 'setObject(oGuid, origin); oGuid 의 _owner 연결이 실패하였습니다. guid = $1',
            EL04113: 'removeAt(idx); idx 는 \'number\' 타입이 아닙니다. typeof idx = $1',
            EL04114: 'add(any): number 는 추상메소드 입니다. 구현해야 합니다.',
            EL04115: 'clear() 는 추상메소드 입니다. 구현해야 합니다.',
            //
            EL04200: '',
            // collection-array.js
            EL04210: '',
            EL04211: 'setObject(oGuid, origin); oGuid[\'_elem\'][$1] 의 _elements 연결이 실패하였습니다. guid = $2',
            EL04212: 'insertAt(pos, value, desc); pos 는 \'number\' 타입이 아닙니다. typeof pos = $1',
            EL04213: 'insertAt(pos, value, desc); pos 는 this.count 보다 클 수 없습니다. pos = $1, count = $2',
            EL04214: 'insertAt(pos, value, desc);  pos 는 0 보다 작을 수 없습니다. pos = $1',
            EL04215: 'insertAt(pos, value, desc); 등록이 실패하였습니다. pos = $1, value = $2',
            // collection-property.js
            EL04220: '',
            EL04221: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_key\'].length = $2 길이가 서로 다릅니다.',
            EL04222: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_desc\'].length = $2 길이가 서로 다릅니다.',
            EL04223: 'setObject(oGuid, origin); oGuid._elem[$1] guid 를 찾을 수 없습니다. guid = $2' ,
            EL04224: 'indexOf(obj, isKey); key로 인덱스값을 찾을 경우 obj 는 \'string\' 타입이어야 합니다. typeof obj = $1',
            EL04225: 'add(name, value, desc); name 이 \'string\' 타입이 아닙니다. typeof name = $1',
            EL04226: 'add(name, value, desc); name = \'$1\' 이 이름규칙에 맞지 않습니다. 규칙 = \'$2\'',
            EL04227: 'add(name, value, desc); name = \'$1\' 이 예약어 입니다.',
            EL04228: 'add(name, value, desc); name = \'$1\' 이 기존 이름과 중복이 발생했습니다.',
            EL04229: 'add(name, value, desc); 추가가 실패하였습니다. name = \'$1\', value = \'$2\'',
            EL0422A: 'keyOf(idx); idx 이 \'number\' 타입이 아닙니다. typeof idx = $1',
            EL0422B: 'exist(key); key 이 \'string\' 타입이 아닙니다.(length > 0) typeof key = $1',
            //
            EL04300: '',
            // collection-transaction.js
            EL04310: '',
            EL04311: '$1.autoChanges 는 \'boolean\' 타입입니다. typeof aucoChanges = \'$2\'',
            // trans-queue.js
            EL04320: '',
            EL04321: 'collection 값이 [MetaObject] 을 상속한 인스턴스가 아닙니다.',
            EL04322: 'collection 이 [ArrayCollection] 의 인스턴스가 아닙니다.',
            EL04323: 'rollback(); \'$1\' 는 처리할 수 없는 cmd 입니다.',
            // Warn
            WS011: '[$1] 대상 [$2]는 삭제 할 수 없습니다.',
        }
    };

    //==============================================================
    // 4. module export
    if (isNode) exports.messageCode = messageCode;    // strip:
    
    // create namespace
    _global._L                      = _global._L || {};
    _global._L.messageCode          = _global._L.messageCode || {};

    _global._L.messageCode.core     = messageCode;

}(typeof window !== 'undefined' ? window : global));