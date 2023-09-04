var rObj = {
    _guid: "b6c7067e-5006-8526-0db0-89d6192b8c89",
    _type: "MetaTable",
    name: "TT1",
    metaSet: undefined,
    columns: {
      _guid: "f9fa8ed2-9904-f662-56fb-3e6c688c114e",
      _type: "MetaTableColumnCollection",
      _owner: [Circular],
      _elemTypes: [
      ],
      _elem: [
        {
          _guid: "e237c66d-6bc1-15bf-a626-0e5fdacc3c2e",
          _type: "MetaColumn",
          name: "i1",
          _entity: [Circular],
          caption: "C1",
        },
        {
          _guid: "d3261f5f-1a2e-da27-b264-6af631dea933",
          _type: "MetaColumn",
          name: "i2",
          _entity: [Circular],
          caption: "C2",
        },
      ],
      _key: [
        "i1",
        "i2",
      ],
    },
    rows: {
      _guid: "792aecdb-ab84-1397-c137-f82751f43a76",
      _type: "MetaRowCollection",
      _owner: [Circular],
      _elemTypes: [
        function MetaRow(p_entity) {
          _super.call(this);
          var __element = [];
          var _this = this;
          var _event = new Observer(this);
          var _entity = null;
          // var _transQueue = new TransactionQueue(this);
          
          // MetaEntity 등록 & order(순서) 값 계산
          if (!(p_entity instanceof MetaObject && p_entity.instanceOf('MetaEntity'))) {
            throw new Error('Only [p_entity] type "MetaEntity" can be added');
          }
          
          /** 
           * 이벤트 객체
           * @protected 
           * @member {Object} _L.Meta.Entity.MetaRow#_event  
           */
          Object.defineProperty(this, '_event', {
            get: function () {
              return _event;
            },
            enumerable: false,
            configurable: false
          });
          
          /**
           * 로우의 소유 엔티티
           * @member {MetaEntity} _L.Meta.Entity.MetaRow#_entity
           */
          Object.defineProperty(this, '_entity', {
            get: function () {
              return _entity;
            },
            set: function (newValue) {
              // REVIEW: MetaRow 에서 entity는 존재할 경우 설정할 수 없다.
              // TODO:: 자료종류를 검사해야함
              if (newValue && !(newValue instanceof MetaObject && newValue.instanceOf('MetaEntity'))) {
                throw new Error('Only [_entity] type "MetaEntity" can be added'); // COVER:
              }
          
              _entity = newValue;
            },
            configurable: false,
            enumerable: true
          });
          
          /**
           * 컬랙션 갯수 
           * @member {Number} _L.Entity.MetaRow#count 
           */
          Object.defineProperty(this, 'count', {
            get: function () {
              return __element.length;
            },
            configurable: false,
            enumerable: false
          });
          
          /**
           * 컬렉션 목록 
           * @member {Array}  _L.Entity.MetaRow#list  
           */
          Object.defineProperty(this, 'list', {
            enumerable: false,
            configurable: true,
            get: function () {
              return __element;
            }
          });
          
          /**
           * 변경전 이벤트 
           * @event _L.Meta.Entity.MetaRow#onChanged 
           */
          Object.defineProperty(this, 'onChanging', {
            set: function (p_fn) {
              this._event.subscribe(p_fn, 'onChanging');
            },
            enumerable: true,
            configurable: true
          });
          
          /**
           * 변경후 이벤트 
           * @event _L.Meta.Entity.MetaRow#onChanged 
           */
          Object.defineProperty(this, 'onChanged', {
            set: function (p_fn) {
              this._event.subscribe(p_fn, 'onChanged');
            },
            enumerable: true,
            configurable: true
          });
          
          // 설정
          if (p_entity) {
            this._entity = p_entity;
            for (var i = 0; i < _entity.columns.count; i++) {
              var idx = __element.length;
              var alias = _entity.columns[i].alias;
              __element.push(_entity.columns[i].default); // 기본값 등록
              Object.defineProperty(this, [i], getPropDescriptor(idx));
              Object.defineProperty(this, alias, getPropDescriptor(idx));
            }
          }
          function getPropDescriptor(p_idx) {
            return {
              get: function () {
                return __element[p_idx];
              },
              set: function (newValue) {
                var oldValue = __element[p_idx];
                // 트렌젹션 처리 => 함수로 추출 검토
                if (this._entity && !this._entity.rows.autoChanges) {
                  var etc = 'idx:' + p_idx + ', new:' + newValue + ', old:' + oldValue;
                  var pos = this._entity.rows.indexOf(this);
                  if (pos > -1) {
                    // 컬력션에 포힘됬을때만
                    this._entity.rows._transQueue.update(pos, this, this.clone(), etc); // 변경시점에 큐를 추가함
                  }
                }
                // 이벤트 및 처리
                _this._onChanging(p_idx, newValue, oldValue);
                __element[p_idx] = newValue;
                _this._onChanged(p_idx, newValue, oldValue);
              },
              enumerable: false,
              configurable: false
            };
          }
          Util.implements(this, IBaseCollection);
        },
      ],
      _elem: [
        {
          _guid: "f1de14e4-8966-7e92-5fec-6e4ebeb9ced0",
          _type: "MetaRow",
          _entity: [Circular],
          _elem: [
            "R1",
            "R2",
          ],
        },
        {
          _guid: "fcb6a23b-523a-2a20-680b-9d8dd8c617c5",
          _type: "MetaRow",
          _entity: [Circular],
          _elem: [
            "R10",
            "R20",
          ],
        },
        {
          _guid: "10aee940-b66f-6cfc-ae25-0a11f33f59d6",
          _type: "MetaRow",
          _entity: [Circular],
          _elem: [
            "R100",
            "R200",
          ],
        },
      ],
      autoChanges: true,
    },
    tableName: "TT1",
  }