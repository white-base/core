/**
 * ES6+ 를 통한 예제
 */

// defined
class MetaObject{
    #guid = '';
    get _guid() {
        var createGuid = function() {
            function _p8(s) {  
                var p = (Math.random().toString(16)+'000000000').substr(2,8);  
                return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;  
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        };
        this.#guid = this.#guid !== '' ? this.#guid : createGuid();
        return this.#guid;
    }
    constructor() {
        MetaReistry.register(this);
    }
    getObject() {
        return { _guid: this._guid, _type: 'MetaObject' };
    }
    setObject(obj) {
        this.#guid = obj._guid;
    }
}
class MetaElemet extends MetaObject {
    name = '';
    constructor(name) { 
        super(); 
        this.name = name;
    }
    getObject() {
        let obj = super.getObject();
        obj.name = this.name;
        return obj;
    }
    setObject(obj) {
        super.setObject(obj);
        this.name = obj.name;
    }
}
class PropertyCollection extends MetaObject {
    _elem = [];
    _owner = null;
    constructor(owner) { 
        super(); 
        this._owner = owner;
    }
    add(name, value) {
        this._elem.push(name);
        this[name] = new MetaColumn(name);
        // this[name]._entity = this._owner;    // 강제로 관계 제거
        this[name].value = value;
    }
    getObject() {
        let obj = super.getObject();
        obj._type = 'PropertyCollection';
        obj._elem = [];        
        const _this = this;
        this._elem.forEach(v => {
            let obj2 = _this[v].getObject();
            obj2.$key = v;
            obj._elem.push(obj2);
        });
        return obj;
    }
    setObject(obj) {
        super.setObject(obj);
        // 일반적인 등록 방식
        obj._elem.forEach(val => {
            let key = val.$key;
            this.add(key);
            this[key].setObject(val);
        });
        // 객체 복사 방식
        // obj._elem.forEach(val => {
        //     let key = val.$key;
        //     this.add(key);
        //     this[key].setObject(val);
        // });

        // for(let prop in obj.columns) {
        //     this.columns.add(prop);
        //     this.columns[prop].setObject(obj.columns[prop]);
        // }
    }
}
class MetaView extends MetaElemet {
    columns = new PropertyCollection(this);
    _master = null;
    constructor(name) { super(name); }
    getObject() {
        let obj = super.getObject();
        // obj.name = this.name;
        obj._type = 'MetaView';
        obj._master = MetaReistry.createObjectGuid(this._master);
        obj.columns = this.columns.getObject()
        return obj;
    }
    setObject(obj) {
        super.setObject(obj);
        
        // 1. 즉시 등록하는 방식 
        this._master = MetaReistry.find(obj._master);
        // 2. 등록 후 나중에처 처리하는 방식
        // MetaReistry.setRefer(this._master, obj._master);
        
        this.columns.setObject(obj.columns);
        // obj.columns._elem.forEach(val => {
        //     let key = val.$key;
        //     this.columns.add(key);
        //     this.columns[key].setObject(val);
        // });
        // for(let prop in obj.columns) {
        //     this.columns.add(prop);
        //     this.columns[prop].setObject(obj.columns[prop]);
        // }
    }
    /**
     * 대상이름
     * referObject()
     * createObjectGuid() : 생성 + 객체 + GUID
     * referObjectGuid() : 참조 + 객체 + GUID
     */
    referObject() {

    }

    /**
     * 로드는 가져오는 시점을 논리적으로 분리한 것이이다.
     * load 에서는 setObject() >> 처리후 >> referObject
     * @param {*} obj 
     */
    load(obj) {
        this.setObject(obj);

    }
}
class MetaColumn extends MetaElemet {
    _entity = null;
    caption = '';
    value = '';
    constructor(name) {
        super(name);
        this.caption = name + ':캡션';
    }
    getObject() {
        let obj = super.getObject();
        obj._type = 'MetaColumn';
        // obj._entity = {$ref: this._entity._guid }
        obj._entity = MetaReistry.createObjectGuid(this._entity);
        obj.caption = this.caption;
        obj.value = this.value instanceof MetaObject ? this.value.getObject() : this.value;
        return obj;
    }
    setObject(obj, isRef = false) {
        super.setObject(obj);
        // this.name = obj.name;
        this._entity = MetaReistry.find(obj._entity);
        this.caption = obj.caption;
        this.value = obj.value;
    }
}
class MetaReistry {
    static #list = [];
    static get count() { return this.#list.length };
    static get list() { return this.#list };
    static init() {
        this.#list.length = 0;
    }
    static register(meta) {
        if (this.hasMetaClass(meta)) throw new Error('중복 메타 등록 _guid:' + meta._guid); 
        this.#list.push(meta);
    }
    static release(meta) {
        if (!(meta && meta._guid && meta._guid.length > 0)) return;
        for(let i = 0; i < this.#list.length; i++) {
            if (this.#list[i]._guid === meta._guid) {
                this.#list.splice(i, 1);
                return;
            }
        }
    }
    static createObjectGuid(obj) {
        if (obj && obj._guid && obj._guid.length > 0 ) return { $ref: obj._guid };
    }
    static hasMetaClass(meta) {
        for(let i = 0; i < this.#list.length; i++) {
            if (this.#list[i]._guid === meta._guid) return true;
        }
        return false;
    }
    static find(meta) {
        if (!(meta && meta._guid && meta._guid.length > 0)) return;
        for(let i = 0; i < this.#list.length; i++) {
            if (this.#list[i]._guid === meta._guid) return this.#list[i];
        }
        // throw new Error('메타가 없습니다. _guid:' + meta._guid); 
    }
}


// implement
let t1 = new MetaView('T1');
t1.columns.add('c1', 'C1');
t1.columns.add('c2', new MetaElemet('C2'));
t1.columns['c1']._entity = t1;
t1._master = t1.columns['c1'];
// 직렬화
const obj = t1.getObject();
const str = JSON.stringify(obj, null, '\t');
// 초기화 및 복구
MetaReistry.init();
const par = JSON.parse(str);
let t2 = new MetaView();
t2.load(par);
const obj2 = t2.getObject();
const str2 = JSON.stringify(obj2, null, '\t');
// 출력
// console.log('obj => ', obj);
console.log('str => ', str);
// console.log('obj2 => ', obj2);
console.log('str2 => ', str2);
console.log('list2 => ', MetaReistry.list);
//--------------------------------------------
console.log(0);

