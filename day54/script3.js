let user = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    location: "New York",
    profession: "Software Engineer",
    hobbies: ["Reading", "Hiking", "Photography"],
    additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
};


console.log("Personal Information:");
console.log("Name: " + user.firstName + " " + user.lastName);
console.log("Age: " + user.age);
console.log("Location: " + user.location);
console.log("Profession: " + user.profession);
console.log("Hobbies: " + user.hobbies.join(", "));
console.log("Additional Info: " + user.additionalInfo);
    