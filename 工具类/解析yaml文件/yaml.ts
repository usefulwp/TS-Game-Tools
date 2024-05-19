import * as yaml from 'js-yaml'
import * as fs from 'fs'
// 读取YAML文件
const yamlData = fs.readFileSync('./工具类/解析yaml文件/test.yaml', 'utf8');
// 解析YAML
const yamlObject = yaml.load(yamlData);
console.log(yaml.dump(yamlObject));