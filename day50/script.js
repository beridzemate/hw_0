//pirveli

function infoJoin(firstName, lastName, age, residence, hobby) {
    return `My name is ${firstName} ${lastName}. I am ${age} years old and I live in ${residence}. My hobby is ${hobby}.`;
  }
  

  const firstName = "John";
  const lastName = "Doe";
  const age = 30;
  const residence = "New York";
  const hobby = "playing guitar";
  
  const info = infoJoin(firstName, lastName, age, residence, hobby);
  console.log(info);


  //meore
  function ageCheck(age) {
    if (age > 18) {
      console.log("The age is greater than 18.");
    } else if (age < 18) {
      console.log("The age is less than 18.");
    } else {
      console.log("The age is equal to 18.");
    }
  }
  
  
  ageCheck(20); 
  ageCheck(15); 
  ageCheck(18); 
  

  //mesame davaleba html-shia

  