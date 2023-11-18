const catNames = require('cat-names');

console.table(catNames.all);
for(i=0;i<10;i++){
console.log(catNames.random());
}
