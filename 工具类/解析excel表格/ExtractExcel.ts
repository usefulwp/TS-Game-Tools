import * as xlsx from 'xlsx'
import * as fs from 'fs'
class ExtractExcel {
    createExcelClass(inputPath:string){
       const workbook= xlsx.readFile(inputPath);
       const sheetName=workbook.SheetNames[0];
       const sheet=workbook.Sheets[sheetName];
       const sheetInfo=xlsx.utils.sheet_to_json(sheet);
       this.genateTsClass(sheetInfo,sheetName,`工具类/解析excel表格/excel生成的类/`);
    }

    private getDefaultValue<T>(value: T):T{
        if ( value === "number") {
            return 0 as T;
        } else if ( value === "boolean") {
            return false as T;
        } else if ( value === "string") {
            return "" as T;
        }  else if ( value === "object" && value !== null) {
            return {} as T;
        } else {
            return null as T;
        }
    }

    private genateTsClass(sheetInfo:any,className:string,outDir:string){
        const desc=sheetInfo[0];
        const classInfo=sheetInfo[1];
        const outPath=outDir+className+'.ts';
        let targetStr:string='';
        targetStr+=`class ${className} {\n`;
        let keys:Map<string,string>=new Map();
        let i=0;
        for (const key in classInfo) {
            targetStr+=`\t//${desc[key]}\n`;
            targetStr+=`\t${key} : ${typeof classInfo[key]};\n`;
            keys.set(key,typeof classInfo[key]);
        }
        targetStr+=`\tconstructor(`;
        for (const [key,value] of keys) {
            targetStr+=`${key} : ${value} , `;
        }
        targetStr+='){\n'
        for (const [key,value] of keys) {
            targetStr+=`\t      this.${key} = ${typeof this.getDefaultValue(value)==='string'?`' '`:this.getDefaultValue(value)} ;\n`;
        }
        targetStr+='\t}\n';
        targetStr+='}';
        fs.writeFileSync(outPath,targetStr);
    }

}

const extractExcel=new ExtractExcel();
extractExcel.createExcelClass('./工具类/解析excel表格/test.xlsx');