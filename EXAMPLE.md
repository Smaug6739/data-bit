# DataBit Example

## Survey example:

q1 : yes/no  
q2 : yes/no  
q3 : yes/no

```js
const d = [
  { name: "q1", value: true },
  { name: "q2", value: true },
  { name: "q3", value: true },
];
const UserResponses = new DataBit(d);

// User answers questions
/*
Q1 : Yes
Q2 : No
Q3 : Yes
*/
//So we will add Q1 and Q3 to the data manager (UserResponses) :
UserResponses.add(["q1", "q3"]);

// Retrieve a number with all this data :
const responcesNumber = UserResponses.dataBit;

// Host responcesNumber in database.
```

### Retrieve responses with the number again

```js
const d = [
{name:'q1', value : true},
{name:'q2', value : true},
{name:'q3', value : true},
]
const responcesNumber = findInDatabase(...);
const UserResponses = new DataBit(d, responcesNumber)

// Get responces :
const responcesOfUser = UserResponces.comparedData()

// return an array with object {name:string, value:any, has:boolean}

```

## Other example

- A role system for member
- A permission system [see dedicate repo](https://github.com/Smaug6739/permissions)
- A database system
- Coded message system
