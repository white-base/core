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
            // REVIEW: 전체 변겯
            EL01510: '',
            // EL01511: 'new Observer(caller); caller 는 \'object\' 타입이 아닙니다. typeof caller = $1',
            // EL01512: 'Observer.isLog 는 \'boolean\' 타입이 아닙니다. typeof isLog = $1',
            // EL01513: 'Observer.isSingleMode 는 \'boolean\' 타입이 아닙니다. typeof isSingleMode = $1',
            // EL01514: 'Observer.__$subscribers 값은  \'object\' 타입이 아닙니다. typeof __$subscribers = $1',
            // EL01515: 'Observer.__$subscribers[\'any\'] 객체가 없습니다. { any: undefined }',
            // EL01516: 'subscribe(fn, code); fn 는 \'function\' 타입이 아닙니다. typeof fn = $1',
            EL01501: '$1.$events 는 obejct 타입입니다. typeof $events $2',
            EL01502: '$1.isLog 는 boolean 타입입니다. typeof isLog $2',
            EL01503: 'on(event, listener); event 는 <string> 타입이 아닙니다. typeof event == \'$1\'',
            EL01504: 'on(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
            EL01505: 'once(event, listener); event 는 string 타입이 아닙니다. typeof event == \'$1\'',
            EL01506: 'once(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
            EL01507: 'off(event, listener); event 는 <string> 타입이 아닙니다. typeof event == \'$1\'',
            EL01508: 'off(event, listener); listener 는 <function> 타입이 아닙니다. typeof listener == \'$1\'',
            EL01509: 'emit(event); event 는 <string> 타입이 아닙니다. typeof event == \'$1\'',
            EL01510: '',
            
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
            EL02181: 'indexToKey(idx): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.',
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
            EL0422A: 'indexToKey(idx); idx 이 \'number\' 타입이 아닙니다. typeof idx = $1',
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
/**** message.js | _L.Common.Message ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _messageCode                = require('./message-code').messageCode;    // strip:
    }                                                                               // strip:
    var $messageCode                    = _global._L.messageCode.core;              // modify:

    var messageCode                     = _messageCode  || $messageCode;            // strip:

    //==============================================================
    // 2. module dependency check
    //==============================================================
    // 3. module implementation       
    var Message = (function () {
       /**
        * 메세지와 코드를 관리합니다. (static)
        * @constructs _L.Common.Message
        * @static
        */
       function Message() { 
        }
        Message._NS = 'Common';     // namespace

        // inner function
        function isObject(obj) {
            return obj && typeof obj === 'object' && !Array.isArray(obj);
        }
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        function deepMerge(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    var targetValue = target[key];
                    var sourceValue = source[key];
                    if (isObject(sourceValue)) {
                        if (!isObject(targetValue)) {
                            target[key] = {};
                        }
                        target[key] = deepMerge(target[key], sourceValue);
                    } else {
                        target[key] = sourceValue;
                    }
                }
            }
            return target;
        }

        // var define
        var $storage = {};
        var lang = 'kor';
        // var isLong = false;
        
        /**
         * 메시지 코드 스토리지
         * @member {string} _L.Common.Message#$storage
         */
        Object.defineProperty(Message, "$storage", {
            get: function() { 
                // if (!$storage) {
                //     var objs = [];
                //     for (var key in messageCode) {
                //         if (Object.prototype.hasOwnProperty.call(messageCode, key)) {
                //             objs.push(messageCode[key]);
                //         }
                //     }
                //     $storage = deepMerge.apply(null, {}, objs);
                // }
                return $storage;
            },
            set: function(val) { 
                deepMerge($storage, val);
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * 메세지 언어 
         * @member {string} _L.Common.Message#lang
         */
        Object.defineProperty(Message, "lang", {
            get: function() { return lang; },
            set: function(val) { 
                if (!Message.$storage[val]) throw new Error('The ['+ val +'] language does not exist.');
                lang = val;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * 긴 메세지 여부
         * @member {string} _L.Common.Message#isLong
         */
        // Object.defineProperty(Message, "isLong", {
        //     get: function() { return isLong; },
        //     set: function(val) { 
        //         isLong = val; 
        //     },
        //     configurable: false,
        //     enumerable: false,
        // });

        // local function
        function _getCodeObject(code){
            var MSG = Message.$storage[lang];
            // var div, part, num;

            if (!_isString(code)) return;

            // div = code.substring(0, 1);
            // part = code.substring(1, 4);
            // num = code.substring(4, code.length);
            // if (!MSG[div] || !MSG[div] || !MSG[div][part]) return;
            // return MSG[div][part][num];

            return MSG[code];
        }
        

        function _buildMessage(code, arr) {
            var str = _getCodeObject(code);
            var msg;

            if (!_isString(str)) return 'There are no messages about the code.' ;
            // if (typeof str !== 'string') return 'There are no messages about the code.' 
            
            msg = $build(str);
            // if (isLong) {
            //     long = $build(str);
            //     if (long.length > 0) msg += '\n' + long;
            // }
            return $intro(code) + msg;

            // inner function
            function $build(p_msg) {
                var msg = p_msg;
                var result;
                var max = 0;
                
                // if (!msg) return msg;
                result = msg.match(/\$\d+/g);
                if (!Array.isArray(result)) return msg;
                for (var i = 0; i < result.length; i++) {
                    var num = Number(result[i].replace('$', ''));
                    if (num > max) max = num;
                }
                for (var i = 1; i <= max; i++) {
                    var val = arr[i - 1];
                    msg = msg.replace(new RegExp('\\$'+ i, 'g'), val);
                }
                return msg;
            }
            function $intro(code) {
                var intro = '';
                var firstChar = code.substring(0, 1);
                
                if (firstChar === 'E') intro = 'Error';
                else if (firstChar === 'W') intro = 'Warn';
                return intro + ' ['+ code +'] ';
            }
        }

        /**
         * 메세지 코드에 대한 문자열를 얻습니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         * @returns {string}
         */
        Message.get = function(p_code, p_aValue) {
            return _buildMessage(p_code, p_aValue);
        };

        /**
         * 메세지 코드에 대한 Error 객체를 생성해서 예외룰 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.error = function(p_code, p_aValue) {
            throw new Error(Message.get(p_code, p_aValue));
        };

        /**
         * 메세지 코드에 대한 console.warn 을 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.warn = function(p_code, p_aValue) {
            console.warn(Message.get(p_code, p_aValue));
        };

        return Message;
    }());

    Message.$storage = messageCode;

    //==============================================================
    // 4. module export
    if (isNode) exports.Message     = Message;      // strip:
    
    // create namespace
    _global._L.Common               = _global._L.Common || {};

    _global._L.Message = Message;
    _global._L.Common.Message = Message;

}(typeof window !== 'undefined' ? window : global));
/**** extend-error.js | _L.Common.ExtendError ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                           // strip:
        var _Message                    = require('./message').Message;     // strip:
    }                                                                       // strip:
    var $Message                    = _global._L.Message;   // modify:

    var Message                 = _Message              || $Message;        // strip:

    //==============================================================Á
    // 2. module dependency check
    //==============================================================
    // 3. module implementation   
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    
    var ExtendError = (function () {
        /**
         * @overload
         * @param {string} p_msg 사용자 메세지 내용
         * @param {ExtendError | object} p_prop  상위 Error 객체
         * @returns {Error}
         */

        /**
         * @overload
         * @param {Regexp} p_msg 메세지 코드
         * @param {ExtendError | object} p_prop  메세지 코드 전달 파라메터
         * @param {array<string>} p_codeVal  메세지 코드 전달 파라메터
         * @returns {Error}
         */

        /**
         * 확장오류를 생성합니다.  
         * (ES5 하위 호환성 지원을 위해서 자체 상속방식으로 처리함)
         * @constructs _L.Common.ExtendError
         * @param {string | Regexp} p_msg  메세지코드 또는 메세지
         * @param {ExtendError | object} p_prop  이전 ExtendError 객체 또는 속성타입 오류메세지
         * @param {array<string>} p_codeVal  메세지코드값의 $1, $2 변환 값
         * @example
         * new ExtendError({code:'', ctx: []})
         * new ExtendError(/E0011/, [''])
         */
        function ExtendError(p_msg, p_prop, p_codeVal) {
            var _build = '';
            var _prop;
            var _queue = [];    
            var _msg;

            if (p_prop instanceof ExtendError) {
                _queue = p_prop.queue;
                _prop = p_prop.prop;
            } else if (p_prop instanceof Error) {
                _queue.push(p_prop.message);
            } else if (typeof p_prop  === 'object' && p_prop !== null) {
                _prop = p_prop;
            }
            
            if (typeof p_msg === 'string') {
                _msg = p_msg;
            } else if (p_msg instanceof RegExp) {
                _msg = Message.get(p_msg.source, p_codeVal);
            } else _msg = '';
            
            _build = _msg + '\n';
            
            if (_prop) _build += $buildMessageProp(_prop);
            if (_queue.length > 0) _build += $buildMsgQueue(_queue);

            // var _instance = _super.call(this, _build);
            var _instance = new Error(_build);
            
            /**
             * 이전에 발생한 message 큐
             * @member {array<string>} _L.Common.ExtendError#queue
             */
            // if (_queue) _instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
            // else _instance.queue = [];
            _instance.queue = _queue;

            /**
             * 속성타입 오류 메세지
             * @member {object} _L.Common.ExtendError#prop
             */
            if (_prop) _instance.prop = _prop;
            else _instance.prop = {};

            _instance.queue.push(_msg);


            if (Error.captureStackTrace && !OLD_ENV) {
                Error.captureStackTrace(_instance, ExtendError);
            }

            Object.setPrototypeOf(_instance, Object.getPrototypeOf(this));
        
            return _instance;

            // inner function 
            function $buildMessageProp(obj) {
                var msg = '';
                for (var prop in obj) {
                    if (typeof obj[prop] === 'string') msg += prop + ' : '+ obj[prop] + '\n';
                    else continue;
                }
                return msg;
            }
            function $buildMsgQueue(queue) {
                var msg = '';
                var queue_cnt = queue.length;
                for (var i = queue_cnt; i > 0; i--) {
                    var mark = '';
                    for (var ii = i; ii <= queue_cnt; ii++) { mark += '#'; }
                    msg += '' + mark + ' '+ queue[i - 1] + '\n';
                }
                return msg;
            }
        }

        ExtendError._NS = 'Common';    // namespace
        
        ExtendError.prototype = Object.create(Error.prototype, {
            constructor: {
                value: Error,
                enumerable: false,
                writable: true,
                configurable: true,
            },
        });
        
        ExtendError.prototype.toString = function() {
            return 'ExtendError : ' + this.message;
        };
          
        // REVIEW: 이부분이 제거 해도 문제 없는게 맞느지 검토해야함
        // if (Object.setPrototypeOf) {
        //     Object.setPrototypeOf(ExtendError, Error);
        // } else {
        //     ExtendError.__proto__ = Error;
        // }
        // Util.inherits(ExtendError, _super);

        
        return ExtendError;

    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.ExtendError = ExtendError;      // strip:
    
    // create namespace
    _global._L.Common               = _global._L.Common || {};
    
    _global._L.ExtendError = ExtendError;
    _global._L.Common.ExtendError = ExtendError;

}(typeof window !== 'undefined' ? window : global));
/**** util-type.js _L.Common.Type.- ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    
    //==============================================================
    // 3. module implementation 
    
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    var Type = {};  // namespace
    
    /**
     * object 와 new 생성한 사용자 함수를 제외한 객쳐 여부
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isPrimitiveObj(obj) { // REVIEW: 정리 필요, 의미적으로 명료하게..
        if(typeof obj === 'object' && obj !== null 
            && (obj instanceof RegExp || obj instanceof Date )) {
            return true;
        }
        return false;
    }

    /**
     * 최상위 object 이거나 사용자 함수에서 생성한 객체 여부
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isObject(obj)  {  // REVIEW: 정리 필요, 의미적으로 명료하게
        if(typeof obj === 'object' && obj !== null && !_isPrimitiveObj(obj)) {
            return true;
        }
        return false;
    }
    
    /**
     * 공백객체 인지 확인
     * @param {*} obj 검사대상
     * @returns {boolean}
     */
    function _isEmptyObj(obj)  {
        if(_isObject(obj) && Object.keys(obj).length === 0 && getAllProperties(obj).length === 0) return true;
        return false;
    }

    /**
     * 공백이 아닌 객체 (prototype 및 속성 있는것)
     * @param {*} obj 대상 
     * @returns {boolean}
     */
    function _isFillObj(obj)  {
        if(_isObject(obj) && getAllProperties(obj).length > 0) return true;
        return false;
    }

    /**
     * 내장함수 유무
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isBuiltFunction(obj) {
        if (typeof obj === 'function' && (false 
            || obj === Number || obj === String || obj === Boolean
            || obj === Object || obj === Array || obj === Function
            || obj === RegExp || obj === Date 
            || obj === Symbol || obj === BigInt
        )) return true;
        return false;
    }

    /**
     * 첫문자 대문자 여부
     * @param {string} strValue 
     * @returns {boolean}
     */
    function _isUpper(strValue) {
        var firstStr = strValue.charAt(0);
        if (firstStr === '') return false;
        if(firstStr === firstStr.toUpperCase()) return true;
        else false;
    }

    /**
     * 리터럴 여부  
     * number, string, boolean, bigint, RexExp instance
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isLiteral(obj) {
        if (typeof obj  === 'number') return true;
        if (typeof obj  === 'string') return true;
        if (typeof obj  === 'boolean') return true;
        if (typeof obj  === 'bigint') return true;
        if (obj instanceof RegExp) return true;
    }

    /**
     * 리터럴값 비교  
     * number, string, boolean, bigint, RexExp instance
     * @param {*} obj1 
     * @param {*} obj2 
     * @returns {boolean}
     */
    function _equalLiternal(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (obj1 instanceof RegExp && obj2 instanceof RegExp && obj1.source === obj2.source) return true;
        return false;
    }

    /**
     * function 생성하는 생성자
     * @param {*} type 
     * @returns {object}
     */
    var _creator = function(type) {
        return new type;
    }

    /**
     * 타임명 얻기
     * @param {*} obj 
     * @returns {string}
     */
    function _typeName(obj) {
        return obj['name'];
    }

    /**
     * kind 코드, 대문자로 얻기 '_any_'...
     * @param {*} val 
     * @returns {string}
     */
    function _getKeyCode(val) {
        var reg = /^_[a-zA-Z]+_/;
        var result;

        if (typeof val !== 'string') return;
        result = reg.exec(val);
        if (result !== null) return result[0].toUpperCase();
    }

    /**
     * 함수 규칙   
     * - (params 내부에는 '()' 입력 금지)  
     * - 참조형 타입 금지 : new Function() 시점에 자동 해석됨  
     * @param {*} funBody 
     * @returns {object}
     */
    function _parseFunc(funBody) {
        var syntax1 = /\([,_\[\]{:}\w\s]*\)\s*(?:=>)?\s*{\s*.*\s*.*\s*}/;    // 제한 규칙
        var syntax2 = /(\(.*\)|\w+)\s*(?:=>).*/;
        var regFunc1 = /(?:function\s)?\(([\[\]{:}\s\w,]*)\)\s*(?:=>)?\s*{(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}/;
        var regFunc2 = /\(?([\[\]{:}\s\w,]*)\)?\s*(?:=>)\s*{?(?:\s*return\s+|\s*)?([\[\]\s\w,]*);?\s*}?/;
        
        var arrFunc, arrParam;
        var result = { params: [], return: undefined };
        var arrParam = [];
        var arrRetrun;
        
        funBody = $skipComment(funBody);

        try {
            if (syntax1.test(funBody)) arrFunc = regFunc1.exec(funBody);
            else if (syntax2.test(funBody)) arrFunc = regFunc2.exec(funBody);
            else throw new ExtendError(/EL01301/, null, [funBody]);
            
            if (arrFunc === null) throw new ExtendError(/EL01302/, null, [funBody]);

            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result['params'] = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result['return'] = arrRetrun;

        } catch (error) {
            throw new ExtendError(/EL01303/, error, ['']);
        }

        return result;

        // inner function
        function $skipComment(body) {    // 주석 제거 comment
            var rBody = body;
            var bloackComment = /\/\*[^](.*?)\*\//g
            var lineComment = /\/\/[^](.*?)(\n|$)/g

            rBody = rBody.replace(bloackComment, '');
            rBody = rBody.replace(lineComment, '');
            return rBody;
        }
    }

    /**
     * 타입 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasType(name) {
        var arr = [];
        
        if (typeof name !== 'string') return false;

        arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
        arr = arr.concat(['array', 'function', 'object']);
        arr = arr.concat(['choice', 'union', 'class']);
        arr = arr.concat(['symbol', 'bigint', 'regexp']);
        arr = arr.concat(['etc']);  // 예외 오류 코드 검출 

        return arr.indexOf(name) > -1;
    }

    /**
     * 타입 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _isLeafType(name) {
        var arr = [];
        
        arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
        arr = arr.concat(['symbol', 'bigint', 'regexp', 'object']);

        return arr.indexOf(name) > -1;
    }

    /**
     * choice type kind 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasKindChoice(name) {
        var arr = [];
        
        if (typeof name !== 'string') return false;
        
        arr = arr.concat(['_ALL_', '_ANY_', '_NON_', '_ERR_']);
        arr = arr.concat(['_REQ_', '_OPT_', '_DEF_', '_EUM_']);
        arr = arr.concat(['_ETC_']);  // 예외 오류 코드 검출 

        return arr.indexOf(name) > -1;
    }

    /**
     * choice type kind 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasKindArray(name) {
        var arr = [];
        
        if (typeof name !== 'string') return false;

        arr = arr.concat(['_ALL_', '_ANY_']);
        arr = arr.concat(['_REQ_', '_OPT_', '_SEQ_']);
        arr = arr.concat(['_ETC_']);  // 예외 오류 코드 검출 

        return arr.indexOf(name) > -1;
    }
    
    /**
     * 전체 프로퍼티를 조회합니다.
     * @memberof _L.Common.Type
     * @param {object} obj  Object를 제외한 프로퍼티 객체 리턴
     * @param {boolean?} hasObj Object를 포함 여부
     * @returns {array<string>}  
     */
    function getAllProperties(obj, hasObj) {
        var allProps = [], cur = obj;
        var is = hasObj || false;
        do {
            var props = Object.getOwnPropertyNames(cur);
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop))) allProps.push(prop);
            }
        } while (cur = Object.getPrototypeOf(cur))
        return allProps;
    };
    Type.getAllProperties = getAllProperties;

    /**
     * 객체를 비교합니다. (proto 제외)
     * @memberof _L.Common.Type
     * @param {any} obj1 
     * @param {any} obj2 
     * @returns {boolean}
     */
    function deepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== typeof obj2) return false;
        if ($_isPrimitiveType(obj1) && !(obj1 === obj2)) return false;
        if (typeof obj1 === 'function' && !$equalFunction(obj1, obj2)) return false;

        if (Array.isArray(obj1)) {
            if (obj1.length !== obj2.length) return false;
            for (var i = 0; i < obj1.length; i++) {
                var val1 = obj1[i];
                var val2 = obj2[i];
                if (!deepEqual(val1, val2)) return false;
            }
        } else {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
            for (var key in obj1) {
                if (Object.prototype.hasOwnProperty.call(obj1, key)) {
                    var val1 = obj1[key];
                    var val2 = obj2[key];
                    if (!deepEqual(val1, val2)) return false;
                }
            }
        }
        return true;
        // inner function
        function $equalFunction(fun1, fun2) {
            // if (typeof fun1 !== 'function') return false;
            // if (typeof fun2 !== 'function') return false;
            if (fun1 === fun2 || fun1.toString() === fun2.toString()) return true;
            return false;
        }
        function $_isPrimitiveType(obj) {
            if (typeof obj === 'string' || typeof obj === 'number' 
                || typeof obj === 'boolean' || typeof obj === 'undefined' || typeof obj === 'bigint') return true;
            return false;
        }
    }
    Type.deepEqual = deepEqual;

    /**
     * 함수 타입을 가져옵니다. (_UNION 포함)  
     * ctor 자신부터 리턴 배열에 push
     * @memberof _L.Common.Type
     * @param {function} ctor 생성자
     * @param {boolean} [hasUnion= true] _UNION 포함 여부
     * @returns {array<function>} 
     */
    function getTypes(ctor, hasUnion) {
        var arr = [];
        var tempArr = [];
        var union;
        var proto;

        hasUnion = hasUnion === false ? false : true;
        
        if (typeof ctor !== 'function') throw new ExtendError(/EL0130C/, null, [typeof ctor]);

        arr.push(ctor);
        proto = $getPrototype(ctor);        
        
        if (proto !== Function.prototype) {
            arr = arr.concat(getTypes(proto, hasUnion));
        }
        if (hasUnion) {
            union = ctor['_UNION'] || [];
            for (var i = 0; i < union.length; i++) {
                arr = arr.concat(getTypes(union[i], hasUnion));
            }
        }

        for (var i = 0; i < arr.length; i++) {
            var idx = tempArr.indexOf(arr[i]);
            if (idx < 0) tempArr.push(arr[i]);
        }
        return tempArr;

        // innner function
        function $getPrototype(ctor) {
            // if (ctor.hasOwnProperty('super')) return ctor.super;
            if (Object.prototype.hasOwnProperty.call(ctor, 'super')) return ctor.super;
            return !OLD_ENV && typeof Object.getPrototypeOf === 'function' ? Object.getPrototypeOf(ctor) : ctor.__proto__;
        }
    }
    Type.getTypes = getTypes;

    /**
     * 함수 타입의 prototype(상속) 타입 여부를 검사합니다.
     * @memberof _L.Common.Type
     * @param {function} ctor 생성자
     * @param {function | string} target 검사 대상
     * @returns {boolean}
     */
    function isProtoChain(ctor, target) {
        var arr;
        if (typeof ctor !== 'function') return false;
        if (!(typeof target === 'function' || typeof target === 'string')) return false;

        arr = getTypes(ctor, false);
        for (var i = 0; i < arr.length; i++) {
            if (typeof target === 'string') {
                if (target === arr[i].name) return true;
            } else {
                if (target === arr[i]) return true;
            }
        }
        return false;
    }
    Type.isProtoChain = isProtoChain;

    /**
     * 함수 타입의 prototype(상속) 또는 _UNION 타입 여부를 검사합니다.
     * @memberof _L.Common.Type
     * @param {function} ctor 생성자
     * @param {function | string} target 검사 대상
     * @returns {boolean}
     */
    function hasType(ctor, target) {
        var arr;
        if (typeof ctor !== 'function') return false;
        if (!(typeof target === 'function' || typeof target === 'string')) return false;

        arr = getTypes(ctor);
        for (var i = 0; i < arr.length; i++) {
            if (typeof target === 'string') {
                if (target === arr[i].name) return true;
            } else {
                if (target === arr[i]) return true;
            }
        }
        return false;
    }
    Type.hasType = hasType;

    /**
     * 확장타입 객체를 얻습니다. (하위 타입 포함)  
     * @memberof _L.Common.Type
     * @param {*} target 
     * @returns {object}
     * @example
     * var obj = {
     *      $ype: '',
     *      default: null,                  // string, number, boolean, regexp
     *      kind: '',                       // array, choice
     *      creator: null, _instance: {},   // class
     *      _prop: {},                      // union
     *      params: [], return: null,       // function
     *      name: name, func: null,
     * }
     */
    function typeObject(target) {
        var obj = {};
        var typeObj = _isObject(target) && target['$type'] ? target : extendType(target);
        var leafType = ['null', 'undefined', 'number', 'string', 'boolean', 'symbol', 'bigi¡nt', 'object', 'regexp'];

        obj['$type'] = typeObj['$type'];
        
        if (typeObj['default'] !== null && typeof typeObj['default'] !== 'undefined') obj['default'] = typeObj['default'];
        if (typeObj['kind'] !== null && typeof typeObj['kind'] !== 'undefined') obj['kind'] = typeObj['kind'];
        if (typeObj['params']) obj['params'] = typeObj['params'];
        if (typeObj['return']) obj['return'] = typeObj['return'];
        if (typeObj['creator']) obj['creator'] = typeObj['creator'];
        if (typeObj['_instance']) obj['_instance'] = typeObj['_instance'];

        if (leafType.indexOf(obj['$type']) > -1) {
            if (typeObj['default']) obj['default'] = typeObj['default'];
            return obj;
        }
        if (obj['$type'] === 'array' ||  obj['$type'] === 'choice') {
            obj['list'] = [];
            for(var i = 0; i < typeObj['list'].length; i++) {
                obj['list'][i] = typeObject(typeObj['list'][i]);
            }
        }
        if (obj['$type'] === 'function') {
            for(var i = 0; i < obj['params'].length; i++) {
                obj['params'][i] = typeObject(typeObj['params'][i]);
            }
            if (typeObj['return']) obj['return'] = typeObject(typeObj['return']);
        }
        if (obj['$type'] === 'class') {
            if (typeof typeObj['ref'] === 'function') {
                obj['creator'] = typeObj['ref'].name; 
                var temp = _creator(typeObj['ref']);
                obj['_instance'] = typeObject(temp);
            }
        }
        if (obj['$type'] === 'union') {
            obj['_prop'] = {};
            var temp = typeObj['ref'] || typeObj['_prop'];
            var list = getAllProperties(temp);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                obj['_prop'][key] = typeObject(temp[key]);
            }
        }
        return obj;
    };
    Type.typeObject = typeObject;

    /**
     * 확장타입명을 얻습니다.
     * @memberof _L.Common.Type
     * @param {*} target 
     * @returns {string}
     */
    function typeOf(target) {
        return extendType(target)['$type'];
    };
    Type.typeOf = typeOf;

    /**
     * 확장타입을 얻는다.
     * @memberof _L.Common.Type
     * @param {any} target 대상타입
     * @returns {object} 
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target) {
        var obj =  { $type: '', ref: undefined };

        obj.toString = function(){
            var temp = '';
            var arr = [];
            if (this['$type'] === 'array' || this['$type'] === 'choice') {
                for (var i = 0; i < this['list'].length; i++) {
                    var _type = extendType(this['list'][i]);
                    if (_type['default'] && _type['default'] !== null) {
                        var def;
                        if (_type['$type'] === 'string') def = '\''+ _type['default'] +'\'';
                        else def = _type['default'];
                        arr.push(_type['$type'] + '('+ def +')');
                    } else arr.push(_type['$type']);
                }
                if (this['kind'] === '_OPT_' || this['kind'] === '_REQ_' || this['kind'] === '_SEQ_' || this['kind'] === '_EUM_' || this['kind'] === '_DEF_') {
                    temp = this['$type'] +'('+ this['kind'] +')['+ arr.join(', ')+ ']';
                } else temp = this['$type'] +'('+ this['kind'] +')';
                
            } else {
                temp = this['$type'];
                if (this['default'] && this['default'] !== null) {
                    if (this['$type'] === 'string') temp += '(\''+ this['default'] +'\')';
                    else temp += '('+this['default']+')';
                }
            }
            return temp;
        }
        // special type
        if (typeof target === 'object'  && target !== null && target['$type']) {
            obj['$type'] = target['$type'];
            if (target['default']) obj['default'] = target['default'];
            if (target['kind']) obj['kind'] = target['kind'];
            if (target['ref']) obj['ref'] = target['ref'];
            if (target['list']) obj['list'] = target['list'];
            if (target['name']) obj['name'] = target['name'];
            if (target['func']) obj['func'] = target['func'];
            if (target['params']) obj['params'] = target['params'];
            if (target['return']) obj['return'] = target['return'];
            if (!_hasType(obj['$type'])) throw new ExtendError(/EL01304/, null, [obj['$type']]);
            if (obj['$type'] === 'array') {
                obj['kind'] = obj['kind'] || '_ALL_';
                if (!_hasKindArray(obj['kind'])) throw new ExtendError(/EL01305/, null, [obj['kind']]);
            }
            if (obj['$type'] === 'choice') {
                if (!_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01306/, null, [obj['kind']]);
            }
            return obj;
        } else {
            obj['ref'] = target;
        }

        // step : operation
        if (target === null) {
            obj['$type'] = 'null';
        } else if (target === Number) {
            obj['$type'] = 'number';
            obj['default'] = null;            
        } else if (target === String) {
            obj['$type'] = 'string';
            obj['default'] = null;
        } else if (target === Boolean) {
            obj['$type'] = 'boolean';
            obj['default'] = null;
        } else if (target === Array) {
            obj['$type'] = 'array';
            obj['kind'] = '_ALL_';
            obj['list'] = [];
        } else if (target === Function) {
            obj['$type'] = 'function';
            obj['params'] = [];
        } else if (target === Object) {
            obj['$type'] = 'object';
        } else if (target === RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = null;
        } else if (target === Symbol) {      // ES6+
            obj['$type'] = 'symbol';
        } else if (target === BigInt) {      // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = null;
        } else if (target instanceof RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = target;
        // step : typeof
        } else if (typeof target === 'undefined') {
            obj['$type'] = 'undefined';
        } else if (typeof target === 'number') {
            obj['$type'] = 'number';
            obj['default'] = target;
        } else if (typeof target === 'string') {
            obj['$type'] = 'string';
            obj['default'] = target;
        } else if (typeof target === 'boolean') {
            obj['$type'] = 'boolean';
            obj['default'] = target;
        } else if (typeof target === 'bigint') { // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = target;
        } else if (typeof target === 'symbol') { // ES6+
            obj['$type'] = 'symbol';
        // step : function
        } else if (typeof target === 'function') {
            var kind = target['_KIND'];
            if (kind) {
                kind = kind.toLowerCase();
                if (kind === 'function') obj['$type'] = 'function';
                else obj['$type'] = 'class';    // class, interface, abstract
            } else obj['$type'] = _isUpper(target.name) ? 'class' : 'function';
                
            if (obj['$type'] === 'function') {
                try {
                    var funcType  = target['_TYPE'] ? target['_TYPE'] : _parseFunc(target.toString());
                    obj['params'] = funcType['params'];
                    obj['return'] = funcType['return'];
                } catch (err) {
                    obj['params'] = [];
                }
            }
        // step : array
        } else if (Array.isArray(target)) {
            if (target.length ===  1 && Array.isArray(target[0])) {
                obj['$type'] = 'choice';
                if (target[0].length === 0) obj['kind'] = '_ANY_';
                else obj['kind'] = _getKeyCode(target[0][0]);
                obj['list'] = obj['kind'] ? target[0].slice(1) : target[0];
            } else {
                obj['$type'] = 'array';
                if (target.length === 0) obj['kind'] = '_ANY_';
                else obj['kind'] = _getKeyCode(target[0]);
                obj['list'] = obj['kind'] ? target.slice(1) : target;
            }
            if (!obj['kind']) obj['kind'] = '_OPT_';
            // kind 검사
            if (obj['$type'] === 'array' && !_hasKindArray(obj['kind'])) throw new ExtendError(/EL01307/, null, [obj['kind']]);
            if (obj['$type'] === 'choice' && !_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01308/, null, [obj['kind']]);

        // step : object
        } else if (_isFillObj(target) || _isEmptyObj(target)) {
            obj['$type'] = 'union';
        
        // REVIEW:  기타 모든 함수는 object 로 처리한다. 더 좋은 방법이 있으면 대체 한다.
        } else {
        // } else if(_isPrimitiveObj(type)) {
            obj['$type'] = 'object';
        }
        // } else throw new ExtendError(/EL01309/, null, []);    // REVIEW: 커버리지 확인시 주석 처리
        return obj;
    }
    Type.extendType = extendType;

    /**
     * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
     * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
     * @param {any} extType 원본 타입
     * @param {any} tarType 대상 타입
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @param {string?} pathName '' 공백시 성공
     * @returns {throw?}
     */
    function _execAllow(extType, tarType, opt, pathName) {
        var eType = extendType(extType);
        var tType = extendType(tarType);
        var prop = {};
        var sExt = eType.toString(), sTar = tType.toString();
        
        pathName = pathName ? pathName : 'extType';
        if (pathName !== 'extType' || !pathName) prop['error path'] = pathName;
        opt = opt || 0;

        // if (_isObject(eType['ref']) && _isObject(tType['ref']) && deepEqual(eType, tType)) return; // REVIEW: 필요없어  보이지만 잠시 남겨둠
        // origin seq, opt 필수 검사
        if (eType['kind']) {
            if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
            && eType['list'].length === 0) {
                throw new ExtendError(/EL01201/, prop, ['extType', sExt]);
            }
        }
        // tarType seq, opt 필수 검사
        if (tType['kind']) {
            if ((tType['kind'] === '_SEQ_' || tType['kind'] === '_OPT_' || tType['kind'] === '_REQ_'  || tType['kind'] === '_EUM_'|| tType['kind'] === '_DEF_') 
            && tType['list'].length === 0) {
                throw new ExtendError(/EL01201/, prop, ['tarType', sTar]);
            }
        }
        //  원본은 초이스가 아니고, tarType choice 의 인 경우
        if (eType['$type'] !== 'choice' && tType['$type'] === 'choice' ) {
            var choType = { $type: 'choice', kind: '_REQ_', list: [extType] };
            _execAllow(choType, tarType, opt, pathName);
            return;
        }
        // check allow type
        if (_isLeafType(eType['$type'])) {
            if(typeof eType['default'] !== 'undefined' && eType['default'] !== null && !_equalLiternal(eType['default'], tType['default'])) {
                throw new ExtendError(/EL01202/, prop, [eType['$type'], eType, tType]);
            }
            if (eType['$type'] !== tType['$type']) throw new ExtendError(/EL01203/, prop, [eType['$type'], tType['$type']]);
        
        } else if (eType['$type'] === 'array')  $arrayAllow();
        else if (eType['$type'] === 'choice') $choiceAllow();
        else if (eType['$type'] === 'class') $classAllow();
        else if (eType['$type'] === 'union') $unionAllow();
        else if (eType['$type'] === 'function') $functionAllow();
        else throw new ExtendError(/EL01204/, prop, []);

        // inner function
        function $arrayAllow() {
            if (tType['$type'] !== 'array' || !Array.isArray(tType['list'])) throw new ExtendError(/EL01211/, prop, [tType['$type']]);
            
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (tType['kind'] === '_ANY_') return;
                if (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_') {
                    throw new ExtendError(/EL01212/, prop, [sTar]);
                }
                return;

            // _SEQ_ (sequence)
            } else if (eType['kind'] === '_SEQ_') {
                if (eType['kind'] !== tType['kind'])  throw new ExtendError(/EL01213/, prop, [tType]);
                if (eType['list'].length > tType['list'].length) {
                    throw new ExtendError(/EL01214/, prop, [eType.list.length, tType.list.length]);
                }

                // element check
                for (var i = 0; i < eType['list'].length; i++) {
                    try {
                        _execAllow(eType['list'][i], tType['list'][i], opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01215/, error, [i]);
                    }
                }
                return;
            
            // _REQ_ (require)
            } else if (eType['kind'] == '_REQ_') {
                if (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' || tType['kind'] === '_OPT_') {
                    throw new ExtendError(/EL01216/, prop, [eType['$type'], sTar]);
                }

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' ) {
                    throw new ExtendError(/EL01217/, prop, [eType['$type'], sTar]);
                }
            
            // _ETC_
            } else {
                throw new ExtendError(/EL01218/, prop, [eType['kind']]);
            }

            // element check
            for (var i = 0; i < tType['list'].length; i++) {
                var success = false;
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    try {
                        if (success) break;
                        if (extendType(tType['list'][i])['$type'] === 'choice' && extendType(eType['list'][ii])['$type'] !== 'choice' ) {
                            var oriChoice = { $type: 'choice', kind: '_OPT_', list: eType['list'] };
                            _execAllow(oriChoice, tType['list'][i], opt, pathName);
                        } else {
                            _execAllow(eType['list'][ii], tType['list'][i], opt, pathName);
                        }
                        success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(/EL01219/, prop, [eType, tType]);
            }
        }

        function $choiceAllow() {
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                if (tType['$type'] === tType['$type'] && tType['kind'] === '_ERR_') {
                    throw new ExtendError(/EL01221/, prop, [eType['$type'], sTar]);
                }
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (tType['$type'] === 'undefined') throw new ExtendError(/EL01222/, prop, ['_ANY_', 'undefined']);
                if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_' || tType['kind'] === '_ERR_' || tType['kind'] === '_NON_')) {
                    throw new ExtendError(/EL01223/, prop, [sTar]);
                }
                return;
            
            // _NON_ 
            } else if  (eType['kind'] === '_NON_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    // 4
                    throw new ExtendError(/EL01224/, prop, [sTar]);
                }
                return;

            // _ERR_ (error)
            } else if (eType['kind'] === '_ERR_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    // 5
                    throw new ExtendError(/EL01225/, prop, [sTar]);
                }
                return;

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' 
                || tType['kind'] === '_OPT_' || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                    // 6
                    throw new ExtendError(/EL01226/, prop, [sTar]);
                }

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (tType['$type'] === 'undefined') return;
                if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' 
                || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                    // 7
                    throw new ExtendError(/EL01227/, prop, [sTar]);
                }
            
                // _EUN_ (enumeration)
            } else if (eType['kind'] === '_EUM_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL01228/, prop, []);
                }
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01229/, prop, [ii, extendType(eType['list'][ii])]);
                }
                for (var ii = 0; ii < tType['list'].length; ii++) {
                    if (!_isLiteral(tType['list'][ii])) throw new ExtendError(/EL0122A/, prop, [ii, extendType(tType['list'][ii])]);
                }

            // _DEF_ (default)
            } else if (eType['kind'] === '_DEF_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL0122B/, prop, []);
                }
                if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL0122C/, prop, [extendType(eType['list'][0])]);
                if (!_isLiteral(tType['list'][0])) throw new ExtendError(/EL0122D/, prop,  [extendType(tType['list'][0])]);

            // _ETC_
            } else {
                throw new ExtendError(/EL0122E/, prop, [eType['kind']]);
            }

            // element check
            var arrTarget = (tType['kind']) ? tType['list'] : [tarType];
            for (var i = 0; i < arrTarget.length; i++) {
                var success = false;
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    try {
                        if (success) continue;
                        _execAllow(eType['list'][ii], arrTarget[i], opt, pathName);
                        success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(/EL0122F/, prop, [i, eType, extendType(arrTarget[i])['$type']]);
            }
        }
        
        function $classAllow() {
            if (tType['$type'] === 'class') {         // # class to class
                if (isProtoChain(tType['ref'], eType['ref'])) return;   // 1.proto check
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new eType['ref']();
                        var tarObj = new tType['ref']();
                        return _execAllow(oriObj, tarObj, opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01231/, error, []);
                    }                    
                }
                throw new ExtendError(/EL01232/, prop, [opt]);

            } else if (tType['$type'] === 'union') {  // # class to union
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new eType['ref']();
                        return _execAllow(oriObj, tType['ref'], opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01233/, error, []);
                    }                    
                }
                throw new ExtendError(/EL01234/, prop, [opt]);

            }
            throw new ExtendError(/EL01235/, prop, [tType]);
        }

        function $unionAllow() {
            var list;

            if (tType['$type'] !== 'union') throw new ExtendError(/EL01241/, prop, [tType]);
            list = getAllProperties(eType['ref']);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if (!(key in tType['ref'])) throw new ExtendError(/EL01242/, prop, [key, typeOf(extType[key])]);      
                try {
                    _execAllow(eType['ref'][key], tType['ref'][key], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01243/, error, [key]);
                }
            }
        }

        function $functionAllow() {
            if (tType['$type'] !== 'function')  throw new ExtendError(/EL01251/, prop, [tType]);
            if (eType['ref'] === Function) return;
            // special type check
            if (eType['name']) {
                if (eType['name'] === tarType.name  
                || eType['name'] === tType['name'] 
                || (tType['func'] && eType['name'] === tType['func'].name)) return;
                throw new ExtendError(/EL01252/, prop, [eType['name'], tType.name]);
            }
            if (eType['func']) {
                if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01253/, prop, []);
                if (isProtoChain(tType['func'], eType['func'])) return;
                throw new ExtendError(/EL01254/, prop, []);
            }

            if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
            if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
                throw new ExtendError(/EL01255/, prop, [extendType(eType.params), typeOf(eType.return)]);
            }
            if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
                try {   // params check
                    _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01256/, error, []);
                }
            }
            if (eType['return']) {            
                try {   // return check
                    _execAllow(eType['return'], tType['return'], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01257/, error, []);
                }
            }
        }
    };

    /**
     * 타입을 검사하여 메세지를 리턴
     * @param {any} extType 검사할 타입 , extType 
     * @param {any} target 검사대상
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @param {string?} pathName '' 공백시 성공
     * @returns {throw?}
     */
    function _execMatch(extType, target, opt, pathName) {
        var eType = extendType(extType);
        var tType = extendType(target);
        var prop = {};
        var sExt = eType.toString(), sTar = tType.toString();
        
        pathName = pathName ? pathName : 'extType';
        if (pathName !== 'extType') prop['error path'] = pathName;    // TODO: 'target' 명칭의 중복 수정필요
        opt = opt || 0;

        // seq, opt 필수 검사
        if (eType['kind']) {
            if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
            && (typeof eType['ref'] === 'undefined' || eType['list'].length === 0)) {
                throw new ExtendError(/EL01101/, prop, ['extType', sExt]);
            }
        }

        // check match type
        if (eType['$type'] === 'null') {
            if (target !== null) throw new ExtendError(/EL01102/, prop, ['null', sTar]);
        
        } else if (eType['$type'] === 'undefined') {
            if (typeof target !== 'undefined') throw new ExtendError(/EL01102/, prop, ['undefined', sTar]);
        
        } else if (eType['$type'] === 'string') {
            if (typeof eType['default'] === 'string' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'string') throw new ExtendError(/EL01102/, prop, ['string', sTar]);
        
        } else if (eType['$type'] === 'number') {
            if (typeof eType['default'] === 'number' && typeof target === 'undefined') target = eType['default']; 
            if (typeof target !== 'number') throw new ExtendError(/EL01102/, prop, ['number', sTar]);
        
        } else if (eType['$type'] === 'boolean') {
            if (typeof eType['default'] === 'boolean' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'boolean') throw new ExtendError(/EL01102/, prop, ['boolean', sTar]);
        
        } else if (eType['$type'] === 'bigint') {    // ES6+
            if (typeof eType['default'] === 'bigint' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'bigint') throw new ExtendError(/EL01102/, prop, ['bigint', sTar]);
        
        } else if(eType['$type'] === 'symbol') {    // ES6+
            if (typeof target !== 'symbol') throw new ExtendError(/EL01102/, prop, ['symbol', sTar]);
        
        } else if (eType['$type'] === 'regexp') {
            if (eType['default'] && eType['default'] !== null && typeof target === 'undefined') target = eType['default'];
            if (!(target instanceof RegExp)) throw new ExtendError(/EL01102/, prop, ['regexp', sTar]);
        
        } else if (eType['$type'] === 'object') {
            if (tType['$type'] !== 'object') throw new ExtendError(/EL01102/, prop, ['object', sTar]);

        } else if (eType['$type'] === 'array') $arrayMatch();
        else if (eType['$type'] === 'choice') $choiceMatch();
        else if (eType['$type'] === 'class') $classMatch();
        else if (eType['$type'] === 'union') $unionMatch();
        else if (eType['$type'] === 'function') $functionMatch();        
        else throw new ExtendError(/EL01103/, prop, []);

        // inner function
        function $arrayMatch() {
            if (!Array.isArray(target)) throw new ExtendError(/EL01111/, prop, [sTar]);
            
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {      
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (target.length === 0) throw new ExtendError(/EL01112/, prop, [target.length]);
                return;

            // _SEQ_ (sequence)
            } else if (eType['kind'] === '_SEQ_') {
                if (eType['list'].length > target.length) throw new ExtendError(/EL01113/, prop, [eType['list'].length, tType['list'].length]);    // REVIEW: 세부정보 표현
                for(var i = 0; i < eType['list'].length; i++) {
                    var _elem   = eType['list'][i];
                    var _tar    = tType['list'][i];
                    if (_isLiteral(_elem)) {
                        if (!_equalLiternal(_elem, _tar)) throw new ExtendError(/EL01114/, prop, [i, _elem, _tar]);
                    } else {
                        try {
                            _execMatch(_elem, _tar, opt, pathName)
                        } catch (error) {
                            throw new ExtendError(/EL01115/, error, [i, typeOf(_elem)]);
                        }
                    }
                }
                return;

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                if (target.length === 0) throw new ExtendError(/EL01116/,  prop, [target.length]);

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
    
            // _ETC_
            } else {
                throw new ExtendError(/EL01117/,  prop, [eType['kind']]);
            }
            

            // element check
            for (var i = 0; i < target.length; i++) {
                var tar = target[i];
                var success = false;
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    try {
                        var elem = eType['list'][ii];
                        if (_isLiteral(elem)) {
                            if (_equalLiternal(elem, tar)) {
                                success = true;
                                break;
                            }
                        } else {
                            _execMatch(elem, tar, opt, pathName);    // REVIEW: pathName + '['+i+']'  이렇게 들어가야 함
                            success = true;
                            break;
                        }
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) {
                    throw new ExtendError(/EL01118/, prop, [eType.toString(), tType.toString()]);
                }
            }
        }

        function $choiceMatch() {
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (typeof target !== 'undefined') return;
                throw new ExtendError(/EL01121/, prop, []);

            // _NON_ (none)
            } else if (eType['kind'] === '_NON_') {
                if (typeof target === 'undefined') return;
                throw new ExtendError(/EL01122/, []);
                
            // _ERR_ (error)
            } else if (eType['kind'] === '_ERR_') {
                if (target instanceof Error) return;
                throw new ExtendError(/EL01123/, []);

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (typeof target === 'undefined') return;

            // _EUN_ (enumeration)
            } else if (eType['kind'] === '_EUM_') {
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01124/, prop, [ii, typeOf(eType['list'][ii])]);
                }

            // _DEF_ (default)
            } else if (eType['kind'] === '_DEF_') {
                if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL01125/, prop, [typeOf(eType['list'][0])]);
                if (typeof target === 'undefined') {
                    target = eType['list'][0];
                    return;
                }
            
            // _IDX_ (index)
            // } else if (eType['kind'] === '_IDX_') {
                /**
                 * POINT:
                 * - 검사
                 *  + target object 검사
                 *  -\+ 파라메터 2개 검사
                 * 
                 * - 인덱스 타입 목록 추출
                 * 
                 * - 초이스로 변환
                 *  + 허용타입들 + 
                 * 
                 * this.command = [['_AND_',  { aa: 1 }, ClassA ]]
                 * [['_IDX_', String]]
                 * [['_KEY_', Number, String, '리터럴']]
                 * 
                 * this.command = [['_AND_', [['_IDX_', String]], [['_KEY_', Number, String, '리터럴']] ]]
                 * 
                 * 마지막에 리턴 및 실패 처리
                 */

                /**
                 * - 검사
                 *  + 타겟의 object 여부 검사
                 *  + 파라메터 1개 이상 검사
                 * - 조건문 처리
                 *  + 둘다 성공해야 성공
                 */
                // POINT: 개발 해야함
                // if (eType['list'].length === 0) throw new ExtendError('TODO: IDX 는 검사 타입이 없습니다. 하나이상 있어야 합니다.', prop, []);
                // if (tType['$type'] !== 'union') throw new ExtendError('TODO: IDX 는 검사 대상이 object(union) 타입만 가능합니다.', prop, ['object', sTar]);

                // for(var i = 0; i < eType['list'].length; i++) {
                //     var _elem   = eType['list'][i];
                    
                //     // var _tar    = tType['list'][i];
                //     try {
                //         _execMatch(_elem, target);
                //     } catch (error) {
                //         throw new ExtendError('TODO: ', error, []);
                //     }
                    
                // }
            
            // _ETC_
            } else {
                throw new ExtendError(/EL01126/,  prop, [eType['kind']]);
            }

            // element check
            for (var ii = 0; ii < eType['list'].length; ii++) {
                try {
                    var elem = eType['list'][ii];
                    if (_isLiteral(elem)) {
                        if (_equalLiternal(elem, target)) return;
                    } else {
                        return _execMatch(elem, target, opt, pathName);
                    }
                } catch (error) {
                    continue;
                }
            }
            throw new ExtendError(/EL01127/, prop,[eType, tType]);
        }

        function $classMatch() {
            if (tType['$type'] === 'class') {         // # class to class
                if (typeof eType['ref'] === 'undefined') return;  // 전역 클래스 타입
                if (isProtoChain(tType['ref'], eType['ref'])) return;
            } else if (typeof target === 'object') {    // # class to typeof 'object'
                if (target instanceof extType) return;     
                if (!_isBuiltFunction(extType) && target !== null && opt === 1) {
                    try {
                        var subPath = pathName === 'extType' ? '<instance>' : pathName + '<instance>';
                        return _execMatch(_creator(extType), target, opt, subPath);
                    } catch (error) {
                        throw new ExtendError(/EL01131/, error);
                    }
                }
                throw new ExtendError(/EL01132/, prop, [_typeName(extType)]);
            }
            throw new ExtendError(/EL01133/, prop, [tType]);                
        }

        function $unionMatch() {
            var list;
            
            if (tType['$type'] !== 'union') throw new ExtendError(/EL01141/, prop, [tType]);
            list = getAllProperties(eType.ref);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = extendType(extType[key]);
                // REVIEW: for 위쪽으로 이동 검토!
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                // REVIEW: 재귀로 구현 체크
                if (typeof listDefType['default'] !== 'undefined' && listDefType['default'] !== null && typeof target[key] === 'undefined')      // default 설정
                target[key] = listDefType['default'];
                // POINT:
                // if (target !== null && !(key in target)) throw new ExtendError(/EL01142/, prop, [key, typeOf(extType[key])]);    
                try {
                    var subPath = pathName +'[\''+ key+'\']';
                    _execMatch(extType[key], target[key], opt, subPath);
                } catch (error) {
                    throw new ExtendError(/EL01143/, error, [key]);
                }
            }
        }

        function $functionMatch() {
            if (tType['$type'] !== 'function') throw new ExtendError(/EL01151/, prop, [tType]);
            if (eType['ref'] === Function) return;
            // special type check
            if (eType['name']) {
                if (eType['name'] === target.name 
                || eType['name'] === tType['name'] 
                || (tType['func'] && eType['name'] === tType['func'].name)) return;
                throw new ExtendError(/EL01152/, prop, [eType['name'], target.name]);
            }
            if (eType['func']) {
                if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01153/, prop, []);
                if (isProtoChain(tType['func'], eType['func'])) return;
                throw new ExtendError(/EL01154/, prop, []);
            }

            if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
            if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
                throw new ExtendError(/EL01155/, prop, [extendType(eType.params), typeOf(eType.return)]);
            }
            // params check
            if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
                try {
                    _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01156/, error, []);
                }
            }
            // return check
            if (eType['return']) {            
                try {
                    _execAllow(eType['return'], tType['return'], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01157/, prop, []);
                }
            }
        }
    };

    /**
     * 확장타입이 대상타입을 허용하는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} tarType 검사 대상 타입
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {throw?} 실패시 예외
     */
    function allowType(extType, tarType, opt) {
        try {
            _execAllow(extType, tarType, opt);
        } catch (error) {
            throw new ExtendError(/EL0130A/, error);
        }
    };    
    Type.allowType = allowType;

    /**
     * 확장타입이 대상과 매치되는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} target 검사 대상
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {throw?} 실패시 예외
     */
    function matchType(extType, target, opt) {
        try {
            _execMatch(extType, target, opt);
        } catch (error) {
            throw new ExtendError(/EL0130B/, error);
        }
    };
    Type.matchType = matchType;

    /**
     * 확장타입이 대상타입을 허용하는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} target 검사 대상 타입
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {boolean} 검사 통과 여부
     */
    function isAllowType(extType, tarType, opt) {
        try {
            _execAllow(extType, tarType, opt);
        } catch (error) {
            return false;
        }
        return true;
    };  
    Type.isAllowType = isAllowType;

    /**
     * 확장타입이 대상과 매치되는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} target 검사 대상
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {boolean} 검사 통과 여부
     */
    function isMatchType(extType, target, opt) {
        try {
            _execMatch(extType, target, opt);
            return true;
        } catch (error) {
            return false;
        }
    };
    Type.isMatchType = isMatchType;

    //==============================================================
    // 4. module export
    if (isNode) exports.Type    = Type;    // strip:
    
    // create namespace
    _global._L.Common           = _global._L.Common || {};
    
    _global._L.Type = Type;
    _global._L.Common.Type = Type;

}(typeof window !== 'undefined' ? window : global));
/**** util.js | _L.Common.Util.- ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Type                       = require('./type').Type;                   // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:
    var $Type                       = _global._L.Type;          // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Type                    = _Type                 || $Type;                   // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    
    //==============================================================
    // 3. module implementation   
    
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    var Util = {};  // namespace


    // local function
    function _isObject(obj) {
        return obj != null && typeof obj === 'object';
    }

    // polyfill
    if (!Array.isArray || OLD_ENV) {
        Array.isArray = function(p_obj) {
          return Object.prototype.toString.call(p_obj) === '[object Array]';
        };
    }
    // REVIEW: 제거해둠, 대부분은 keys 는 기본으로 정의되어 있음
    // if (!Object.keys) {
    //     Object.keys = (function () {
    //         var hasOwnProperty = Object.prototype.hasOwnProperty;
    //         var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    //         var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    //         var dontEnumsLength = dontEnums.length;
    //         return function (obj) {
    //             if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new Error('Object.keys called on non-object');
    //             var result = [];
    //             for (var prop in obj) if (hasOwnProperty.call(obj, prop)) result.push(prop);
    //             if (hasDontEnumBug) {
    //               for (var i=0; i < dontEnumsLength; i++) {
    //                 if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
    //               }
    //             }
    //             return result;
    //         }
    //     })()
    // };
    
    /**
     * 배열의 깊이를 가져옵니다.  
     * REVIEW: 필요성 검토 필요!
     * @memberof _L.Common.Util
     * @param {array} p_elem 
     * @param {number} p_depts 
     * @returns {number} 
     */
    Util.getArrayDepth = function getArrayDepth(p_elem, p_depts) {
        var MAX     = 10;
        var level   = 0;
        
        p_depts = p_depts || 0;
        if (p_elem instanceof Array && MAX > p_depts) {
            level++;
            p_depts++;
            level = level + getArrayDepth(p_elem[0], p_depts);
        }
        return level;
    };
    
    /**
     * guid 값을 생성합니다. (36자)
     * @memberof _L.Common.Util
     * @returns {string} 예> 'b806a5b5-75f7-a1ba-3736-17f56fb5d65a'
     */
    Util.createGuid = function createGuid() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substring(2,10);  
            return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 8) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 객체를 깊은 복사를합니다. (proto제외)
     * @memberof _L.Common.Util
     * @param {object} p_target 대상 객체
     * @returns {object}
     */
    Util.deepCopy = function deepCopy(p_target) {
        var nobj;

        if (!_isObject(p_target)) {
          return p_target;
        }
        if (p_target instanceof RegExp) return p_target;

        // 객체인지 배열인지 판단
        nobj = Array.isArray(p_target) ? [] : {};
       
        if (Array.isArray(p_target)) {
            for (var i = 0; i < p_target.length; i++) {
                nobj[i] = deepCopy(p_target[i]);
            }
        } else {
            for (var key in p_target) {
                if (Object.prototype.hasOwnProperty.call(p_target, key)) {
                    nobj[key] = deepCopy(p_target[key]);
                }
            }
        }
        return nobj;
    }    

    /**
     * superCtor 을 상속합니다.
     * @function
     * @memberof _L.Common.Util
     * @param {function | object} ctor 생성자 또는 생성 객체
     * @param {function | object} superCtor 상속 받을 부모 생성자 또는 객체
     */
    Util.inherits = (function () {
        if (typeof Object.create === 'function' && !OLD_ENV) {
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
                }
            }
        }
    }());

    /**
     * ctor 로 생성한 obj 객체의 args<funtion>의 구현 여부를 검사합니다.
     * 종류(ctor._KIND)가 'inteface'이면 allowType(), 아니면 matchType()로 검사한다.
     * @name implements
     * @function
     * @memberof _L.Common.Util
     * @param {function} p_ctor 검사 대상 생성자
     * @param {object} p_obj 검사 대상 인스턴스 객체
     * @param {function?} args 인터페이스들, ctor._UNION 정적 속성으로 설정 가능
     */
    Util.implements = function(p_ctor, p_obj, args) {
        var _interface = [];
        var addCnt = 0;

        if (typeof p_ctor !== 'function') throw new ExtendError(/EL01401/, null, [typeof p_ctor]);
        if (!_isObject(p_obj)) throw new ExtendError(/EL01402/, null, [typeof p_obj]);

        if (typeof p_obj._interface === 'undefined') {
            Object.defineProperty(p_obj, '_interface', {
                get: function() { 
                    return _interface;
                },
                configurable: false,
                enumerable: false,
            });
        }    
 
        if (!p_ctor['_UNION']) p_ctor['_UNION'] = [];
        
        for(var i = 2; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function') {
                if (p_obj._interface.indexOf(arguments[i]) < 0) { // 중복 검사 
                    p_obj._interface.push(arguments[i]);
                    addCnt++;
                }
            } else throw new ExtendError(/EL01403/, null, [i - 2, typeof arguments[i]]);
        } 

        for (var i = 0; i < p_ctor['_UNION'].length; i++) {
            if (p_obj._interface.indexOf(p_ctor['_UNION'][i]) < 0) {    // 인터페이스 중복 검사 후 등록
                p_obj._interface.push(p_ctor['_UNION'][i]);
                addCnt++;
            }
        }

        try {
            var beginIdx = p_obj._interface.length - addCnt;
            for (var i = beginIdx; i < p_obj._interface.length; i++) {
                if (p_ctor['_KIND'] === 'interface') {  // 인터페이스 타입과 분리
                    Type.allowType(p_obj._interface[i], p_obj, 1);
                } else Type.matchType(p_obj._interface[i], p_obj, 1);
            }
        } catch (error) { 
            throw new ExtendError(/EL01404/, error, [$typeName(p_obj), $typeName(p_obj._interface[i]), p_ctor['_KIND'] || 'class']);
        }

        if (typeof p_obj.isImplementOf === 'undefined') {   // 내부 메소드 설정
            Object.defineProperty(p_obj, 'isImplementOf',
            {
                value: $isImplementOf,
                configurable: false,
                enumerable: false
            });
        }

        // inner function
        function $isImplementOf(target) {
            if (typeof target === 'function') {
                for (var i = 0; i < this._interface.length; i++) {
                    if (this._interface[i] === target) return true;  
                }
            } else if (typeof target === 'string') {
                for (var i = 0; i < this._interface.length; i++) {
                    if (this._interface[i].name === target) return true;  
                }
            } else throw new ExtendError(/EL01405/, null, [typeof target]);
            return false;
        }
        function $typeName(obj) {
            var proto;
            var constructor;
            if (typeof obj === 'function') {
                return obj.name;
            } else if (typeof obj === 'object') {
                proto = !OLD_ENV && Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__ ;
                constructor = proto.constructor;
                return  constructor.name;
            } else return 'unknown name';
        }
    };

    //==============================================================
    // 4. module export
    if (isNode) exports.Util = Util;    // strip:
    
    // create namespace
    _global._L.Common               = _global._L.Common || {};

    _global._L.Util = Util;
    _global._L.Common.Util = Util;

}(typeof window !== 'undefined' ? window : global));
/**** trans-queue.js | _L.Common.EventEmitter ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util').Util;                   // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:

    //==============================================================Á
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 3. module implementation  
    var EventEmitter = (function () {
        /**
         * 이벤트 발행 클래스
         * @constructs _L.Common.EventEmitter
         */
        function EventEmitter() {
            
            var $storage = {};
            var isLog = false;

            /**
             * 리스너 객체 스토리지
             * @private
             * @member {object}  _L.Common.EventEmitter#$subscribers  
             */
            Object.defineProperty(this, '$storage',
            {
                get: function() { return $storage; },
                set: function(nVal) { 
                    if (!_isObject(nVal)) throw new ExtendError(/EL01501/, null, [this.constructor.name, nVal]);
                    $storage = nVal;
                },
                configurable: false,
                enumerable: false
            });

            /**
             * 전체 이벤트명
             * @protected
             * @member {object}  _L.Common.EventEmitter#_list  
             */
            Object.defineProperty(this, '_list',
                {
                    get: function() { 
                        return Object.keys(this.$storage);
                    },
                    configurable: false,
                    enumerable: false
                });

            /**
             * log 출력 여부
             * @member {boolean}  _L.Common.EventEmitter#isLog  
             */
            Object.defineProperty(this, 'isLog', 
            {
                get: function() { return isLog; },
                set: function(nVal) {
                    if (typeof nVal !== 'boolean') throw new ExtendError(/EL01502/, null, [this.constructor.name, nVal]);
                    isLog = nVal;
                }
            });
        }
        EventEmitter._NS = 'Common';    // namespace

        // local function
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        /**
         * 이벤트에 대한 리스너(함수)를 추가합니다. 
         * @param {string} p_event 이벤트 명
         * @param {function} p_listener 리스너 함수
         */
        EventEmitter.prototype.on = function(p_event, p_listener) {
            if (!_isString(p_event)) throw new ExtendError(/EL01503/, null, [typeof p_event]);
            if (typeof p_listener !== 'function') throw new ExtendError(/EL01504/, null, [typeof p_listener]);
            
            if (typeof this.$storage[p_event] !== 'object') {
                this.$storage[p_event] = [];
            }
            if (this.$storage[p_event].indexOf(p_listener) === -1) {
                this.$storage[p_event].push(p_listener);
            }
            // this.$storage[p_event].push(p_listener);

        };
        EventEmitter.prototype.addListener = EventEmitter.prototype.on; // 별칭
        
        /**
         * 이벤트에 대한 일회성 함수를 추가합니다. 
         * @param {string} p_event 이벤트 명
         * @param {function} p_listener 리스너 함수
         */
        EventEmitter.prototype.once = function(p_event, p_listener) {
            var self = this;

            if (!_isString(p_event)) throw new ExtendError(/EL01505/, null, [typeof p_event]);
            if (typeof p_listener !== 'function') throw new ExtendError(/EL01506/, null, [typeof p_listener]);

            function onceListener() {
                self.off(p_event, onceListener);
                p_listener.apply(self, arguments);
            }
            this.on(p_event, onceListener);
        };

        /**
         * 지정한 이벤트 의 리스너(함수)를 제거합니다. (이벤트명은 유지)
         * @param {string} p_event 이벤트 명
         * @param {function} p_listener 리스너 함수
         */
        EventEmitter.prototype.off = function(p_event, p_listener) {
            if (!_isString(p_event)) throw new ExtendError(/EL01507/, null, [typeof p_event]);
            if (typeof p_listener !== 'function') throw new ExtendError(/EL01508/, null, [typeof p_listener]);
            
            if (typeof this.$storage[p_event] === 'object') {
                var idx = this.$storage[p_event].indexOf(p_listener);
                if (idx > -1) {
                    this.$storage[p_event].splice(idx, 1);
                }
            }
        };
        EventEmitter.prototype.removeListener = EventEmitter.prototype.off; // 별칭

        /**
         * 전체 이벤트 또는 지정한 이벤트에 등록된 이벤트명과 리스너를 모두 제거합니다.
         * @param {string} [p_event] 이벤트명
         */
        EventEmitter.prototype.removeAllListeners = function(p_event) {
            if (!p_event) {
                this.$storage = {};  // 초기화
            }
            if (typeof this.$storage[p_event] === 'object') {
                delete this.$storage[p_event];
            }
        };

        /**
         * 이벤트명으로 등록된 리스너(함수)를 실행합니다.
         * @param {string} p_event 이벤트명
         * @returns {boolean} 리스너가 실행되었는지 여부
         */
        EventEmitter.prototype.emit = function(p_event) {
            var args = [].slice.call(arguments, 1);
            var listeners;
            var isListener = false;

            if (!_isString(p_event)) throw new ExtendError(/EL01509/, null, [typeof p_event]);

            if (typeof this.$storage[p_event] === 'object') {
                listeners = this.$storage[p_event].slice();
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i].apply(this, args);
                }
                if (listeners.length > 0) isListener = true;
            }

            if (this.isLog) {
                console.log('['+p_event+'] 이벤트가 밸생하였습니다.');
            }
            return isListener;
        };

        return EventEmitter;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.EventEmitter    = EventEmitter;        // strip:
    
    // create namespace
    _global._L.Common                   = _global._L.Common || {};

    _global._L.EventEmitter = EventEmitter;
    _global._L.Common.EventEmitter = EventEmitter; 

}(typeof window !== 'undefined' ? window : global));
/**** i-object.js | _L.Interface.IObject ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    
    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var IObject  = (function () {
        /**
         * 객체 인터페이스 입니다. (최상위)
         * @constructs _L.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        IObject._NS = 'Interface';    // namespace
        IObject._KIND = 'interface';

        /**
         * 객체 타입들을 얻습니다.
         * @returns {array<any>}
         * @abstract
         */
        IObject.prototype.getTypes  = function() {
            throw new ExtendError(/EL02111/, null, ['IObject']);
        };
        
        /**
         * 객체의 인스턴스 여부를 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IObject.prototype.instanceOf  = function() {
            throw new ExtendError(/EL02112/, null, ['IObject']);
        };

        /**
         * 객체와 비교합니다.
         * @returns {boolean}
         * @abstract
         */
        IObject.prototype.equal  = function() {
            throw new ExtendError(/EL02113/, null, ['IObject']);
        };
        
    
        return IObject;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IObject     = IObject;      // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};

    _global._L.IObject = IObject;
    _global._L.Interface.IObject = IObject;

}(typeof window !== 'undefined' ? window : global));
/**** i-marshal.js | _L.Interface.IMarshal ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var IMarshal  = (function () {
        /**
         * 객체 통제 인터페이스 입니다.
         * @constructs _L.Interface.IMarshal
         * @interface
         */
        function IMarshal() {

            /**
             * 객체의 고유 식별자
             * @member {string} _L.Interface.IMarshal#_guid
             */
            this._guid = String;

            /**
             * 객체의 타입
             * @member {string} _L.Interface.IMarshal#_type REVIEW:
             */
            this._type = [['_req_', Function, {$type: 'class'} ]];
        }

        IMarshal._NS = 'Interface';    // namespace
        IMarshal._KIND = 'interface';
        
        /**
         * 대상의 직렬화 객체를 얻습니다.
         * @abstract
         */
        IMarshal.prototype.getObject = function() {
            throw new ExtendError(/EL02121/, null, ['IMarshal']);
        };

        /**
         * 직렬화 객체를 설정합니다.
         * @abstract
         */
        IMarshal.prototype.setObject  = function() {
            throw new ExtendError(/EL02122/, null, ['IMarshal']);
        };

        return IMarshal;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IMarshal    = IMarshal;        // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};
    
    _global._L.IMarshal = IMarshal;
    _global._L.Interface.IMarshal = IMarshal;
    
}(typeof window !== 'undefined' ? window : global));
/**** i-colleciton.js | _L.Interface.ICollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        // var _Util                       = require('./util');                        // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:
    // var $Util                       = _global._L.Util;          // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    // var Util                    = _Util                 || $Util;                   // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    // if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 3. module implementation
    var ICollection  = (function () {
        /**
         * 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.ICollection
         * @interface
         */
        function ICollection() {
        }

        ICollection._KIND = 'interface';
        ICollection._NS = 'Interface';    // namespace

        /**
         * 컬렉션에 요소를 추가합니다.
         * @abstract
         */
        ICollection.prototype.add  = function() {
            throw new ExtendError(/EL02161/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소를 제거합니다.
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new ExtendError(/EL02162/, null, ['ICollection']);
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new ExtendError(/EL02163/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소을 조회합니다.
         * @returns {number}
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            throw new ExtendError(/EL02164/, null, ['ICollection']);
        };

        return ICollection;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.ICollection = ICollection;      // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};    

    _global._L.ICollection = ICollection;
    _global._L.Interface.ICollection = ICollection;

}(typeof window !== 'undefined' ? window : global));
/**** i-colleciton-property.js | _L.Interface.IPropertyCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _ICollection                = require('./i-collection').ICollection;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:
    var $Util                       = _global._L.Util;          // modify:
    var $ICollection                = _global._L.ICollection;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var ICollection             = _ICollection          || $ICollection;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

    //==============================================================
    // 3. module implementation   
    var IPropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.IPropertyCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IPropertyCollection() {
            _super.call(this);
        }
        Util.inherits(IPropertyCollection, _super);

        IPropertyCollection._KIND = 'interface';
        IPropertyCollection._NS = 'Interface';    // namespace

        /**
         * 프로퍼티 키가 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IPropertyCollection.prototype.indexToKey  = function() {
            throw new ExtendError(/EL02181/, null, ['IPropertyCollection']);
        };

        return IPropertyCollection;
        
    }(ICollection));

    //==============================================================
    // 4. module export
    if (isNode) exports.IPropertyCollection = IPropertyCollection;      // strip:
    
    // create namespace
    _global._L.Interface                    = _global._L.Interface || {};
    
    _global._L.IPropertyCollection = IPropertyCollection;
    _global._L.Interface.IPropertyCollection = IPropertyCollection;
    
}(typeof window !== 'undefined' ? window : global));
/**** i-element.js | _L.Interface.IElement ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var IElement  = (function () {
        /**
         * 요소(독립) 인터페이스 입니다.
         * @constructs _L.Interface.IElement
         * @interface
         */
        function IElement() {
            /**
             * 요소명
             * @member {string} _L.Interface.IElement#_name
             */
            this._name = String;
        }

        IElement._NS = 'Interface';    // namespace
        IElement._KIND = 'interface';

        /**
         * 요소를 복제합니다.
         * @returns {any}
         * @abstract
         */
        IElement.prototype.clone  = function() {
            throw new ExtendError(/EL02131/, null, ['IElement']);
        };

        return IElement;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IElement    = IElement;    // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};
    
    _global._L.IElement = IElement;
    _global._L.Interface.IElement = IElement;
    
}(typeof window !== 'undefined' ? window : global));
/**** i-list.js | _L.Interface.IList ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var IList  = (function () {
        /**
         * 목록 인터페이스 입니다.
         * @constructs _L.Interface.IList
         * @interface
         */
        function IList() {

            /**
             * 목록
             * @member {array} _L.Interface.IList#_list
             */
            this._list = Array;
            
            /**
             * 목록 갯수
             * @member {number} _L.Interface.IList#count
             */
            this.count = Number;
        }

        IList._NS = 'Interface';    // namespace
        IList._KIND = 'interface';

        return IList;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IList   = IList;      // strip:
    
    // create namespace
    _global._L.Interface        = _global._L.Interface || {};

    _global._L.IList = IList;
    _global._L.Interface.IList = IList;
    
}(typeof window !== 'undefined' ? window : global));
/**** i-control-list.js | _L.Interface.IListControl ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var IListControl  = (function () {
        /**
         * 목록 제어 인터페이스 입니다.
         * @constructs _L.Interface.IListControl
         * @interface
         */
        function IListControl() {
        }

        IListControl._NS = 'Interface';    // namespace
        IListControl._KIND = 'interface';
        
        /**
         * 목록에 대상을 추가합니다.
         * @abstract
         */
        IListControl.prototype.add = function() {
            throw new ExtendError(/EL02151/, null, ['IListControl']);
        };

        /**
         * 목록에서 대상을 삭제합니다.
         * @abstract
         */
        IListControl.prototype.del  = function() {
            throw new ExtendError(/EL02152/, null, ['IListControl']);
        };

        /**
         * 목록에 대상의 존재 여부를 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IListControl.prototype.has  = function() {
            throw new ExtendError(/EL02153/, null, ['IListControl']);
        };

        /**
         * 목록에서 대상을 찾습니다.
         * @returns {any}
         * @abstract
         */
        IListControl.prototype.find  = function() {
            throw new ExtendError(/EL02154/, null, ['IListControl']);
        };

        return IListControl;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IListControl    = IListControl;    // strip:
    
    // create namespace
    _global._L.Interface                = _global._L.Interface || {};
    
    _global._L.IListControl = IListControl;
    _global._L.Interface.IListControl = IListControl;
    
}(typeof window !== 'undefined' ? window : global));
/**** i-serialize.js | _L.Interface.ISerialize ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var ISerialize  = (function () {
        /**
         * 직렬화 인터페이스 입니다.
         * @constructs _L.Interface.ISerialize
         * @interface
         */
        function ISerialize() {
        }

        ISerialize._NS = 'Interface';    // namespace
        ISerialize._KIND = 'interface';

        /**
         * 내보내기(출력)를 합니다.
         * @returns {any}
         * @abstract
         */
        ISerialize.prototype.output  = function() {
            throw new ExtendError(/EL02191/, null, ['ISerialize']);
        };

        /**
         * 가져오기(로드) 합니다.
         * @abstract
         */
        ISerialize.prototype.load  = function(String) {
            throw new ExtendError(/EL02192/, null, ['ISerialize']);
        };

        return ISerialize;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.ISerialize  = ISerialize;    // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};

    _global._L.ISerialize = ISerialize;
    _global._L.Interface.ISerialize = ISerialize;
    
}(typeof window !== 'undefined' ? window : global));
/**** i-colleciton-array.js | _L.Interface.IArrayCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _ICollection                = require('./i-collection').ICollection;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $ICollection                = _global._L.ICollection;       // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var ICollection             = _ICollection          || $ICollection;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

    //==============================================================
    // 3. module implementation   
    var IArrayCollection  = (function (_super) {
        /**
         * 배열 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.IArrayCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IArrayCollection() {
            _super.call(this);
        }
        Util.inherits(IArrayCollection, _super);
        
        IArrayCollection._KIND = 'interface';
        IArrayCollection._NS = 'Interface';    // namespace

        /**
         * 요소를 지정위치에 추가합니다.
         * @abstract
         */
        IArrayCollection.prototype.insertAt  = function() {
            throw new ExtendError(/EL02171/, null, ['IArrayCollection']);
        };
    
        return IArrayCollection;
        
    }(ICollection));

    //==============================================================
    // 4. module export
    if (isNode) exports.IArrayCollection    = IArrayCollection;    // strip:
    
    // create namespace
    _global._L.Interface                    = _global._L.Interface || {};

    _global._L.IArrayCollection = IArrayCollection;
    _global._L.Interface.IArrayCollection = IArrayCollection;
    
}(typeof window !== 'undefined' ? window : global));
/**** namespace-manager.js | _L.Meta.NamespaceManager ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Type                       = require('./type').Type;                   // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _IList                      = require('./i-list').IList;                // strip:
        var _IListControl               = require('./i-control-list').IListControl; // strip:
        var _ISerialize                 = require('./i-serialize').ISerialize;      // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Type                       = _global._L.Type;              // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $IList                      = _global._L.IList;             // modify:
    var $IListControl               = _global._L.IListControl;      // modify:
    var $ISerialize                 = _global._L.ISerialize;        // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Type                    = _Type                 || $Type;                   // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var IList                   = _IList                || $IList;                  // strip:
    var IListControl            = _IListControl         || $IListControl;           // strip:
    var ISerialize              = _ISerialize           || $ISerialize;             // strip:
    
    //==============================================================Á
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IList) throw new Error(Message.get('ES011', ['IList', 'i-list']));
    if (!IListControl) throw new Error(Message.get('ES011', ['IListControl', 'i-control-list']));
    if (!ISerialize) throw new Error(Message.get('ES011', ['ISerialize', 'i-serialize']));

    //==============================================================
    // 3. module implementation   
    var NamespaceManager = (function () {
        /**
         * 네임스페이스 관리자를 생성합니다.
         * @constructs _L.Meta.NamespaceManager
         */
        function NamespaceManager() {

            var $storage = this.$createNsRefer();
            var _elemTypes  = []; 
            var isOverlap = false;
            
            
            /**
             * 내부 변수 접근
             * @member {string} _L.Meta.NamespaceManager#$storage
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$storage',
            {
                get: function() { return $storage; },
                set: function(nVal) { $storage = nVal; },
                configurable: false,
                enumerable: false,
            });

            // /**
            //  * 네임스페이스 저장소
            //  * @member {array} _L.Meta.NamespaceManager#$storage 
            //  * @private
            //  * @readonly
            //  */
            // Object.defineProperty(this, '$storage',
            // {
            //     get: function() { return $storage; },
            //     configurable: false,
            //     enumerable: false
            // });

            /** 
             * 네임스페이스 요소 타입, elemTypes.length == 0 전체허용
             * @member {array<any>}  _L.Meta.NamespaceManager#_elemTypes  
             * @protected
             */
            Object.defineProperty(this, '_elemTypes', 
            {
                get: function() {
                    return _elemTypes;
                },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elemTypes = arrType;
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 네임스페이스 요소 목록
             * @member {array<string>}  _L.Meta.NamespaceManager#_list
             * @readonly
             */
            Object.defineProperty(this, '_list', 
            {
                get: function() {
                    var storage = this.$storage;
                    var arr = [];
                    var stack = [];
                    findElement(storage);
                    return arr;

                    // inner function
                    function findElement(target) { 
                        for (var prop in target) {
                            if (prop === '_type') continue;
                            var ns = target[prop];
                            stack.push(prop);
                            if (!ns['_type']) {
                                arr.push(stack.join('.'));
                            } else findElement(ns);
                            stack.pop();
                        }
                    }
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 네임스페이스 요소 갯수
             * @member {number} _L.Meta.NamespaceManager#count 
             * @readonly
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() {
                    return this._list.length;
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 중복 요소 등록 허용 여부, 기본값 = false (중복금지)
             * @member {boolean} _L.Meta.NamespaceManager#isOverlap
             */
            Object.defineProperty(this, 'isOverlap',
            {
                get: function() { return isOverlap; },
                set: function(val) { 
                    if (typeof val !== 'boolean') throw new ExtendError(/EL03311/, null, [typeof val]);
                    isOverlap = val;
                },
                configurable: false,
                enumerable: true
            });

            // inner variable access
            // this.__SET$storage = function(val, call) {
            //     if (call instanceof NamespaceManager) $storage = val;
            // }

            this._$KEYWORD = ['namespace', 'ns', 'NS', '_type'];    // 금지단어

            Util.implements(NamespaceManager, this);        // strip:
        }
        NamespaceManager._UNION = [IList, IListControl];
        NamespaceManager._NS = 'Meta';
        
        // local function
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }

        function _validNamespace(nsName) {  // 네임스페이스 이름 검사
            var regex = /^[_a-zA-Z]([.]?[_0-9a-zA-Z])*$/;
            return regex.test(nsName)
        }

        function _validName(sName) {   // 이름 검사
            var regex = /^[_a-zA-Z]([_0-9a-zA-Z])*$/;
            return regex.test(sName)
        }

        function _getArray(ns) {  // 네임스페이스 문자열 배열로 얻기
            var sections = [];
            if (ns === '') return sections;
            if (typeof ns === 'string') {
                if (!_validNamespace(ns)) throw new ExtendError(/EL03312/, null, [ns]);
                sections = ns.split('.');
            } else if (Array.isArray(ns)) {
                sections = ns;
            } else throw new ExtendError(/EL03313/, null, [typeof ns]);

            for (var i = 0; i < sections.length; i++) {
                var sName =sections[i];
                if (!_isString(sName)) throw new ExtendError(/EL03314/, null, [i, typeof sName]);
                if (!_validName(sName)) throw new ExtendError(/EL03315/, null, [i, sName]);
            }
            return sections;
        }
        
        /**
         * 네임스페이스 저장소 초기화 객체를 생성합니다.
         * @returns {object} {_type: 'ns'}
         * @private
         */
        NamespaceManager.prototype.$createNsRefer = function() {
            return { _type: 'ns' };
        };

        /**
         * 네임스페이스 경로객체를 얻습니다.
         * @param {string | object} p_elem 얻을 요소
         * @returns {object} {ns: '..', key: '..'}
         * @protected
         */
        NamespaceManager.prototype._getPathObject = function(p_elem) {
            var fullName;
            var arr;
            var key;
            var nsPath;
            var obj = {};

            if (_isString(p_elem)) fullName = p_elem;
            else fullName = this.getPath(p_elem);
            
            if (typeof fullName !== 'string') return;

            arr = fullName.split('.');
            key = arr.pop();
            nsPath = arr.join('.');
            obj['ns'] = nsPath;
            obj['key'] = key;
            return obj;
        };
        
        /**
         * 네임스페이스를 초기화 합니다.
         */
        NamespaceManager.prototype.init = function() {
            this.$storage = this.$createNsRefer();
        };

        /**
         * 네임스페이스에 경로를 추가합니다.
         * @param {string | array<string>} p_ns 네임스페이스 이름
         */
        NamespaceManager.prototype.addNamespace = function(p_ns) {
            var parent = this.$storage;
            var sections;
        
            try {
                sections = _getArray(p_ns);

                if (this._$KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1); // 최상위 에약어 제거
            
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (typeof parent[sections[i]] === 'undefined') {
                        parent[sections[i]] = this.$createNsRefer();
                    }
                    parent = parent[sections[i]];
                }

            } catch (error) {
                throw new ExtendError(/EL03321/, error, []);
            }
        };

        /**
         * 네임스페이스에 경로를 삭제합니다.
         * @param {string | array<string>} p_ns 네임스페이스 이름
         */
        NamespaceManager.prototype.delNamespace = function(p_ns) {
            var parent = this.$storage;
            var sections;
        
            try {
                sections = _getArray(p_ns);

                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName] && parent[sName]['_type'] === 'ns') {
                        if (i === sections.length - 1) delete parent[sName];
                        else parent = parent[sName];
                    } else return;
                }
            } catch (error) {
                throw new ExtendError(/EL03322/, error, []);
            }
        };

        /**
         * 네임스페이스에 경로 객체를 얻습니다.
         * @param {string | array<sting>} p_ns 네임스페이스 이름
         * @returns {object} 경로에 대한 객체
         */
        NamespaceManager.prototype.path = function(p_ns) {
            var parent = this.$storage;
            var sections;

            if (!p_ns) return parent;
            
            try {
                sections = _getArray(p_ns);

                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName] && parent[sName]['_type'] === 'ns') {
                        if (i === sections.length - 1) return parent[sName];    
                        parent = parent[sName];
                    } else return;
                }
                
            } catch (error) {
                throw new ExtendError(/EL03323/, error, []);
            }
        };

        /**
         * 네임스페이스의 경로에 요소를 추가합니다.
         * @param {string} p_fullName 네임스페이스 전체 경로명
         * @param {any} p_elem 요소
         */
        NamespaceManager.prototype.add = function(p_fullName, p_elem) {
            var parent = this.$storage;
            var sections;
            var oPath;
            var key;
            var ns;

            try {
                oPath = this._getPathObject(p_fullName);
                key = oPath['key'];
                ns = oPath['ns'];
                sections = _getArray(ns);
    
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);  // []로 감싸서 choice 타입으로 변환됨
                if (!_validName(key)) throw new ExtendError(/EL03331/, null, [key]);
                if (!this.isOverlap && this.getPath(p_elem)) {
                    throw new ExtendError(/EL03332/, null, []);
                }
                
                if (sections.length === 0) {    // 최상위 등록
                    parent[key] = p_elem;
                    return;
                } else this.addNamespace(ns);
    
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (i === sections.length - 1) { 
                        parent[sName][key] = p_elem;
                    } else parent = parent[sName];
                }
                
            } catch (error) {
                throw new ExtendError(/EL03333/, error, []);
            }
        };

        /**
         * 네임스페이스의 경로에 요소를 삭제합니다.
         * @param {string} p_fullname 네임스페이스 전체 경로명
         * @returns {boolean}
         */
        NamespaceManager.prototype.del = function(p_fullName) {
            var parent = this.$storage;
            var sections;

            try {
                sections = _getArray(p_fullName);
    
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName]) {
                        if (i === sections.length - 1) {
                            delete parent[sName];
                            return true;
                        } else parent = parent[sName];
                    } else return false;
                }
                
            } catch (error) {
                throw new ExtendError(/EL03334/, error, []);
            }

        };

        /**
         * 네임스페이스에 요소가 있는지 확인합니다.
         * @param {string | any} p_elem 경로 | 객체
         * @returns {boolean}
         */
        NamespaceManager.prototype.has = function(p_elem) {
            if (_isString(p_elem) && this.find(p_elem)) return true;
            else if (typeof this.getPath(p_elem) === 'string') return true;
            return false;
        };

        /**
         * 네임스페이스의 경로에 요소를 찾아서 돌려줍니다.
         * @param {string | array<string>} p_fullName 네임스페이스 전체 경로명
         * @returns {(object | function)?}
         */
        NamespaceManager.prototype.find = function(p_fullName) {
            var parent = this.$storage;
            var sections;

            try {
                sections = _getArray(p_fullName);   // try undefined
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName]) {
                        if (i === sections.length - 1) return parent[sName];
                        else parent = parent[sName];
                    } else return;
                }
                
            } catch (error) {
                return;                
            }
        };
        
        /**
         * 네임스페이스에 요소로 경로를 얻습니다.  
         * (중복시 첫번째 요소 return)
         * @param {any} p_elem 얻을 객체
         * @returns {string?}
         */
        NamespaceManager.prototype.getPath = function(p_elem) {
            var namespace = this.$storage;
            var stack = [];

            if (!p_elem) throw new ExtendError(/EL03341/, null, [typeof p_elem]);

            if ($findElement(namespace)) {
                return stack.join('.');
            } else return;

            // inner function
            function $findElement(target) { 
                for(var prop in target) {
                    var obj = target[prop];
                    if (obj === 'ns') continue;
                    if (obj && obj['_type'] === 'ns') {
                        stack.push(prop);
                        if($findElement(obj)) return true;
                    } else {
                        if (obj === p_elem) {
                            stack.push(prop);
                            return true;
                        }
                    }
                }
                stack.pop();
                return false;
            }
        };

        /**
         * 네임스페이스 저장소를 문자열로 내보냅니다.  
         * 함수를 JSON 으로 출력하기 위해서 별도의 stringify 지정해야합니다.!
         * @param {function?} p_stringify JSON stringify
         * @param {string?} p_space 공백
         * @returns {string} 직렬화한 문자열
         */
        NamespaceManager.prototype.output = function(p_stringify, p_space) {
            var arr = [];
            var obj;
            var str;
            var temp = {list: arr};

            try {
                for (var i = 0; i < this._list.length; i++) {
                    var fullName    = this._list[i];
                    var fun         = this.find(fullName);
                    var nObj        = this._getPathObject(fullName);
                    obj = { 
                        ns: nObj.ns, 
                        key: nObj.key, 
                        full: fullName, 
                        elem: fun
                    };
                    arr.push(obj);
                }
    
                if (typeof p_stringify === 'function') str = p_stringify(temp, {space: p_space} );
                else str = JSON.stringify(temp, null, p_space);
                return str;
                
            } catch (error) {
                throw new ExtendError(/EL03342/, error, [error]);
            }
            
        };

        /**
         * 문자열을 파싱해서 네임스페이스 저장소로 가져옵니다.  
         * @param {string} p_str 직렬화한 문자열
         * @param {function?} p_parse JSON 파서
         */
        NamespaceManager.prototype.load = function(p_str, p_parse) {
            var arr = [];
            
            if (!_isString(p_str)) throw new ExtendError(/EL03343/, null, [typeof p_str]);
            
            try {
                if (typeof p_parse === 'function') arr = p_parse(p_str);
                else arr = JSON.parse(p_str, null);
                
                this.init();
                for (var i = 0; i < arr['list'].length; i++) {
                    var o = arr['list'][i];
                    var fun = o['elem'];
                    this.add(o['full'], fun);
                }

            } catch (error) {
                throw new ExtendError(/EL03344/, error, [error.message]);
            }
        };

        return NamespaceManager;
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.NamespaceManager    = NamespaceManager;    // strip:
    
    // create namespace
    _global._L.Meta                         = _global._L.Meta || {};

    _global._L.NamespaceManager = NamespaceManager;
    _global._L.Meta.NamespaceManager = NamespaceManager;

}(typeof window !== 'undefined' ? window : global));
/**** meta-registry.js | _L.Meta.MetaRegistry ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                           // strip:
        var _Message                    = require('./message').Message;                     // strip:
        var _ExtendError                = require('./extend-error').ExtendError;            // strip:
        var _Util                       = require('./util').Util;                           // strip:
        var _NamespaceManager           = require('./namespace-manager').NamespaceManager;  // strip:
    }                                                                                       // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $NamespaceManager           = _global._L.NamespaceManager;  // modify:

    var Message                 = _Message              || $Message;                        // strip:
    var ExtendError             = _ExtendError          || $ExtendError;                    // strip:
    var Util                    = _Util                 || $Util;                           // strip:
    var NamespaceManager        = _NamespaceManager     || $NamespaceManager;               // strip:

    //==============================================================Á
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!NamespaceManager) throw new Error(Message.get('ES011', ['NamespaceManager', 'namespace-manager']));

    //==============================================================
    // 3. module implementation       
    var MetaRegistry = (function () {
        /**
         * 메타 객체 등록소입니다. (static)
         * @constructs _L.Meta.MetaRegistry
         * @static
         */
        function MetaRegistry() { 
        }

        MetaRegistry._NS = 'Meta';    // namespace

        // var define
        var _list = [];
        var namespace = new NamespaceManager();
    
        /**
         * 메타 객체 목록 (참조값)
         * @member {any[]} _L.Meta.MetaRegistry#_list
         * @readonly
         */
        Object.defineProperty(MetaRegistry, "_list", 
        {
            get: function() { 
                var arr = [];
                for (var i = 0; i < _list.length; i++) arr.push(_list[i]);
                return arr;
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * 메타 객체 전체 갯수
         * @member {number} _L.Meta.MetaRegistry#count
         * @readonly
         */
        Object.defineProperty(MetaRegistry, "count", 
        {
            get: function() { return _list.length; },
            configurable: false,
            enumerable: true,
        });        

        /**
         * 메타 객체의 네임스페이스
         * @member {NamespaceManager} _L.Meta.MetaRegistry#namespace
         * @readonly
         */
        Object.defineProperty(MetaRegistry, "namespace", 
        {
            get: function() { return namespace; },
            configurable: false,
            enumerable: true,
        });

        // local function
        function _isBuiltFunction(obj) {    // 내장함수 여부
            if (typeof obj === 'function' && (false 
                || obj === Number || obj === String 
                || obj === Boolean || obj === Function
                || obj === Object || obj === Array
                || obj === RegExp || obj === Date 
                || obj === Symbol || obj === BigInt
            )) return true;
            return false;
        }

        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        
        function _getGuidList(oGuid, arr) {  //객체 배열 리턴
            arr = arr || [];
            if (MetaRegistry.isGuidObject(oGuid)) arr.push(oGuid);
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (_isObject(oGuid[i])) _getGuidList(oGuid[i], arr);
                }
            } else if (_isObject(oGuid)) {
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop])) _getGuidList(oGuid[prop], arr);
                }
            }
            return arr;
        };

        /**
         * 등록된 메타 객체 및 네임스페이스를 초기화 합니다.
         */
        MetaRegistry.init = function() {
            _list.length = 0;
            this.namespace.init();
        };

        /**
         * 메타 객체를 등록하고, 생성자를 네임스페이스에 등록합니다.  
         * - 기존에 객체가 등록되어 있으면 예외가 발생합니다.  
         * - 네임스페이스에 생성자가 없을 경우 등록합니다.
         * @param {MetaObject} p_meta 메타 객체
         */
        MetaRegistry.register = function(p_meta) {
            var _ns;
            var key;
            var type;
            var fullName;

            if (!this.isMetaObject(p_meta)) throw new ExtendError(/EL03211/, null, [p_meta._type, p_meta._guid]);
            if (this.has(p_meta)) throw new ExtendError(/EL03212/, null, [p_meta._guid]);

            _ns         = p_meta['_ns'] || '';
            type        = p_meta['_type'];
            key         = type.name;
            fullName    = p_meta['_ns'] && p_meta['_ns'].length > 0 ?  _ns +'.'+key : key;

            _list.push(p_meta);  // 객체 등록
            this.registerClass(type, _ns, key); // 클래스 등록
        };

        /**
         * 등록소에서 메타 객체를 해제합니다. 
         * @param {MetaObject | string} p_meta 메타 객체 또는 guid
         * @returns {boolean} 성공 여부
         */
        MetaRegistry.release = function(p_meta) {
            var guid;

            if (typeof p_meta !== 'object' && typeof p_meta !== 'string') {
                throw new ExtendError(/EL03213/, null, [typeof p_meta]);
            }

            guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
            if (!_isString(guid)) return false;

            for(var i = 0; i < _list.length; i++) {
                if (_list[i]['_guid'] === guid) {
                    _list.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        /**
         * 등록소에 메타 객체 여부를 확인합니다.
         * @param {object | string} p_oGuid  guid 타입의 객체 또는 guid
         * @returns {boolean} 존재 여부
         */
        MetaRegistry.has = function(p_oGuid) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;

            if (!_isString(guid)) return false;

            for(var i = 0; i < _list.length; i++) {
                if (_list[i]['_guid'] === guid) return true;
            }
            return false;
        };
        
        /**
         * 등록소에서 메타 객체를 찾습니다.
         * @param {object | string} p_oGuid guid 타입의 객체 또는 guid
         * @returns {MetaObject?}
         */
        MetaRegistry.find = function(p_oGuid) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
            
            if (!_isString(guid)) return;
            
            for(var i = 0; i < _list.length; i++) {
                if (_list[i]['_guid'] === guid) return _list[i];
            }
        };

        /**
         * 매타 객체 여부를 확인합니다.  
         * @param {object} p_target 대상 객체
         * @returns {boolean}
         */
        MetaRegistry.isMetaObject = function(p_target) {
            if (!_isObject(p_target)) return false;
            if (_isString(p_target['_guid']) && typeof p_target['_type'] === 'function') return true;
            return false;
        };
        
        /**
         * guid 객체에 대한 메타 객체를 생성합니다.
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체
         * @returns {MetaObject}
         */
        MetaRegistry.createMetaObject = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var args = [null];
            var type;
            var ns;
            var fullName;
            var coClass;
            var params;
            
            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03221/, null, [typeof p_oGuid]);
            if (!_isString(p_oGuid['_type'])) throw new ExtendError(/EL03222/, null, [typeof p_oGuid['_type']]);
            if (!_isObject(origin)) throw new ExtendError(/EL03223/, null, [typeof origin]);
            
            type        = p_oGuid['_type'];
            ns          = p_oGuid['_ns'] || '';
            fullName    =  ns !== '' ? [ns, type].join('.') : type;
            coClass     = this.getClass(fullName);
            
            if (typeof coClass !== 'function') throw new ExtendError(/EL03224/, null, [fullName, typeof coClass]);
            
            // params = coClass.hasOwnProperty('_PARAMS') ? coClass['_PARAMS'] : []; // arr
            params = Object.prototype.hasOwnProperty.call(coClass, '_PARAMS') ? coClass['_PARAMS'] : []; // arr
            for (var i = 0; i < params.length; i++) {
                var argName = params[i];
                var prop = p_oGuid[argName];
                var obj;
                obj = _isObject(prop) && prop['$ref'] ? this.findSetObject(prop['$ref'], origin) : prop;
                if (p_oGuid[argName]) args.push(obj);
            }
            return new (Function.prototype.bind.apply(coClass, args));
        };
        
        /**
         * guid 객체에 대한 guid 참조를 생성합니다.  
         * @param {MetaObject} p_meta 메타 객체
         * @returns {object} { $ref: 'guid값' }
         * @example
         * var meta = new MetaElement('m1');
         * obj.onwer = MetaRegistry.createReferObject(meta);
         * console.log(obj.onwer);          // { $ref : '5337877c-49d6-9add-f35a-7bd31d510d4f' }
         */
        MetaRegistry.createReferObject = function(p_meta) {
            if (!_isObject(p_meta)) throw new ExtendError(/EL03225/, null, [typeof p_meta]);
            if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03226/, null, [typeof p_meta['_guid']]);
            return { $ref: p_meta['_guid'] };
        };

        /**
         * target을 네임스페이스에 등록하고, 참조를 생성합니다.
         * 
         * @param {function} p_target 함수 또는 생성자
         * @returns {object} { $ns: string }
         * @example
         * var meta = new MetaElement('m1');
         * obj.onwer = MetaRegistry.createReferObject(meta);
         * console.log(obj);                // {onwer: {$ns: 'Meta.MetaElement'}}
         */
        MetaRegistry.createNsReferObject = function(p_target) {
            var fullName;
            var ns, key;

            if (typeof p_target !== 'function') throw new ExtendError(/EL03227/, null, [typeof p_target]);
            
            if (!this.findClass(p_target)) {
                ns  = p_target['_NS'] || '';
                key = p_target.name;
                this.registerClass(p_target, ns, key);
            }
            fullName = this.findClass(p_target);
            return { $ns: fullName };
        };

        /**
         * guid 객체에 메타 객체의 guid 를 설정합니다.  
         * - oGuid.$set = meta._guid
         * @param {object} p_oGuid guid 타입의 객체
         * @param {MetaObject} p_meta 
         * @returns {object} oGuid.$set에 설정한 guid값
         * @example
         * var meta = new MetaElement('m1');    // meta.guid = '5337877c-49d6-9add-f35a-7bd31d510d4f'
         * var obj = { name: 'm2' };
         * MetaRegistry.setMetaObject(obj, meta);
         * console.log(obj);                    // {name: 'm2, $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
         */
        MetaRegistry.setMetaObject = function(p_oGuid, p_meta) {
            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03241/, null, [typeof p_oGuid]);
            if (!_isObject(p_meta)) throw new ExtendError(/EL03242/, null, [typeof p_meta]);
            if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03243/, null,[typeof p_meta['_guid']]);
            
            p_oGuid['$set'] = p_meta['_guid'];
            return p_oGuid;
        };
         
        /**
         * guid 객체의 유효성 검사를 합니다.  
         * 1. 객체의 guid 값의 중복 여부 확인합니다.  
         * 2. 객체의 '$ref'을 값으로 가지는 guid 객체의 존재 여부를 확인합니다.  
         * 3. 객체의 '$ns'을 값으로 하는 네임스페이스의 존재 여부를 확인합니다.  
         * 4. 객체의 '_key'와 '_elem' 의 갯수가 같은지 검사합니다.  
         * @param {object} p_oGuid 검사할 guid 객체
         * @returns {boolean} 성공 여부
         */
        MetaRegistry.validObject = function(p_oGuid) {
            var _this = this;
            var arrObj;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03251/, null, [typeof p_oGuid]);
            
            arrObj = _getGuidList(p_oGuid);
            if (!$validUniqueGuid() || !$validReference(p_oGuid) || !$validCollection(p_oGuid)) return false;
            return true;

            // inner function
            function $findGuid(guid, arr) { // guid 조회
                for(var i = 0; i < arr.length; i++) {
                    if (arr[i]['_guid'] === guid) return arr[i];
                }
            }
            function $validReference(oGuid) { // 참조 검사
                if (oGuid['$ref'] && !$findGuid(oGuid['$ref'], arrObj)) return false;
                if (oGuid['$set'] && !$findGuid(oGuid['$set'], arrObj)) return false;
                if (oGuid['$ns'] && !_this.getClass(oGuid['$ns'])) return false;
        
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (_isObject(oGuid[i]) && !$validReference(oGuid[i])) return false
                    }
                } else {
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop]) && !$validReference(oGuid[prop])) return false;
                    }
                }
                return true;
            }
            function $validCollection(oGuid) { // 컬렉션 검사
                if (Array.isArray(oGuid['_elem']) && Array.isArray(oGuid['_key'])) {
                    if (oGuid['_elem'].length !== oGuid['_key'].length) return false;
                }
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (_isObject(oGuid[i]) && !$validCollection(oGuid[i])) return false;
                    }
                } else {
                    for(var prop in p_oGuid) {
                        if (_isObject(oGuid[prop]) && !$validCollection(oGuid[prop])) return false;
                    }
                }
                return true;
            }
            function $validUniqueGuid() {    // guid 유일한 값인지 검사
                for (var i = 0; i < arrObj.length; i++) {
                    for (var ii = 0; ii < arrObj.length; ii++) {
                        if (arrObj[i]['_guid'] === arrObj[ii]['_guid'] && i !== ii) return false; // 중복
                    }
                }
                return true;
            }
        };

        /**
         * guid 객체 여부를 확인합니다.
         * @param {object} p_target 확인 대상
         * @returns {boolean} 
         */
        MetaRegistry.isGuidObject = function(p_target) {
            if (!_isObject(p_target)) return false;
            if (_isString(p_target['_guid']) && _isString(p_target['_type'])) return true;
            return false;
        };

        /**
         * origin 객체에 guid 객체의 포함 여부를 확인합니다.
         * @param {string| object} p_oGuid 확인 대상
         * @param {object | array<object>} p_origin  원본 객체
         * @returns {boolean}
         */
        MetaRegistry.hasGuidObject = function(p_oGuid, p_origin) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
            var arrOrigin = [];

            if (!_isString(guid)) throw new ExtendError(/EL03252/, null, [typeof guid]);

            if (Array.isArray(p_origin)) arrOrigin = p_origin;
            else arrOrigin.push(p_origin);

            for (var i = 0; i < arrOrigin.length; i++) {
                var origin = arrOrigin[i];
                var arrObj = _getGuidList(origin);
                if (!_isObject(origin)) throw new ExtendError(/EL03253/, null, [i, typeof guid]);
                for (var ii = 0; ii < arrObj.length; ii++) {
                    if (arrObj[ii]._guid === guid) return true;
                }
            }
            return false;
        };

        /**
         * guid 객체에 참조타입 요소가 포함되어 있는지 확인힙니다.  
         * - 참조타입 : $ref: '', $ns:''
         * @param {object} p_oGuid 확인 대상
         * @returns {boolean}
         */
        MetaRegistry.hasRefer = function(p_oGuid) {
            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03254/, null, [typeof p_oGuid]);
            if (!this.isGuidObject(p_oGuid)) throw new ExtendError(/EL03255/, null, [p_oGuid['_type'], p_oGuid['_guid']]);

            return $hasRefer(p_oGuid);

            // inner function
            function $hasRefer(oGuid) {  // 참조 포함 여부
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object' && $hasRefer(oGuid[i])) return true;
                    }
                } else {
                    if (oGuid['$ref'] && _isString(oGuid['$ref'])) return true;
                    if (oGuid['$ns'] && _isString(oGuid['$ns'])) return true;
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop]) && $hasRefer(oGuid[prop])) return true
                    }
                }
                return false;
            }
        };     

        /**
         * origin 객체에 설정된 guid 객체를 찾습니다.  
         * 1. guid 객체 내부에서 guid 값의 요소 조회 ?  
         * 2. 조회한 요소의 $set 값을 사용하여  메타객체 저장소헤 대상 객체 조회 ?   
         * @param {string | object} p_oGuid 조회 대상 guid 값 또는  guid 객체
         * @param {object} p_origin 원본 객체
         * @returns {MetaObject}
         */
        MetaRegistry.findSetObject = function(p_oGuid, p_origin) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
            var origin = p_origin;

            if (!_isString(guid)) throw new ExtendError(/EL03256/, null, [guid]);
            if (!_isObject(origin)) throw new ExtendError(/EL03257/, null, [typeof origin]);

            return $findObject(origin);
            
            // inner finction
            function $findObject(oGuid) { // 객체 조회
                var result;
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object') {
                            result = $findObject(oGuid[i]);
                            if(result) return result;
                        }
                    }
                } else {
                    if (oGuid['_guid'] && oGuid['_guid'] === guid) {
                        result = oGuid['$set'] ? MetaRegistry.find(oGuid['$set']) : undefined;
                        return result;
                    }
                    for(var prop in oGuid) {
                        if (typeof oGuid[prop] === 'object') {
                            result = $findObject(oGuid[prop]);
                            if(result) return result;
                        } 
                    }
                }
                return result;
            }
        };

          

        /**
         * guid 객체의 참조요소값을 객체 참조로 변환합니다.  
         * 변환대상 : $ns => [object object]
         * @param {object} p_oGuid 변환할 guid 객체
         * @returns {object} 참조 변환한 oGuid 객체
         */
        MetaRegistry.transformRefer = function(p_oGuid) {
            var _this = this;
            var arrObj;
            var clone;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03244/, null, [typeof p_oGuid]);
            
            arrObj = _getGuidList(p_oGuid);
            clone = Util.deepCopy(p_oGuid);
            $linkReference(clone, arrObj);
            return clone;

            // inner function
            function $linkReference(oGuid, arr, parentName) {    // 참조 연결
                parentName = parentName || '';
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object') $linkReference(oGuid[i], arr);
                    }
                } else {
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop])) {
                            if (oGuid[prop]['$ns']) {
                                var ns = _this.getClass(oGuid[prop]['$ns']);
                                if (typeof ns !== 'function') throw new ExtendError(/EL03245/, null, [parentName, prop]);
                                oGuid[prop] = ns; // function 타입 연결
                            } else $linkReference(oGuid[prop], arr, parentName ? parentName +'.'+ prop : prop);
                        }
                    }
                }
            }
        };
        
        /**
         * 네임스페이스(ns)에 생성자 또는 객체를 등록합니다.  
         * - 중복 검사 후 등록  
         * - 기본제공 함수는 내부 저장하지 않음  
         * @param {function | object} p_target 대상
         * @param {string} p_ns fullname 또는 네임스페이스 
         * @param {string} p_key 대상 이름
         */
        MetaRegistry.registerClass = function(p_target, p_ns, p_key) {
            var fullName;
            
            if (!(_isObject(p_target) || typeof p_target === 'function')) throw new ExtendError(/EL03231/, null, [typeof p_target]);
            if (p_ns && typeof p_ns !== 'string') throw new ExtendError(/EL03232/, null, [typeof p_ns]);
            if (p_key && !_isString(p_key)) throw new ExtendError(/EL03233/, null, [typeof p_key]);

            if (p_key) fullName = p_ns.length > 0 ? p_ns +'.'+ p_key : p_key;
            else fullName = p_ns;
            
            if (_isBuiltFunction(p_target)) return;    // 내장함수 제외
            if (typeof _global[fullName] === 'function') return;
            
            if (!this.namespace.find(fullName)) this.namespace.add(fullName, p_target);  // 중복 검사 후 등록
        };
        
        /**
         * 네임스페이스(ns)에 생성자 또는 객체를 해제합니다.
         * @param {string} p_fullName 네임스페이스 전체 이름
         * @returns {boolean} 삭제 성공 여부
         */
        MetaRegistry.releaseClass = function(p_fullName) {
            if (!_isString(p_fullName)) throw new ExtendError(/EL03234/, null, [typeof p_fullName]);
            
            if (typeof _global[p_fullName] === 'function') return true; // 내장함수 & 전역 함수
            return this.namespace.del(p_fullName);
        };
        
        /**
         * 네임스페이스(ns)에서 생성자 또는 객체를 찾아서 전체 경로를 돌려줍니다.
         * @param {function} p_target 생성자 또는 객체 
         * @returns {string?} 네임스페이스 전체 이름
         */
        MetaRegistry.findClass = function(p_target) {
            var fullName;

            if (typeof p_target !== 'function') throw new ExtendError(/EL03235/, null, [typeof p_target]);
            
            fullName = p_target.name;
            if (typeof _global[fullName] === 'function') return fullName;   // 내장함수 & 전역 함수
            return this.namespace.getPath(p_target);
        };
        
        /**
         * 네임스페이스(ns)에서 전체이름에 대한 생성자 또는 객체를 얻습니다.
         * @param {string} p_fullName 전체경로
         * @returns {(object | function)?} 객체 또는 생성자
         */
        MetaRegistry.getClass = function(p_fullName) {
            if (!_isString(p_fullName)) throw new ExtendError(/EL03236/, null, [typeof p_fullName]);
            
            if (typeof _global[p_fullName] === 'function') return _global[p_fullName];  // 내장함수 & 전역 함수
            return this.namespace.find(p_fullName);
        };

        /**
         * 직렬화한 guid 문자열을 파싱하여 MetaObject 로 불러옵니다.  
         * REVIEW: 필요성 재검토 필요  
         * @param {string} p_str guid 객체를 직렬화한 문자열
         * @param {function?} p_parse JSON 파서
         * @returns {MetaObject} 불러온 MetaObject
         */
        MetaRegistry.loadMetaObject = function(p_str, p_parse) {
            var obj = p_str;
            var oGuid;
            var meta;

            if (typeof p_str !== 'string') throw new ExtendError(/EL03246/, null, [typeof str]);

            obj = (typeof p_parse === 'function') ? p_parse(obj) : JSON.parse(obj, null);
            if (this.has(obj)) return this.find(obj['_guid']);  // 객체가 존재할 경우
            if (!this.isGuidObject(obj)) throw new ExtendError(/EL03247/, null, [obj['_type'], obj['_guid']]);

            oGuid = this.transformRefer(obj);
            meta = this.createMetaObject(oGuid);
            meta.setObject(oGuid);
            return meta;
        };
        return MetaRegistry;
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.MetaRegistry    = MetaRegistry;    // strip:
    
    // create namespace
    _global._L.Meta                     = _global._L.Meta || {};

    _global._L.MetaRegistry = MetaRegistry;
    _global._L.Meta.MetaRegistry = MetaRegistry;

}(typeof window !== 'undefined' ? window : global));
/**** meta-object.js | _L.Meta.MetaObject ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Type                       = require('./type').Type;                   // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _IObject                    = require('./i-object').IObject;            // strip:
        var _IMarshal                   = require('./i-marshal').IMarshal;          // strip:
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;  // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Type                       = _global._L.Type;              // modify:
    var $Util                       = _global._L.Util               // modify:
    var $IObject                    = _global._L.IObject;           // modify:
    var $IMarshal                   = _global._L.IMarshal;          // modify:
    var $MetaRegistry               = _global._L.MetaRegistry;      // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Type                    = _Type                 || $Type;                   // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var IObject                 = _IObject              || $IObject;                // strip:
    var IMarshal                = _IMarshal             || $IMarshal;               // strip:
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;           // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IObject) throw new Error(Message.get('ES011', ['IObject', 'i-object']));
    if (!IMarshal) throw new Error(Message.get('ES011', ['IMarshal', 'i-marshal']));
    if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));

    //==============================================================
    // 3. module implementation   
    var MetaObject  = (function () {
        /**
         * 메타 최상위 객체를 생성합니다.
         * @constructs _L.Meta.MetaObject
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;
            
            /**
             * 현재 객체의 고유식별자(guid)
             * @readonly
             * @member {string} _L.Meta.MetaObject#_guid 
             * @example
             * var obj = MetaObject();
             * console.log(obj._guid);      // '5337877c-49d6-9add-f35a-7bd31d510d4f' unique key code
             */
            Object.defineProperty(this, '_guid', 
            {
                get: function() { 
                    if (!_guid) _guid = Util.createGuid();
                    return _guid;
                },
                set: function(nVal) { _guid = nVal; },
                configurable: false,
                enumerable: true
            });

            /**
             * 현재 객체의 생성자
             * @readonly
             * @member {function} _L.Meta.MetaObject#_type 
             * @example
             * var obj = new MetaObject();
             * obj._type === MetaObject;        // true
             * console.log(typeof obj._type);   // 'function'
             */
            Object.defineProperty(this, '_type', 
            {
                get: function() { 
                    var proto = this.__proto__ || Object.getPrototypeOf(this);
                    return proto.constructor;
                },
                configurable: false,
                enumerable: true
            });
            
            // 추상클래스 검사
            if (Object.prototype.hasOwnProperty.call(this._type, '_KIND')) {
            // if (this._type.hasOwnProperty('_KIND')) {
                var kind = this._type['_KIND'].toLowerCase();
                if (['abstract', 'interface', 'enum', 'function'].indexOf(kind) > -1) {
                    throw new ExtendError(/EL03111/, null, [this._type.name, kind]);
                }
            }

            // _NS 선언이 없으면 부모의 것을 기본으로 사용!
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            Util.implements(MetaObject, this);          // strip:
        }
        MetaObject._UNION = [IObject, IMarshal];
        MetaObject._NS = 'Meta';
        MetaObject._PARAMS = [];

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _compare(p_obj1, p_obj2) { // 객체 비교
            if (p_obj1 === p_obj2) return true;
            else if (p_obj1 instanceof MetaObject && p_obj2 instanceof MetaObject) {
                var obj1 = p_obj1.getObject(2);    // _guid, $ref 제외 객체
                var obj2 = p_obj2.getObject(2);
                return Type.deepEqual(obj1, obj2);
            } else if (_isObject(p_obj1) && _isObject(p_obj2)) {
                return Type.deepEqual(p_obj1, p_obj2);
            } else return false;
        }

        /**
         * 현재 객체와 target 객체를 비교합니다.  
         * (참조 주소의 비교(===)가 아니고, 속성과 값을 비교,  _guid 값은 비교 제외)  
         * @param {object} p_target 대상 객체
         * @returns {boolean}
         * @example
         * var meta1 = new MetaObject();
         * var meta2 = new MetaObject();
         * meta1.equal(meta2);      // true
         * meta2.equal(meat1);      // true
         * meta1 === meta2;         // false
         * 
         * var obj1 = {a: 1};
         * var obj2 = {a: 1};
         * this.equal(obj1, obj2);  // true
         */
        MetaObject.prototype.equal = function(p_target) {
            return _compare(this, p_target);
        };

        /**
         * 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다.  
         * @returns {array<function>}
         * @example
         * var obj = new MetaObject();
         * var arr = obj.getTypes();
         * arr[0] === MetaObject;   // true
         * arr[1] === Object;       // true
         * console.log(arr.length); // 2
         * 
         * var elem = new MetaElement('e1');   // Inherited MetaObject 
         * var arr = elem.getTypes();
         * arr[0] === MetaElement;  // true
         * arr[1] === MetaObject;   // true
         * arr[2] === Object;       // true
         * console.log(arr.length); // 3
         */
        MetaObject.prototype.getTypes = function() {
            return parentFunction(this);

            // inner function
            function parentFunction(obj) {
                var list = [];
                var proto = obj.__proto__ || Object.getPrototypeOf(obj);
                if (proto) {
                    list.push(proto.constructor);
                    list = list.concat(parentFunction(proto));
                }
                return list;
            }
        };

        /**
         * 현재 객체의 target 인스턴스 여부를 검사합니다 .(_UNION 포함)
         * @param {function | string} p_target 함수명 또는 생성자
         * @returns {boolean}
         * @example
         * var obj = new MetaObject();
         * obj.instanceOf('MetaObject');    // true
         * obj.instanceOf('Object');        // true
         * obj.instanceOf(MetaObject);      // true
         * obj.instanceOf(Object);          // true
         * obj.instanceOf(String);          // false
         * 
         * var elem = new MetaElement('e1');// Inherited MetaObject 
         * obj.instanceOf('MetaElement');   // true
         * obj.instanceOf('MetaObject');    // true
         * obj.instanceOf('Object');        // true
         * obj.instanceOf(MetaElement);     // true
         * obj.instanceOf(MetaObject);      // true
         * obj.instanceOf(Object);          // true
         * obj.instanceOf(String);          // false
         */
        MetaObject.prototype.instanceOf = function(p_target) {
            var _this = this;
            var unionTypes = this._interface || this._type._UNION;
            // var unionTypes = this._type['_UNION'] || [];
            // var unionTypes = this._interface || [];
            // var thisTypes = this.getTypes();

            if (typeof p_target === 'string') return $$findFunctionName(p_target);
            if (typeof p_target === 'function') return $findFunction(p_target);
            return false;

            // inner function
            function $findFunction(fun) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (fun === types[i]) return true;
                }
                
                for (var i = 0; i < unionTypes.length; i++) {
                    if (fun ===  unionTypes[i]) return true;
                }
                return false;
            }
            function $$findFunctionName(funName) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (funName === types[i].name) return true;
                }
                for (var i = 0; i < unionTypes.length; i++) {
                    if (funName === unionTypes[i].name) return true;
                }
                return false;
            }
        };

        /**
         * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        MetaObject.prototype.getObject = function(p_vOpt, p_owned) {
            var vOpt = p_vOpt || 0;
            var obj = {};
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
            obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        MetaObject.prototype.setObject  = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var fullName = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03112/, null, [typeof p_oGuid]);
            if (p_oGuid['_type'] !== fullName) throw new ExtendError(/EL03113/, null, [p_oGuid['_type'], fullName]);
            
            if (MetaRegistry.isGuidObject(origin)) {
                if (!origin['__TRANSFORM_REFER']) {
                    origin = MetaRegistry.transformRefer(origin);
                    origin['__TRANSFORM_REFER'] = true;
                }
            } else throw new ExtendError(/EL03114/, null, [p_origin._type, p_origin._guid]);
            
            MetaRegistry.setMetaObject(p_oGuid, this); // $set attach
        };

        return MetaObject;

    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.MetaObject  = MetaObject;    // strip:
    
    // create namespace
    _global._L.Meta                 = _global._L.Meta || {};

    _global._L.MetaObject = MetaObject;
    _global._L.Meta.MetaObject = MetaObject;
    
}(typeof window !== 'undefined' ? window : global));
/**** meta-element.js | _L.Meta.MetaElement ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _MetaObject                 = require('./meta-object').MetaObject;      // strip:
        var _IElement                   = require('./i-element').IElement;          // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $MetaObject                 = _global._L.MetaObject;        // modify:
    var $IElement                   = _global._L.IElement;          // modify:
    
    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var IElement                = _IElement             || $IElement;               // strip:
    var MetaObject              = _MetaObject           || $MetaObject;             // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IElement) throw new Error(Message.get('ES011', ['IElement', 'i-element']));
    if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 3. module implementation   
    var MetaElement  = (function (_super) {

        /**
         * 메타 요소 객체를 생성합니다.  
         * (독립체 사용 단위)
         * @constructs _L.Meta.MetaElement
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IElement}
         * @param {string} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var _name;

            // /**
            //  * 내부 변수 접근
            //  * @member {string} _L.Meta.MetaElement#$name
            //  * @readonly
            //  * @private
            //  */
            // Object.defineProperty(this, '$name',
            // {
            //     get: function() { return _name; },
            //     set: function(nVal) { 
            //         if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
            //         if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
            //         _name = nVal;
            //     },
            //     configurable: false,
            //     enumerable: false,
            // });

            /**
             * 현재 객체의 이름
             * @readonly
             * @member {string} _L.Meta.MetaElement#_name
             */
            Object.defineProperty(this, '_name',
            {
                get: function() { return _name; },
                set: function(nVal) {
                    if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
                    if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
                    _name = nVal;
                },
                configurable: false,
                enumerable: true
            });

            this._name = p_name;

            Util.implements(MetaElement, this);     // strip:
        }
        Util.inherits(MetaElement, _super);
        
        MetaElement._UNION = [IElement];
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter
        
        /**
         * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            obj['name'] = this._name;
            return obj;
        };

        /**
         * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;
            this._name = p_oGuid['name'];
            // this.__SET$_name(p_oGuid['name'], this);
        };
        
        /**
         * 현제 객체를 복제합니다.
         * @returns {MetaElement}
         */
        MetaElement.prototype.clone  = function() {
            var clone = new MetaElement(this._name);
            return clone;
        };

        return MetaElement;

    }(MetaObject));

    //==============================================================
    // 4. module export
    if (isNode) exports.MetaElement = MetaElement;      // strip:
    
    // create namespace
    _global._L.Meta                 = _global._L.Meta || {};

    _global._L.MetaElement = MetaElement;
    _global._L.Meta.MetaElement = MetaElement;

}(typeof window !== 'undefined' ? window : global));
/**** base-collection.js | _L.Collection.BaseCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Type                       = require('./type').Type;                   // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _EventEmitter               = require('./event-emitter').EventEmitter;  // strip:
        var _ICollection                = require('./i-collection').ICollection;    // strip:
        var _IList                      = require('./i-list').IList;                // strip:
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;  // strip:
        var _MetaObject                 = require('./meta-object').MetaObject;      // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Type                       = _global._L.Type;              // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $EventEmitter               = _global._L.EventEmitter;      // modify:
    var $ICollection                = _global._L.ICollection;       // modify:
    var $IList                      = _global._L.IList;             // modify:
    var $MetaRegistry               = _global._L.MetaRegistry;      // modify:
    var $MetaObject                 = _global._L.MetaObject;        // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var EventEmitter            = _EventEmitter         || $EventEmitter;           // strip:
    var Type                    = _Type                 || $Type;                   // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var ICollection             = _ICollection          || $ICollection;            // strip:
    var IList                   = _IList                || $IList;                  // strip:
    var MetaObject              = _MetaObject           || $MetaObject;             // strip:
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;           // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!EventEmitter) throw new Error(Message.get('ES011', ['EventEmitter', 'event-emitter']));
    if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));
    if (!IList) throw new Error(Message.get('ES011', ['IList', 'i-list']));
    if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 3. module implementation
    var BaseCollection  = (function (_super) {
        /**
        * 기본 컬렉션을 생성합니다.
        * @abstract
        * @extends _L.Meta.MetaObject
        * @constructs _L.Collection.BaseCollection
        * @implements {_L.Interface.ICollection}
        * @implements {_L.Interface.IList}
        * @param {object} [p_owner] 소유객체
        */
        function BaseCollection(p_owner) { 
            _super.call(this);
            
            // private variable
            var $event = new EventEmitter();
            var $elements = [];
            var $descriptors = [];
            var $KEYWORD = [];
            
            // protected variable
            var _owner ;
            var _elemTypes  = [];

            /** 
             * 이벤트 객체입니다.
             * @private
             * @member {EventEmitter} _L.Collection.BaseCollection#$event  
             */
            Object.defineProperty(this, '$event', 
            {
                get: function() { return $event; },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소들입니다.
             * @private
             * @member {string} _L.Meta.Entity.BaseColumn#$elements
             */
            Object.defineProperty(this, '$elements',
            {
                get: function() { return $elements; },
                set: function(nVal) { $elements = nVal; },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소의 기술자들 (getter, setter)입니다.
             * @private
             * @member {string} _L.Meta.Entity.BaseColumn#$descriptors
             */
            Object.defineProperty(this, '$descriptors',
            {
                get: function() { return $descriptors; },
                set: function(nVal) { $descriptors = nVal; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 예약어입니다.
             * @private
             * @member {array<string>}  _L.Collection.BaseCollection#$KEYWORD
             */
            Object.defineProperty(this, '$KEYWORD', 
            {
                get: function() { return $KEYWORD; },
                set: function(newVal) { $KEYWORD = $KEYWORD.concat(newVal); },  // REVIEW: 예약어 중복
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 소유자입니다.
             * @protected 
             * @member {object} _L.Collection.BaseCollection#_owner  
             */
            Object.defineProperty(this, '_owner', 
            {   
                get: function() { return _owner; },
                set: function(val) { _owner = val; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소의 타입 제약조건입니다.
             * @protected 
             * @member {array<any>}  _L.Collection.BaseCollection#_elemTypes  
             */
            Object.defineProperty(this, '_elemTypes', 
            {
                get: function() { return _elemTypes; },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    var reg = /^_[a-zA-Z]+_/;
                    var arr1 = arrType.length > 0 && typeof arrType[0] === 'string' ? arrType[0] : '';
                    
                    // var result;
                    if (arrType.length > 0  && reg.exec(arr1) === null) arrType = ['_req_'].concat(arrType);
                        
                    // result = reg.exec(val);
                    // if (result !== null) return result[0].toUpperCase();
                    _elemTypes = arrType;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소의 목록입니다.
             * @protected 
             * @readonly
             * @member {array}  _L.Collection.BaseCollection#_list  
             */
            Object.defineProperty(this, '_list', 
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < $elements.length; i++) arr.push(this.$elements[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소의 갯수입니다.
             * @readonly
             * @member {number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() { return this.$elements.length; },
                enumerable: false,
                configurable: false
            });

            /**
             * 컬렉션 요소를 추가 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onAdd
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdd', 
            {
                set: function(fun) { this.$event.on('add', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 추가한 후에 발생하는 이벤트입니다.
             * @event _L.Collection.BaseCollection#onAdded
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdded', 
            {
                set: function(fun) { this.$event.on('added', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 삭제하기 전에 발생하는 이벤트입니다.
             * @event _L.Collection.BaseCollection#onRemove
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemove', 
            {
                set: function(fun) { this.$event.on('remove', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 삭제한 후에 발생하는 이벤트입니다.
             * @event _L.Collection.BaseCollection#onRemoved
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemoved', 
            {
                set: function(fun) { this.$event.on('removed', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             *컬렉션을 초기화하기 전에 발생하는 이벤트입니다.
             * @event _L.Collection.BaseCollection#onClear
             * @param {function}    p_callback
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onClear', 
            {
                set: function(fun) { this.$event.on('clear', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션을 초기화한 후에 발생하는 이벤트입니다.
             * @event _L.Collection.BaseCollection#onCleared
             * @param {function}    p_callback
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onCleared', 
            {
                set: function(fun) { this.$event.on('cleared', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 변경하기 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onChanging 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanging', 
            {
                set: function(fun) { this.$event.on('changing', fun); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 변경한 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onChanged 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanged', 
            {
                set: function(fun) { this.$event.on('changed', fun); },
                configurable: false,
                enumerable: false,
            });

            // object settging
            this._owner = p_owner || null;

            // 예약어 등록
            this.$KEYWORD = ['$event', '_owner', '$elements', '$descriptors', '_elemTypes', '_list', 'count', '$KEYWORD'];
            this.$KEYWORD = ['onAdd', 'onAdded', 'onRemove', 'onRemoved', 'onClear', 'onCleared', 'onChanging', 'onChanged'];
            this.$KEYWORD = ['_onAdd', '_onAdded', '_onRemove', '_onRemoved', '_onClear', '_onCleared', '_onChanging', '_onChanged'];
            this.$KEYWORD = ['_getPropDescriptor', 'getObject', 'setObject', '_guid', '_type'];
            this.$KEYWORD = ['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'add', 'clear'];

            Util.implements(BaseCollection, this);          // strip:
        }
        Util.inherits(BaseCollection, _super);
        
        BaseCollection._UNION = [ICollection, IList];
        BaseCollection._NS = 'Collection';
        BaseCollection._PARAMS = ['_owner'];
        BaseCollection._KIND = 'abstract';
        
        /**
         * onAdd 이벤트를 발생시킵니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onAdd
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_elem) {
            this.$event.emit('add', p_idx, p_elem, this); 
        };

        /**
         * onAdded 이벤트를 발생시킵니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onAdded
         */
        BaseCollection.prototype._onAdded = function(p_idx, p_elem) {
            this.$event.emit('added', p_idx, p_elem, this); 
        };

        /**
         * onRemove 이벤트를 발생시킵니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_elem) {
            this.$event.emit('remove', p_idx, p_elem, this);
        };

        /**
         * onRemoved 이벤트를 발생시킵니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onRemoved
         */
        BaseCollection.prototype._onRemoved = function(p_idx, p_elem) {
            this.$event.emit('removed', p_idx, p_elem, this);
        };

        /** 
         * onClear 이벤트를 발생시킵니다.
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.$event.emit('clear', this); 
        };

        /** 
         * onCheared 이벤트를 발생시킵니다.
         * @listens _L.Collection.BaseCollection#onCleared
         */
        BaseCollection.prototype._onCleared = function() {
            this.$event.emit('cleared', this); 
        };

        /** 
         * onChanging 이벤트를 발생시킵니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function(p_idx, p_elem) {
            this.$event.emit('changing', p_idx, p_elem, this); 
        };

        /** 
         * onChanged 이벤트를 발생시킵니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function(p_idx, p_elem) {
            this.$event.emit('changed', p_idx, p_elem, this); 
        };

        /**
         * 컬렉션에 요소를 추가할 때 설정되는 기본 기술자입니다.
         * @protected
         * @param {number} p_idx 인덱스 번호
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this.$elements[p_idx]; },
                set: function(nVal) {
                    if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], nVal);
                    this._onChanging(p_idx, nVal);  // before event
                    this.$elements[p_idx] = nVal;
                    this._onChanged(p_idx, nVal);   // after event
                },
                configurable: true,
                enumerable: true,
            };
        };

        /** 
         * 컬렉션의 요소를 삭제합니다. (내부 사용)
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new ExtendError(/EL04111/, null, []);
        };

        /**
         * 컬렉션 객체를 직렬화(guid 타입) 객체로 반환합니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        BaseCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            var _elems = [];
            
            if (!Type.deepEqual(this.$event['$storage'], {})) {
                obj['$storage'] = this.$event.$storage;
            }
            if (vOpt < 2 && vOpt > -1 && this._owner) {
                obj['_owner'] = MetaRegistry.createReferObject(this._owner);
            }
            for (var i = 0; i < this._elemTypes.length; i++) {
                var elem = this._elemTypes[i];
                if (typeof elem === 'function') _elems.push(MetaRegistry.createNsReferObject(elem));
                else _elems.push(elem);
            }
            obj['_elemTypes'] = _elems;
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var owner;
            var origin = p_origin ? p_origin : p_oGuid;
            
            this.clear();
            if (p_oGuid['$storage']) {
                this.$event.$storage = p_oGuid['$storage'];
            }
            if (p_oGuid['_owner']) {
                owner = MetaRegistry.findSetObject(p_oGuid['_owner']['$ref'], origin);
                if (!owner) throw new ExtendError(/EL04112/, null, [p_oGuid['_owner']['$ref']]);    // Branch:
                this._owner = owner;            
            }
            if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
                this._elemTypes = p_oGuid['_elemTypes'];
            }
        };

        /**
         * 컬렉션에 요소를 삭제합니다.
         * @param {any} p_elem 요소
         * @returns {number} 삭제한 인덱스 번호
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this.$elements.indexOf(p_elem);

            if (idx >= 0 && this.removeAt(idx)) return idx;
            return -1;
        };
        
        /**
         * 컬렉션에서 지정된 위치의 요소를 삭제합니다.
         * @param {number} p_pos 인덱스 번호
         * @returns {boolean} 처리 결과  
         */
        BaseCollection.prototype.removeAt = function(p_pos) {
            var elem;
            
            if (typeof p_pos !== 'number') throw new ExtendError(/EL04113/, null, [typeof p_pos]);
            elem = this.$elements[p_pos];
            if (elem) {
                this._onRemove(p_pos, elem);
                if (!this._remove(p_pos)) return false;
                this._onRemoved(p_pos, elem);
                return true;
            }
            return false;
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @param {any} p_elem 요소
         * @returns {boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this.$elements.indexOf(p_elem) > -1;
        };

        /**
         *  컬렉션에서 요소를 조회합니다.
         * @param {any} p_elem 요소
         * @returns {number} 0 보다 작으면 존재하지 않음
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this.$elements.indexOf(p_elem);
        };

        /** 
         * 컬렉션에 요소를 추가합니다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new ExtendError(/EL04114/, null, []);
        };
        
        /**
         * 컬렉션을 초기화 합니다.
         * @abstract 
         * @fires _L.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new ExtendError(/EL04115/, null, []);
        };

        return BaseCollection;
        
    }(MetaObject));
    
    //==============================================================
    // 4. module export
    if (isNode) exports.BaseCollection = BaseCollection;    // strip:
    
    // create namespace
    _global._L.Collection           = _global._L.Collection || {};

    _global._L.BaseCollection = BaseCollection;
    _global._L.Collection.BaseCollection = BaseCollection;

}(typeof window !== 'undefined' ? window : global));

/**** collection-array.js | _L.Collection.ArrayCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                           // strip:
        var _Message                    = require('./message').Message;                     // strip:
        var _ExtendError                = require('./extend-error').ExtendError;            // strip:
        var _Type                       = require('./type').Type;                           // strip:
        var _Util                       = require('./util').Util;                           // strip:
        var _IArrayCollection           = require('./i-collection-array').IArrayCollection; // strip:
        var _BaseCollection             = require('./base-collection').BaseCollection;      // strip:
        var _MetaObject                 = require('./meta-object').MetaObject;              // strip:
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;          // strip:
    }                                                                                       // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Type                       = _global._L.Type;              // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $IArrayCollection           = _global._L.IArrayCollection;  // modify:
    var $BaseCollection             = _global._L.BaseCollection;    // modify:
    var $MetaObject                 = _global._L.MetaObject;        // modify:
    var $MetaRegistry               = _global._L.MetaRegistry;      // modify:

    var Message                 = _Message              || $Message;                        // strip:
    var ExtendError             = _ExtendError          || $ExtendError;                    // strip:
    var Type                    = _Type                 || $Type;                           // strip:
    var Util                    = _Util                 || $Util;                           // strip:
    var BaseCollection          = _BaseCollection       || $BaseCollection;                 // strip:
    var IArrayCollection        = _IArrayCollection     || $IArrayCollection;               // strip:
    var MetaObject              = _MetaObject           || $MetaObject;                     // strip:
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;                   // strip:
    
    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IArrayCollection) throw new Error(Message.get('ES011', ['IArrayCollection', 'i-collection-array']));
    if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (!BaseCollection) throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));
    
    //==============================================================
    // 3. module implementation
    var ArrayCollection  = (function (_super) {
        /**
         * 배열 컬렉션을 생성합니다.
         * @constructs _L.Collection.ArrayCollection
         * @implements {_L.Interface.IArrayCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} [p_owner] 소유 객체
         */
        function ArrayCollection(p_owner) {
            _super.call(this, p_owner);

            this.$KEYWORD = ['insertAt'];

            Util.implements(ArrayCollection, this);     // strip:
        }
        Util.inherits(ArrayCollection, _super);
        
        ArrayCollection._UNION = [IArrayCollection];
        ArrayCollection._NS = 'Collection';     // namespace
        ArrayCollection._PARAMS = ['_owner'];   // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        
        /**
         * 배열 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
         * @protected
         * @param {number} p_pos 인덱스 위치
         * @returns {boolean}
         */
        ArrayCollection.prototype._remove = function(p_pos) {
            var count = this.count - 1;   // [idx] 포인트 이동
            
            this.$elements.splice(p_pos, 1);
            this.$descriptors.splice(p_pos, 1);
            
            if (p_pos < count) {
                for (var i = p_pos; i < count; i++) {   // 참조 변경(이동)
                    var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                    Object.defineProperty(this, [i], desc);
                }
                delete this[count];     // 마지막 idx 삭제
            } else {
                delete this[p_pos];     // idx 삭제 (끝일 경우)
            }
            return true;
        };

        /**
         * 배열 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        ArrayCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this.$descriptors.length > 0) {
                obj['_desc'] = [];
                for (var i = 0; i < this.$descriptors.length; i++) {
                    obj['_desc'].push(this.$descriptors[i]);
                }
            }
            obj['_elem'] = [];
            for (var i = 0; i < this.$elements.length; i++) {
                var elem = this.$elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 배열 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        ArrayCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
                for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                    this.$descriptors.push(p_oGuid['_desc'][i]);
                }
            }
            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.$elements.push(obj);
                    
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) throw new ExtendError(/EL04211/, null, [i, elem['$ref']]);
                    this.$elements.push(meta);  
                
                } else this.$elements.push(elem);
            }

        };        

        /**
         * 배열 컬렉션에 요소를 추가합니다.
         * @param {any} p_elem 요소
         * @param {object} [p_desc] 프로퍼티 기술자 객체
         * @returns {number} 추가한 인덱스
         */
        ArrayCollection.prototype.add = function(p_elem, p_desc) {
            var pos = this.count;
            this.insertAt(pos, p_elem, p_desc);
            return pos;
        };

        /**
         * 배열 컬렉션을 초기화 합니다.
         * 대상 : _element =[], _descriptors = []  
         */
        ArrayCollection.prototype.clear = function() {
            this._onClear();    // event

            for (var i = 0; i < this.count; i++) delete this[i];
            this.$elements = [];
            this.$descriptors = [];
            
            this._onCleared();    // event
        };

        /**
         * 배열 컬렉션의 지정위치에 요소를 추가합니다.
         * @param {number} p_pos 인덱스 위치
         * @param {any} p_elem 요소
         * @param {object} [p_desc] 프로퍼티 기술자 객체
         * @returns {boolean} 
         */
        ArrayCollection.prototype.insertAt = function(p_pos, p_elem, p_desc) {
            try {
                var index   = this.count;

                if (typeof p_pos !== 'number') throw new ExtendError(/EL04212/, null, [typeof p_pos]);
                if (index < p_pos) throw new ExtendError(/EL04213/, null, [p_pos, index]);
                if (p_pos < 0) throw new ExtendError(/EL04214/, null, [p_pos]);
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                    Message.warn('WS011', ['configurable = false', 'element']); 
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = false', 'element']);
                }

                this._onAdd(p_pos, p_elem);
                // data process
                this.$elements.splice(p_pos, 0, p_elem);            
                this.$descriptors.splice(p_pos, 0, p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [p_pos], p_desc);
                } else {
                    Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
                }
                // reindexing
                for (var i = p_pos + 1; i < this.count; i++) {
                    var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                    Object.defineProperty(this, [i], desc);
                }
                this._onAdded(p_pos, p_elem);
                
                return true;

            } catch (error) {
                throw new ExtendError(/EL04215/, error, [p_pos, p_elem]);
            }
        };

        return ArrayCollection;

    }(BaseCollection));

    //==============================================================
    // 4. module export
    if (isNode) exports.ArrayCollection = ArrayCollection;      // strip:
    
    // create namespace
    _global._L.Collection           = _global._L.Collection || {};

    _global._L.ArrayCollection = ArrayCollection;
    _global._L.Collection.ArrayCollection = ArrayCollection;

}(typeof window !== 'undefined' ? window : global));
/**** collection-property.js | _L.Collection.PropertyCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                                   // strip:
        var _Message                    = require('./message').Message;                             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;                    // strip:
        var _Type                       = require('./type').Type;                                   // strip:
        var _Util                       = require('./util').Util;                                   // strip:
        var _IPropertyCollection        = require('./i-collection-property').IPropertyCollection;   // strip:
        var _BaseCollection             = require('./base-collection').BaseCollection;              // strip:
        var _MetaObject                 = require('./meta-object').MetaObject;                      // strip:
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;                  // strip:
    }                                                                                               // strip:
    var $Message                    = _global._L.Message;               // modify:
    var $ExtendError                = _global._L.ExtendError;           // modify:
    var $Type                       = _global._L.Type;                  // modify:
    var $Util                       = _global._L.Util;                  // modify:
    var $IPropertyCollection        = _global._L.IPropertyCollection;   // modify:
    var $BaseCollection             = _global._L.BaseCollection;        // modify:
    var $MetaObject                 = _global._L.MetaObject;            // modify:
    var $MetaRegistry               = _global._L.MetaRegistry;          // modify:

    var Message                 = _Message              || $Message;                                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;                            // strip:
    var Type                    = _Type                 || $Type;                                   // strip:
    var Util                    = _Util                 || $Util;                                   // strip:
    var IPropertyCollection     = _IPropertyCollection  || $IPropertyCollection;                    // strip:
    var BaseCollection          = _BaseCollection       || $BaseCollection;                         // strip:
    var MetaObject              = _MetaObject           || $MetaObject;                             // strip:
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;                           // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IPropertyCollection) throw new Error(Message.get('ES011', ['IPropertyCollection', 'i-collection-property']));
    if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (!BaseCollection) throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));
    
    //==============================================================
    // 3. module implementation   
    var PropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션을 생성합니다.
         * @constructs _L.Collection.PropertyCollection
         * @implements {_L.Interface.IPropertyCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} p_owner 소유 객체
         */
        function PropertyCollection(p_owner) {
            _super.call(this, p_owner); 

            var $keys = [];

            /**
             * 내부 변수 접근
             * @member {string} _L.Collection.PropertyCollection#$keys
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$keys',
            {
                get: function() { return $keys; },
                set: function(nVal) { $keys = nVal; },
                configurable: false,
                enumerable: false,
            });

            // /** 
            //  * 컬렉션 요소의 키값들
            //  * @readonly
            //  * @member {array<string>} _L.Collection.PropertyCollection#_keys 
            //  */
            // Object.defineProperty(this, '_keys',
            // {
            //     get: function() {
            //         var arr = [];
            //         for (var i = 0; i < _keys.length; i++) arr.push(_keys[i]);
            //         return arr;
            //     },
            //     configurable: false,
            //     enumerable: false
            // });

            // 예약어 등록 
            this.$KEYWORD = ['$keys', 'indexOf', 'exist', 'indexToKey'];

            Util.implements(PropertyCollection, this);      // strip:
        }
        Util.inherits(PropertyCollection, _super);
        
        PropertyCollection._UNION = [IPropertyCollection];
        PropertyCollection._NS = 'Collection';      // namespace
        PropertyCollection._PARAMS = ['_owner'];    // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }

        /**
         * 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
         * @protected
         * @param {number} p_pos 인덱스 위치
         * @returns {boolean} 
         */
        PropertyCollection.prototype._remove = function(p_pos) {
            var count = this.count - 1;
            var propName = this.indexToKey(p_pos);   // number 검사함
            
            delete this[propName];      // 프로퍼티 삭제

            this.$elements.splice(p_pos, 1);
            this.$keys.splice(p_pos, 1);
            this.$descriptors.splice(p_pos, 1);
            
            if (p_pos < count) {        // 참조 자료 변경
                for (var i = p_pos; i < count; i++) {
                    var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                    propName = this.indexToKey(i);
                    Object.defineProperty(this, [i], desc);
                    Object.defineProperty(this, propName, desc);
                }
                delete this[count];     // 마지막 idx 삭제
            } else {
                delete this[p_pos];     // idx 삭제 (끝일 경우)
            }
            return true;
        };

        /**
         * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this.$descriptors.length > 0) {
                obj['_desc'] = [];
                for (var i = 0; i < this.$descriptors.length; i++) {
                    obj['_desc'].push(this.$descriptors[i]);
                }
            }
            obj['_elem'] = [];
            for (var i = 0; i < this.count; i++) {
                var elem = this.$elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }
            obj['_key'] = [];
            for (var i = 0; i < this.$keys.length; i++) {
                var key = this.$keys[i];
                obj['_key'].push(key);
            }
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 프로퍼티 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) throw new ExtendError(/EL04221/, null, [p_oGuid['_elem'].length, p_oGuid['_key'].length]);
            
            if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
                if (p_oGuid['_elem'].length !== p_oGuid['_desc'].length) throw new ExtendError(/EL04222/, null, [p_oGuid['_elem'].length, p_oGuid['_desc'].length]);
                for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                    this.$descriptors.push(p_oGuid['_desc'][i]);
                }
            }

            this.$keys = [];
            for(var i = 0; i < p_oGuid['_key'].length; i++) {
                var key = p_oGuid['_key'][i];
                this.$keys.push(key);
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
                Object.defineProperty(this, key, this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.$elements.push(obj);
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) throw new ExtendError(/EL04223/, null, [i, elem['$ref']]);
                    this.$elements.push(meta);
                    
                } else this.$elements.push(elem);
            }
        };

        // /**
        //  * 프로퍼티 컬렉션의 인덱스 값을 조회합니다.
        //  * @param {string | any} p_target 키 또는 요소
        //  * @param {boolean} [p_isKey=false] 키로 조회 여부
        //  * @returns {number} 없을시 -1
        //  */
        // PropertyCollection.prototype.indexOf = function(p_target, p_isKey) {
        //     var isKey = p_isKey || false;
            
        //     if (!isKey) return this.$elements.indexOf(p_target);
        //     else {
        //         if (!_isString(p_target))  throw new ExtendError(/EL04224/, null, [typeof p_target]);
        //         return this.$keys.indexOf(p_target);
        //     }
        // };
        
        /**
         * 프로퍼티 컬렉션에 요소를 추가합니다.
         * @param {string} p_key 키
         * @param {any} [p_elem] 요소
         * @param {object} [p_desc] 기술자
         * @returns {number} index 번호
         */
        PropertyCollection.prototype.add = function(p_key, p_elem, p_desc) {
            try {
                var index   = this.count;
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
                // var types = ['_req_'];

                // types = [types.concat(this._elemTypes)];
                
                if (!_isString(p_key)) throw new ExtendError(/EL04225/, null, [p_key]);
                if(!regex.test(p_key)) throw new ExtendError(/EL04226/, null, [p_key, regex.source]);
                if (this.$KEYWORD.indexOf(p_key) > -1) throw new ExtendError(/EL04227/, null, [p_key]);
                if (this.exist(p_key)) throw new ExtendError(/EL04228/, null, [p_key]);
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
                // if (this._elemTypes.length > 0) Util.matchType(types, p_elem);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                        Message.warn('WS011', ['configurable = true', 'element']);
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = true', 'element']);
                }

                this._onAdd(index, p_elem);
                // data process
                this.$elements.push(p_elem);
                this.$keys.push(p_key);
                this.$descriptors.push(p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [index], p_desc);
                    Object.defineProperty(this, p_key, p_desc);
                } else {
                    Object.defineProperty(this, [index], this._getPropDescriptor(index));
                    Object.defineProperty(this, p_key, this._getPropDescriptor(index));
                }
                this._onAdded(index, p_elem);

                return index;

            } catch (error) {
                throw new ExtendError(/EL04229/, error, [p_key, p_elem]);
            }
        };

        /**
         * 프로러티 컬렉션을 초기화 합니다.
         * - 대상 : _element = [], _descriptors = [], _keys = []  
         * - 이벤트는 초기화 되지 않습니다.
         */
        PropertyCollection.prototype.clear = function() {
            this._onClear();
            
            for (var i = 0; i < this.count; i++) {
                var propName = this.indexToKey(i);
                delete this[i];
                delete this[propName];
            }
            this.$elements = [];
            this.$descriptors = [];
            this.$keys = [];
            
            this._onCleared();
        };
    
        /**
         * 프로퍼티 컬렉션키의 인덱스 값을 조회합니다.
         * @param {string} p_key 키
         * @returns {number} 없을시 -1
         */
        PropertyCollection.prototype.keyToIndex = function(p_key) {
            if (!_isString(p_key))  throw new ExtendError(/EL04224/, null, [typeof p_key]);
            return this.$keys.indexOf(p_key);
        };

        /**
         * 프로퍼티 컬렉션의 인덱스에 대한 키값을 조회합니다.
         * @param {number} p_idx 인덱스 값
         * @returns {string}
         */
        PropertyCollection.prototype.indexToKey = function(p_idx) {
            if (typeof p_idx !== 'number') throw new ExtendError(/EL0422A/, null, [typeof p_idx]);
            return this.$keys[p_idx];
        };

        /**
         * 프로퍼티 컬렉션의 키 존재하는지 확인합니다.
         * @param {string} p_key 키
         * @returns {boolean}
         */
        PropertyCollection.prototype.exist = function(p_key) {
            if (!_isString(p_key)) throw new ExtendError(/EL0422B/, null, [typeof p_key]);
            return Object.prototype.hasOwnProperty.call(this, p_key);
        };

        return PropertyCollection;

    }(BaseCollection));

    //==============================================================
    // 4. module export
    if (isNode) exports.PropertyCollection  = PropertyCollection;    // strip:
    
    // create namespace
    _global._L.Collection                   = _global._L.Collection || {};

    _global._L.PropertyCollection = PropertyCollection;
    _global._L.Collection.PropertyCollection = PropertyCollection;

}(typeof window !== 'undefined' ? window : global));