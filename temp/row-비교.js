// rObj
var rObj = {
    _guid: 1,
    columns: {
        _guid: 1,
        _elem: [
            {
                _guid: 1,
                name: 'i1',
            },
        ],
        _key: ['i1', 'i2']
    },
    rows: {
        _guid: 2,
        _elem: [
            {
                _guid: 2,
                _elem: ['R1', 'R2']
            }
        ],
    },
};

// obj 2 : 호환
var rObj = {
    // _guid: 1,
    columns: {
        // _guid: 1,
        _elem: [
            {
                // _guid: 1,
                name: 'i1',
            },
        ],
        _key: ['i1', 'i2']
    },
    rows: {
        // _guid: 2,
        _elem: [
            {
                // _guid: 2,
                _row: {
                    i1: 'R1',
                    i2: 'R2',
                }
            }
        ],
    },
};

// getObject() >> obj 타입으로 변환해서 사용
// mObj 타입은 변환해서 사용 : readSchema(), readData();
// obj 3 : DB 호환타입
var rObj = {
    // _guid: 1,
    columns: {
        i1: {},
        i2: {}
    },
    rows: [
        {
            i1: 'R1',
            i2: 'R2',
        }
    ],
};