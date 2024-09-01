let carInfo = {
    Brand: "mercedes",
    model: "c-class",
    year: "2122",
    color: "mamapapuri witeli",
    engine: "",

    displayInfo: function() {
        console.log("Car Information:");
        console.log("Brand: " + this.Brand);
        console.log("Model: " + this.model);
        console.log("Year: " + this.year);
        console.log("Color: " + this.color);
        console.log("Engine: " + this.engine);
    }
};


carInfo.Brand = "Toyota";
carInfo.model = "Camry";
carInfo.year = 2020;
carInfo.color = "Black";
carInfo.engine = "V6";

carInfo.displayInfo();
