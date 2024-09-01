const me = {
    name: "mate",
    surname: "beridze",
    age: 15,
    
    getName: function(){
        return me.name
    }
}



const you = {
    name: "Luka",
    surname: "Tskhvaradze",
    age: 17,
    
    getName: function(){
        return me.name
    }
}



console.log(me.getName())
console.log(you.getName())