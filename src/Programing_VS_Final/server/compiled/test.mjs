function fibSQ(n){
    let n1 = 2; //first value
    let n2 = 1; //second value
    let val; // total

    if(n === 0) {return n1;}
    if(n === 1) {return n2;}
    
    for(let i = 1; i < n; i++){
        val = n1 + n2;
        n1 = n2;
        n2 = val;
    }

    return val;
}