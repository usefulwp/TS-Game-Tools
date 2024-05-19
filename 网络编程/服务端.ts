
function PrintbyteToBit(num:number,bits:number){
    let str:string='';
    let stack:number[]=[];
    for(let i=0;i<bits;i++){
        const bit=(num&(1<<i))!==0?1:0;
        stack.push(bit);
    }
    const target:number[]=[];
    for(let i=stack.length-1;i>=0;i--){
        target[stack.length-1-i]=stack[i];
    }
    console.log(target.toString().split(',').join(''));
}

function printTo8Base(num:number){
    let str:string='';
    const map=new Map<number,string>([
        [8,'a']
    ]);
    let remainder:number;
    let stack:number[]=[];
    while(num>16){
        remainder=num%16;
        stack.push(remainder);
        num%=16;
    }
    if(num!=0)
        stack.push(num!);
    for(let i=stack.length-1;i>=0;i--){
        const target=stack[i]>=10?map.get(stack[i]):stack[i];
        str+=target;
    }
}

function printTo16Base(num:number){
    let str:string='';
    const map=new Map<number,string>([
        [10,'a'],[11,'b'],[12,'c'],[13,'d'],[14,'e'],[15,'f']
    ]);
    let remainder:number;
    let stack:number[]=[];
    while(num>16){
        remainder=num%16;
        stack.push(remainder);
        num%=16;
    }
    if(num!=0)
        stack.push(num!);
    for(let i=stack.length-1;i>=0;i--){
        const target=stack[i]>=10?map.get(stack[i]):stack[i];
        str+=target;
    }
    console.log(str);
}

PrintbyteToBit(255,32)
printTo8Base(255)
printTo16Base(255)