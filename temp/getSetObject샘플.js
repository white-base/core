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
    // set _guid(val) { this.#guid = val }
    get _type() { return 'MetaObject' };
    constructor() {
        MetaReistry.register(this);
        console.log('register()=>'+ this._type);

    }
    getObject() {
        return { _guid: this._guid, _type: this._type };
    }
    setObject(obj) {
        this.#guid = obj._guid;
        // console.log('setObject()=>'+ this._type);
    }
}
class MetaElemet extends MetaObject {
    name = '';
    get _type() { return 'MetaElemet' };
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

class MetaColumn extends MetaElemet {
    _entity = null;
    caption = '';
    value = '';
    get _type() { return 'MetaColumn' };
    constructor(name) {
        super(name);
        this.caption = name + ':캡션';
    }
    getObject() {
        let obj = super.getObject();
        // obj._type = 'MetaColumn';
        // obj._entity = {$ref: this._entity._guid }
        obj._entity = MetaReistry.createReferObject(this._entity);
        obj.caption = this.caption;
        obj.value = this.value instanceof MetaObject ? this.value.getObject() : this.value;
        return obj;
    }
    setObject(obj, isRef = false) {
        super.setObject(obj, isRef);
        this.caption = obj.caption;
        this.value = obj.value;
        // this._entity = MetaReistry.find(obj._entity);
        this._entity = obj._entity;

        // 1.isRef 방식
        // if (isRef) {
        //     this.caption = obj.caption;
        //     this.value = obj.value;
        // } else {
        //     this._entity = MetaReistry.find(obj._entity);
        // }

        // 2. static setter 방식
        // MetaReistry.setReference(this._entity, obj._entity);


        // this.name = obj.name;
        // this.value = obj.value instanceof MetaObject ? this.value.setObject() : this.value;
        // if ()
    }
    // 3. 파라메터 콜백 방식
    _setObject(obj, func) {
    }
}
class PropertyCollection extends MetaObject {
    _elem = [];
    _owner = null;
    get _type() { return 'PropertyCollection' };
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
    get _type() { return 'MetaView' };
    constructor(name) { super(name); }
    getObject(getOpt) {
        let obj = super.getObject();
        // obj.name = this.name;
        obj._master = MetaReistry.createReferObject(this._master);
        obj.columns = this.columns.getObject()
        return obj;
    }
    setObject(obj) {
        super.setObject(obj);
        
        // 1. 즉시 등록하는 방식 
        // this._master = MetaReistry.find(obj._master);
        this._master = obj._master;
        // 2. 등록 후 나중에처 처리하는 방식
        // MetaReistry.setRefer(this._master, obj._master);
        // 3. 변환후 바로 사용하는 방식
        // this._master = obj._master;

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
     * createReferObject() : 생성 + 객체 + GUID
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
        // POINT:
        let tObj = MetaReistry.transformRefer(obj);
        this.setObject(tObj);
        
        // this.setObject(obj);
    }
    _load(obj) {
        function createObject(obj, target) {
            if (typeof obj !== 'object') throw new Error('object 가 아닙니다.');
            if (obj._guid && obj._type) return createMetaObject(obj, target);
            else if (obj.$ref) return createMetaObject(obj, target);
            else throw new Error('object 규칙이 어긋났습니다.');
        }

        function createMetaObject(obj, target) {
            // target['_guid'] = obj['_guid']; // setter 필요함
            // if (target['_type'] !== obj['_type']) throw new Error('object _type 이 다릅니다.');
            
            for(let prop in obj) {
                // 검사
                if (prop === '_type' && obj['_type'] !== target['_type']) throw new Error('object _type 이 다릅니다.');
                // 객체 설정
                if (typeof obj[prop] === 'object') createObject(obj[prop], target[prop]);
                else if (prop === '_elem' && Array.isArray(obj[prop])) createCollectionObject(obj, target);
                else target[prop] = obj[prop];
            }
        }
        function createRefObject(obj, target) {
        }
        function createCollectionObject(owner, target) {
            // if (obj['$key']) // 
        }
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
    static createReferObject(obj) {
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
    /**
     * 매타객체 검사
     * @param {*} obj
     * @return {boolean} 
     */
    static validMetaObject(obj) {
    }
    static setReference() {
    }
    /**
     * 메타객체의 참조 변환
     * @param {*} mObj 
     */
    static transformRefer(mObj) {
        var idList = [];
        // 객체 검사 => TODO: 전처리 검사 수행
        // if (typeof obj !== 'object') throw new Error('object 가 아닙니다.');
        extractObject(mObj);
        linkReference(mObj);
        
        return mObj;

        // 객체 추출
        function extractObject(obj) {
            if (obj['_guid'] && typeof obj['_guid'] === 'string') idList.push(obj);
            for(let prop in obj) {
                if (typeof obj[prop] === 'object') extractObject(obj[prop]);
                else if (Array.isArray(obj[prop])){
                  for(var i = 0; i < obj[prop].length; i++) {
                    if (typeof obj[prop][i] === 'object') extractObject(obj[prop][i]);
                  }  
                } 
            }
        }
        function linkReference(obj) {
            for(let prop in obj) {
                if (typeof obj[prop] === 'object') {
                    if (obj[prop]['$ref']) {
                        obj[prop] = findGuid(obj[prop]['$ref']);
                        if (typeof obj[prop] !== 'object') throw new Error('참조 연결 실패 $ref:' + obj['$ref']);
                    } else linkReference(obj[prop]);
                } else if (Array.isArray(obj[prop])){
                  for(var i = 0; i < obj[prop].length; i++) {
                    if (typeof obj[prop][i] === 'object') linkReference(obj[prop][i]);
                  }  
                } 
            }
        }
        function findGuid(guid) {
            for(var i = 0; i < idList.length; i++) {
                if (idList[i]['_guid'] === guid) return idList[i];
            }
        }
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
console.log('----');

MetaReistry.init();
const par = JSON.parse(str);
let t2 = new MetaView();
t2.load(par);
const obj2 = t2.getObject();
const obj3 = MetaReistry.transformRefer(obj);
const str2 = JSON.stringify(obj2, null, '\t');
// const str3 = JSON.stringify(obj3, null, '\t');


// 출력
// console.log('obj => ', obj);
console.log('str => ', str);
// console.log('obj2 => ', obj2);
console.log('str2 => ', str2);
// console.log('str3 => ', str3);
// console.log('list2 => ', MetaReistry.list);
//--------------------------------------------
console.log(0);

