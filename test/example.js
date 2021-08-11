const { DataBits } = require('../lib/index.js')
const d = ["q1", "q2", "q3"];
const UserResponses = new DataBits(d);

// User answers questions
/*
Q1 : Yes
Q2 : No
Q3 : Yes
*/
//So we will add Q1 and Q3 to the data manager (UserResponses) :
UserResponses.add(["q1", "q3"]);

// Retrieve a number with all this data :
const responcesNumber = UserResponses.value;
console.log(`The user bits : ` + responcesNumber);
// Host responcesNumber in database.





const UserResponses2 = new DataBit(d, responcesNumber)

// Get responces :
const responcesOfUser = UserResponses2.toString()

console.log(responcesOfUser);
// return an array with object {name:string, value:any, has:boolean}
console.log(UserResponses2.equals(['q1', 'q3']));