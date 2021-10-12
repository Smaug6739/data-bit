# Data-bits

This project is a module for converting a structured dataset into a number that can be stored in a database taking up little space.

## Getting started

### Installation

With npm :

```sh-session
npm install data-bits
```

With yarn

```js
yarn add data-bits
```

## Usage

### Import the module

CommonJS syntax

```js
const { DataBits } = require("data-bits");
```

With ES modules syntax :

```js
import { DataBits } from "data-bits";
```

Create a new instance of class DataBits with an array of data (string) and the bits of user (number) (optional).

```js
const DataManager = new DataBits(["FLAG_1", "FLAG_2", "FLAG_3"]);
```

## DataBits.default

Return the default manager bits as a integer.

Type : Number

## DataBits.MAX

Return the max bit as a string (an addition of the value of each flag).

Type : String

## DataBits.bits

Returns the bits of the collection (has a string).

Type : String

## DataBits#find(name)

Find the FLAG object by name or value

Params :

- name : The name or value of flag (string|number or Array\<string|number>)

Return :

- The flag (Array\<Object> or empty array)

```js
console.log(DataManager.find(4));
```

## DataBits#toArray()

Return an array of name of flags of the collection

Return :

Array\<string>

```js
console.log(DataManager.toArray());
```

## DataBits#toString()

Return a string of names of flags of the collection (separate by `,` )

Return :

String

```js
console.log(DataManager.toString());
```

## DataBits#hasAnyflag()

Return true if collection contains at least one value.

Return :

Boolean

```js
console.log(DataManager.hasAnyflag());
```

## DataBits#has(flag)

Return true if user have permission(s).

Params :

- flag : The flag to check (Array, String, Number)

Return :

Boolean

```js
console.log(DataManager.has(["FLAG_1"]));
```

## DataBits#missing(flag)

Return the missing(s) flag(s) of collection in the parameter.

Params :

- flag : The flag to check (Array, String, Number)

Return :

Flag | null

```js
console.log(DataManager.missing(["3"]));
```

## DataBits#equals(other)

Return true if collection flags are equal to parameter.

Params :

- other : The compared (Array, String, Number)

Return :

Boolean

```js
console.log(DataManager.equals([1, 4]));
```

## DataBits#addAllFlags()

Add all flags from collection.

Return :

String (the new bits flags)

```js
console.log(DataManager.addAllFlags());
```

## DataBits#add(flags)

Add flag(s) from collection.

Params :

- flags : The flags to add (String, Number, Array)

Return :

String (the new bits flags)

```js
console.log(DataManager.add("FLAG_1"));
```

## DataBits#removeAllFlags()

Remove all flags from collection.

Return :

String (the new bits flags)

```js
console.log(DataManager.removeAllFlags());
```

## DataBits#remove(flags)

Remove flag(s) from collection.

Params :

- flags : The flags to remove (String, Number, Array)

Return :

String (the new bits flags)

```js
console.log(DataManager.remove("FLAG_1"));
```

## Example

See the [example file](./EXAMPLE.md)
