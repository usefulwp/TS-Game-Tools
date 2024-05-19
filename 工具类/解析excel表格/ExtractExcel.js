"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = __importStar(require("xlsx"));
const fs = __importStar(require("fs"));
class ExtractExcel {
    createExcelClass(inputPath) {
        const workbook = xlsx.readFile(inputPath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetInfo = xlsx.utils.sheet_to_json(sheet);
        this.genateTsClass(sheetInfo, sheetName, `工具类/解析excel表格/excel生成的类/`);
    }
    getDefaultValue(value) {
        if (value === "number") {
            return 0;
        }
        else if (value === "boolean") {
            return false;
        }
        else if (value === "string") {
            return "";
        }
        else if (value === "object" && value !== null) {
            return {};
        }
        else {
            return null;
        }
    }
    genateTsClass(sheetInfo, className, outDir) {
        const desc = sheetInfo[0];
        const classInfo = sheetInfo[1];
        const outPath = outDir + className + '.ts';
        let targetStr = '';
        targetStr += `class ${className} {\n`;
        let keys = new Map();
        let i = 0;
        for (const key in classInfo) {
            targetStr += `\t//${desc[key]}\n`;
            targetStr += `\t${key} : ${typeof classInfo[key]};\n`;
            keys.set(key, typeof classInfo[key]);
        }
        targetStr += `\tconstructor(`;
        for (const [key, value] of keys) {
            targetStr += `${key} : ${value} , `;
        }
        targetStr += '){\n';
        for (const [key, value] of keys) {
            targetStr += `\t      this.${key} = ${typeof this.getDefaultValue(value) === 'string' ? `' '` : this.getDefaultValue(value)} ;\n`;
        }
        targetStr += '\t}\n';
        targetStr += '}';
        fs.writeFileSync(outPath, targetStr);
    }
}
const extractExcel = new ExtractExcel();
extractExcel.createExcelClass('./工具类/解析excel表格/test.xlsx');
