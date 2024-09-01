let members = [
    { name: "John", age: 35 },
    { name: "Jane", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 40 }
];


for (let i = 0; i < members.length; i++) {
    var currentAge = members[i].age;
    var yearsAfter25 = currentAge - 25;
    console.log(members[i].name + " will be " + yearsAfter25 + " years after 25 years.");
}
