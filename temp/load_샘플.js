

// 로드셈플
function MetaColumn() {}
function MetaRegistry() {}
MetaRegistry.prototype.createMetaObject = function(obj) {
    if (obj._parent.$ref) {
        obj._parent = MetaRegistry.find(obj._parent.$ref);  // 참조를 연결한다.
    }
    return {};
}
function MetaTable () {
    this.load = function(obj) {
        // 이미 생성되어 있다는 의미
        if (obj.columns) {
            this.columns = MetaRegistry.createMetaObject(obj.columns);
        }
        if (obj.columns._type === 'MetaColumn') {
            this.columns = MetaColumn.createMetaObject(guid);
        }
        if (obj.column) {
            this.columns = new MetaColumn();
        }
    }
}

var obj = {
    columns: { _type: 'MetaTable', _guid: '@@@' }
};
var i = new MetaTable();
i.load(obj);

/**
 * [로딩 순서]
 *  - 전체 객체를 순회하며, 객체를 생성한다. : 참조는 제외
 *  - getObject(): obj<Meta>   => 메타객체를 얻는다.
 *  - setObject(obj<Meta>)
 * 
 */

// 객체의 생성은 가까운 곳에서 잘 알고 있다.
// 
