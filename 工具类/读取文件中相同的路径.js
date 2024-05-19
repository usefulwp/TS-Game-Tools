"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function extractSamePath(inTxtPath, outTxtPath) {
    const conent = fs_1.default.readFileSync(inTxtPath).toString();
    const paths = conent.split('\n');
    const newPaths = [];
    for (const iterator of paths) {
        newPaths.push(iterator.trim());
    }
    const map = new Map();
    for (const path of newPaths) {
        if (map.has(path)) {
            map.set(path, map.get(path) + 1);
        }
        else {
            map.set(path, 1);
        }
    }
    let result = [];
    for (const [path, cnt] of map) {
        if (cnt > 1) {
            result.push(path);
        }
    }
    fs_1.default.writeFileSync(outTxtPath, result.join('\n'));
}
extractSamePath('./工具类/test.txt', './工具类/output.txt');
