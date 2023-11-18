const dogNames = require('dog-names');
console.table(dogNames.all);
for(i=0;i<10;i++){
console.log(dogNames.femaleRandom());
}