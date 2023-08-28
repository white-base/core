const { NamespaceManager } = require("../src/namespace-manager");


var ns = new NamespaceManager();

// 이름 등록 > 검사 > 얻기 > 해제
ns.register('aa.bb');   
ns.hasPath('aa.bb');    // bool
ns.getPath('aa.bb');    // arr
ns.release('aa.bb');

// 요소 등록 > 검사 > 조회 > 얻기 > 해제
ns.set('aa.bb', 'Number', 1);
ns.has('aa.bb.Number');         // bool
ns.has(1);                      // bool
ns.find(1);                     // str
ns.get('aa.bb.Number');         // elem
ns.del('aa.bb.Number');


/**
 * 저장소 : 객체타입
 */
var storage = { 
    _type: 'ns',
    _elem: [
        {
            _type: 'elem',
            key: 'Fun',
            value: null
        }
    ],
    aa: {
        _type: 'ns',
    }
};

/**
 * 저장소 : 배열타입
 * ns 의 하위 삭제시 복잡해짐
 */
var storage = [
    {
        임시: 1
    }
];
var element = [
];

/**
 * 자장소: 객체, 요소: 배열
 */
var storage = { 
    _type: 'ns',
    _elem: [
        {
            _type: 'elem',
            key: 'Fun',
            value: null
        }
    ],
    aa: {
        _type: 'ns',
    }
};
var element = [
];