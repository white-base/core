
var MYAPP = MYAPP || {};

var registerNamespace = function (p_target, p_ns) {
	var parent = p_target;
	var sections, i;

    if (typeof p_ns === 'string') sections = p_ns.split('.');
    else if (Array.isArray(p_ns)) sections = p_ns;

	// 최상위 예약어 제거
    if (sections[0] === 'NS' || sections[0] == 'ns') {
        sections = sections.slice(1);
    }

	for (i = 0; i < sections.length; i+=1) {
		if (typeof parent[sections[i]] === "undefined") {
			parent[sections[i]] = {};
		}
		parent = parent[sections[i]];
	}
};

var setNamespace = function(p_target, p_ns, p_value) {
    var parent = p_target;
    var sections;	

    registerNamespace(p_target, p_ns);

    if (typeof p_ns === 'string') sections = p_ns.split('.');
    else if (Array.isArray(p_ns)) sections = p_ns;

    for (var i = 0; i < sections.length; i+=1) {
		if (typeof parent[sections[i]] === "undefined") {
			parent[sections[i]] = {};
		}
        if (i === sections.length - 1) parent[sections[i]] = p_value;
        else parent = parent[sections[i]];
	}
}

var getNamespace = function(p_target, p_ns) {
    var parent = p_target;
    var sections;

    if (typeof p_ns === 'string') sections = p_ns.split('.');
    else if (Array.isArray(p_ns)) sections = p_ns;

    for (var i = 0; i < sections.length; i+=1) {
        if (i === sections.length - 1) return parent[sections[i]];
        else parent = parent[sections[i]];
	}
}

function Meta(){}

//------------------


registerNamespace(MYAPP, 'aa.bb.cc');
registerNamespace(MYAPP, 'aa.b1');
registerNamespace(MYAPP, ['aa', 'b2']);
registerNamespace(MYAPP, ['ns', 'b2']);

setNamespace(MYAPP, 'aa.b1.Meta', Meta);

var s = getNamespace(MYAPP, 'aa.b1.Meta');

console.log(0);


