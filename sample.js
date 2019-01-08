/**
 * Created by S0061376 on 28/06/16.
 */

function matrix(){
    var temp=[[],[]];
    for(var i=0; i<2;i++){
        for(var j=0; j<2; j++){
        temp[[i][j]]=prompt("enter value");
        }
    }
    return temp;
}
var m=matrix();
var n=matrix();

sumMatrix = function (m,n) {
    var sum =[[],[]];
    for(var i=0; i<m;i++){
        for(var j=0; j<n; j++){
            sum[[i][j]]=parseInt(m[[i][j]])+parseInt(n[i][j]);
        }
    }
 return sum;

}
var s = sumMatrix(m,n);
console.log(s);
