const superheroes = require('superheroes');
 
console.table(superheroes.all);
for(i=0;i<10;i++){
console.log(superheroes.random());
}