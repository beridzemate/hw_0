let mainObject = {
    object1: {
        name: "Object 1",
        property1: "Value 1",
        property2: "Value 2"
    },
    object2: {
        name: "Object 2",
        property1: "Value 3",
        property2: "Value 4"
    }
};


mainObject.object1.property1 = "New Value 1";
mainObject.object2.property2 = "New Value 4";


console.log(mainObject.object1);
console.log(mainObject.object2);
