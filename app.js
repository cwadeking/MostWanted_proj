"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTraits(people);// TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt(`Found ${person.firstName} ${person.lastName}. Do you want to know their 'info', 'family',\nor 'descendants'? Type the option you want or 'restart' or 'quit'`);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    findFamilyMembersOfFoundPerson(person,people)
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function displayInformation(person){
alert("ID: " + person[0].id + "\n" + "First Name: " + person[0].firstName + "\n" + " Last Name: " +  person[0].lastName + "\n" + "Gender: " + person[0].gender + "\n" + "DOB: " + person[0].dob + "\n" + "Height: " + person[0].height + "\n" + "Weight:" + person[0].weight + "\n" + "Eye Color:" + person[0].eyecolor + "\n" + "Occupation:" + person[0].occupation) 

}


function searchByTraits(people){
  let userTraitInput = prompt("For eye color, enter: 1"+"\n" + "For gender, enter: 2"+"\n" + "For DOB, enter: 3"+"\n" + "For height, please enter: 4"+"\n" + "For weight, enter: 5");
  switch(userTraitInput)
  {
      case "1":
          let eyeColorChoice = prompt("Enter eye color below:");
          let eyeColor = "eyeColor";
          let eyeColorChoiceSearch = searchBySingleTrait(eyeColorChoice,people, eyeColor);
          break;
      case "2":
        let genderChoice = prompt("Enter male or female below:")
        let gender = "gender"; 
         let genderChoiceSearch = searchBySingleTrait(genderChoice,people,gender);
          break;
      case "3":
        let dOBChoice = prompt("Enter date of birth below:" + "\n" + "* mm/dd/yyyy");
        let dob = "dob";
        let dOBChoiceSearch = searchBySingleTrait(dOBChoice,people,dob);
          break;
      case "4":
        let heightChoice = prompt("Enter height below: " + "\n" + "* in inches:");
        let height = "height";
        let heightChoiceSearch = searchBySingleTrait(heightChoice,people,height);
          break;
      case "5":
        let weightChoice = prompt("Enter weight below: " + "\n" + "* in pounds:");
        let weight = "weight";
        let weightChoiceSearch = searchBySingleTrait(weightChoice,people,weight);
          break;
      default:
          
  }
}

//goes through array of data and puts together a new array based on criteria
  function searchBySingleTrait(userTraitInput, people, singleTrait ){
    let foundTraits = people.filter(function(person){  
      
      if(person[`${singleTrait}`] === userTraitInput){
      
        return true;
      }
      else{
       
        return false;
        
      }
    })
    
    return foundTraits, displayTraitPeople(foundTraits);
    
}

//fuction which will alert people found by traita 
function displayTraitPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName + "\n" + "Gender: " + person.gender + "\n" + "DOB: " + person.dob + "\n" + "Height: " + person.height + "\n" + "Weight:" + person.weight + "\n" + "Eye Color:" + person.eyecolor + "\n" + "Occupation:" + person.occupation + "\n" + "\n"
  }).join("\n" + ""));
}





function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

function findFamilyMembersOfFoundPerson(person, people){
  let familyMembers;
  //one person
  let spouse = findSpouseOfPerson(person, people);
  //multiple possible people
  let parents = findParentsOfPerson(person, people);
  //find siblings
//found person is returning as a sibling too.  Once the array comes back, need to remove found person.
  let siblings = findSiblingsOfPerson(parents, people);
}

function findSiblingsOfPerson(parents, people, person){
  let siblings = people.filter(function (el){
    if(el.parents.includes(parents.id)){
      return true;
    }
    else{
      return false;
    }
  })
  if(siblings.includes(person)){
    siblings.findIndex().splice();
  }
  
}  
  
//   if(parents.length == 0){
//     return siblings;
//   }

//   else if(parents.length >= 1){ 
//     siblings = people.filter(function (el){
//       if(el.parents.length == 0){
//         return false;
//       }
//       else if(el.parents.length == 1 && parents.length == 1){
//         if(el.parents[0] === parents[0].id){
//           return true;
//         }
//         else{
//           return false;
//         }
//       }
//       else if(el.parents.length == 2 && parents.length == 1){
//         if(el.parents[0] === parents[0].id || el.parents[1] === parents[0].id){
//           return true;
//         }
//         else{
//           return false;
//         }
//       }
//       else if(el.parents.length == 1 && parents.length == 2){
//         if(el.parents[0] === parents[0].id || el.parents[0] === parents[1].id){
//           return true;
//         }
//         else{
//           return false;
//         }
//       }  
//       else if(el.parents.length == 2 && parents.length == 2){
//         if(el.parents[0] === parents[0].id || el.parents[0] === parents[1].id || el.parents[1] === parents[0].id || el.parents[1] === parents[1].id){
//             return true;
//           }
//           else{
//             return false;
//           }
//       }
//     })
//   }   
//   return siblings;
// }
function findParentsOfPerson(person, people){
  let parents = people.filter(function (el){
    if(person.parents[0] === el.id || person.parents[1] === el.id){
      return true;
    }
    else{
      return false;
    }
  })
  return parents;
}

function findSpouseOfPerson(person,people){
let spouse = people.filter(function (el){
  if(person.currentSpouse === el.id){
    return true;
  }
  else{
    return false;
  }
})
return spouse[0];
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo = "Height: " + person.height + "\n";
  personInfo = "Weight: " + person.weight + "\n";
  personInfo = "Age: " + person.age + "\n";
  personInfo = "Occupation: " + person.occupation + "\n";
  personInfo = "Eye Color: " + person.eyecolor + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
