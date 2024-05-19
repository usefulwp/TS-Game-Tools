

/**
 * 
 * @param str 解析的数字
 * @param chunkSize 按多少位依次解析
 * @returns  
 */
export function splitString(str:string, chunkSize:number) {
    if(Number.isNaN(parseInt(str))){
        throw new Error('输入的不是正确格式的数字');
    }
    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
        chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
}



