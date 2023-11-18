class car{
    constructor(name,year){
      this.name=name;
      this.year=year;
   }
   print(){
    console.log(this.name+this.year)
   }

}

 let mycar1=new car("ford", 2014);
 let mycar2=new car("audi", 2019);
 //console.log(mycar1.name + mycar1.year)
 //console.log(mycar2.name + mycar2.year)
 mycar1.print()
 mycar2.print()