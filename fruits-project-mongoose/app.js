const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB2",{ useNewUrlParser:true});
const fruitSchema=new mongoose.Schema({
    name:String,
    rating:Number,
    review:String
});
const Fruit=mongoose.model("Fruit",fruitSchema);
const fruit=new Fruit({
    name:"apple",
    rating:7,
    review:"pretty solid as a fruit."
});
const kiwi=new Fruit({
    name:"kiwi",
    rating:10,
    review:"the best fruit"
});
const orange=new Fruit({
    name:"orange",
    rating:8,
    review:"to sour"
});
const banana=new Fruit({
    name:"banana",
    rating:15,
    review:"weired TEXTURE"
});
const arr=[kiwi,orange,banana]
Fruit.insertMany(arr)
.then(function(){
    console.log("successfully saved default items to DB");
})
.catch(function(err){
    crossOriginIsolated.log(err);
});
///fruit.save();
const personSchema=new mongoose.Schema({
    name:String,
    age:Number
});
const Person=mongoose.model("Person",personSchema);
const person=new Person({
    name:"john",
     age:37
});
person.save();

