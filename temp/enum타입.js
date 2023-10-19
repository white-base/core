

function enumOpt() {
    var prop = {
        opt1: 1,
    };

    return prop;
}
enumOpt._KIND = 'enum';



function enumOpt2() {
    return {
        opt1: 1,
        opt2: 'A'
    };
}
enumOpt2._KIND = 'enum';



class IUser {
    oType = enumOpt;    // 

}

