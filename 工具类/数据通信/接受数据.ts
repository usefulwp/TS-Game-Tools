import { decryptMap } from "./数据协议";

export function receiveData(uintArr:Uint8Array,key:number){
    
    let  extractStr:string=''
    uintArr.forEach(v=>{
        
        const str=decryptMap.get(v^key);
        if(!str){
            throw new Error(`数据解析出错，请输入正确的 key`)
        }
        extractStr+=str;
    })
    return extractStr;
}

