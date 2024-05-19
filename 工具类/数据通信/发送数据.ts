import { encryptMap } from "./数据协议";


export function sendData(str:string,key:number){
    let byteArr:Uint8Array=new Uint8Array(str.length);
    for(let i=0;i<str.length;i++){
        
        const byte=encryptMap.get(str[i])!^key;
        byteArr.set([byte!],i);
    }
    //console.log(byteArr);
    return byteArr;
}
    

