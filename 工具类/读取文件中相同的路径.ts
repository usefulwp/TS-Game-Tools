import fs from 'fs'

function extractSamePath(inTxtPath:string,outTxtPath:string){
    const conent=fs.readFileSync(inTxtPath).toString();
    const paths=conent.split('\n');
    const newPaths:string[]=[];
    
    for (const iterator of paths) {
        newPaths.push(iterator.trim());
    }
    
    const map=new Map<string,number>();
    for (const path of newPaths) {
        if(map.has(path)){
            map.set(path,map.get(path)!+1);
        }else{  
            map.set(path,1);
        }
    }
    let result:string[]=[];
    for (const [path,cnt] of map) {
        if(cnt>1){
            result.push(path);
        }
    }
    fs.writeFileSync(outTxtPath,result.join('\n'));
}


extractSamePath('./工具类/test.txt', './工具类/output.txt')