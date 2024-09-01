let book = {
    name:"book",
    price:100,
};

let book1 = {
    name:"book1",
    price:300,

}
let book2 = {
    name:"book1",
    price:200,

}
let book3 = {
    name:"book1",
    price:500,

}
let book4 = {
    name:"book1",
    price:600,

}
let book5 = {
    name:"book1",
    price:900,

}


for(let i = 0; i < book.length; i++);
   if (i < 0){
    book[i].price *= 0.9;
   } else{
    book[i].price *= 0.8;
}


for(let i = 0; i < book.length; i++);{
    console.log(books[i].name + ": $" + book[i].price);
};
