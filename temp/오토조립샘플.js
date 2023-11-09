

var Auto1;
var Auto2;
var Auto3;

function Auto(){
    
    var a1 = new Auto1();
    var a2 = new Auto2();
    var a3 = new Auto3();
    
    a1.title = '제막'
    a1.model = 100;
    this.mod(a1);

    a2.title = '목록';
    a2.prop.view = a1.view;
    
    a3.caption = '설명';
    a3.datasource = source;
    

}