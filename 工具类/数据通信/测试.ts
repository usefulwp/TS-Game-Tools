import { sendData } from "./发送数据";
import { receiveData } from "./接受数据";

const data=sendData('你好呀，数据通信协议',0b10)  ;
const extraStr=receiveData(data,0b11) ;

console.log('发送的数据：',data);
console.log(`\n`);
console.log(`接受的数据： ${extraStr}`);