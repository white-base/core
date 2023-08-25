// 객체를 직렬화 기법
var str = set1.getObject(p_vOpt);
str = {
    type: 'MetaSet',
    guid: 'ID-1',
    metaName: 'S1',
    tables: {
        t1: {
            type: 'MetaTable',
            guid: 'ID-2',
            metaName: 'T1',
            metaSet: { $ref: 'ID-1' }
        }
    },
    views: [
        {
            name: 'v1',
            type: 'MetaView',
            guid: 'ID-3',
            tableName: 'V1',
            metaSet: { $ref: 'ID-1' }
        }
    ],
    tables: [
        {
            _type: 'MetaTable',
            _guid: 'ID-4',
            name: 'T1',
            $key: 't1', // 컬렉션명을 가르킴
            metaSet: { $ref: 'ID-1' },
            columns: [
                {
                    _type: 'MetaColumn',
                    _guid: 'ID-5',
                    name: 'i1',
                    $key: 'i1',
                }
            ]
        }
    ]
    /**
     * 1. tables 의 경우, 별칭은 들어가지만, 순서가 변경된다.
     * 2. views 의 경우, 이름을 별도로 표현해야 한다.
     * 3. 컬렉션으로 래핑을 한다.
     * 
     * 전재조건
     * - 객체명과 JSON 반드시 일대일 매핑할 필요는 없다.
     */
};