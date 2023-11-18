var myLogModule = require('./log');


myLogModule.info('node.js started');
myLogModule.warning('node.js started');
myLogModule.error('node.js started');



var msg = require('./message.js');
console.log(msg);

var msg = require('./log1');
msg.log('Hello World');

var person=require('./data.js');
console.log(person.firstName+''+person.lastName);    


var person=require('./person.js');
var person1=new person('james', 'bond');
console.log(person1.fullName())
