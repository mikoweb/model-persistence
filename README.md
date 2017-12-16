# Model Persistence Library

Library intended for data persistence using HTTP or 
[Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

Demos:

* [localStorage example](https://jsfiddle.net/rmweb/62mpgov6/)

## Installing

Using npm:

    npm install model-persistence

Using script:

```html
<script src="./node_modules/objectmodel/dist/object-model.umd.js"></script>
<script src="./node_modules/axios/dist/axios.min.js"></script>
<script src="./bundle/model-persistence.min.js"></script>
```

## Import Module

In Node.js:

```javascript
const modelPersist = require('model-persistence');
```

In ES6 modules:

```javascript
import modelPersist from 'model-persistence';
```

You have access to a global object `modelPersist` if you use the `<script>` tag.

## Model Class

Model class is used to define models. It's from [ObjectModel v2](http://objectmodel.js.org/docs/v2/) library.

> Object models validate nested object properties against a definition tree. You may consider them as definitions of classes with advanced validation options. They provide automatic validation at initial and future assignments of the properties of the instance objects.

Defining a model:

```javascript
class Person extends modelPersist.Model({
    id: [Number],
    lastName: String,
    firstName: String 
}) {
   get fullName() {
       return `${this.firstName} ${this.lastName}`;
   }
}
```

New instance:

```javascript
const rick = new Person({
    lastName: "Sanchez", 
    firstName: "Rick"
});

rick.lastName = 132;
// > TypeError: expecting lastName to be String, got Number 132
console.log(rick.fullName); // "Rick Sanchez"
```

## Locator

Locator is responsible for where the data will be stored.

Using HTTPLocator to send data by HTTP:

```javascript
class PersonLocator extends modelPersist.HTTPLocatorAbstract {
    /**
     * @inheritdoc
     */
    get basePath() {
        return '/person';
    }
}
```

Property `basePath` specify where is endpoint for persons. You can also override `hostPath` to specify 
host like `https://google.com`, default is empty.

You can use classes `modelPersist.LocalStorageLocatorAbstract` and `modelPersist.SessionStorageLocatorAbstract`,
if you want to store data in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
or [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
It works analogically as `HTTPLocatorAbstract`, but property `basePath` specify prefix for storage keys.

## Model Manager

Model Manager it's a data persistence and access layer. Each manager implements `ModelManagerInterface` and has methods:
`get`, `save` and `remove`.

There are two types of managers:

**HTTPModelManager**

Used for data transfer by HTTP, requires HTTPLocator.

```javascript
const manager = modelPersist.httpFactory.createManager(new PersonLocator());
```

**StorageModelManager**

Used for data transfer to [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), 
requires StorageLocator.

```javascript
const manager = modelPersist.storageFactory.createManager(new PersonLocator());
```

Example of use:

```javascript
const manager = modelPersist.httpFactory.createManager(new PersonLocator());

// Get model with id equals 1
const model = manager.get(1, Person);

// Change first name and save
model.firstName = 'Alexis';
manager.save(model).then((data) => {
    // data variable is object from server response
});

// Remove model
manager.remove(model).then((data) => {
    // data variable is object from server response
});

// Create new person
const gigi = new Person({firstName: 'Gigi', lastName: 'Amoroso'});
manager.save(model).then((data) => {
    // data variable is object from server response
});
```

### HTTPModelManager methods

`HTTPModelManager` use the following methods:

Class method | HTTP method | Path | Description
:---: | :---: | :---: | :---:
 get | GET | /person/1 | Get model by id.
 save | POST | /person | Save new model, when `id` is not defined.
 save | PUT | /person/1 | Save model.
 remove | DELETE | /person/1 | Remove model.

## Repository

A repository is a class, that allows creation a data collection. Default repository implements only one method, 
i.e. `findOne`. Below shows, how to create a default repository.

Create a default HTTP repository:

```javascript
const repository = modelPersist.httpFactory.createRepository(Person, new PersonLocator());
```

Create a default Web Storage repository:

```javascript
const repository = modelPersist.storageFactory.createRepository(Person, new PersonLocator());
```

Example of use:

```javascript
repository.findOne(id).then((person) => {
    console.log(person); // personal data
});
```

### How create a custom repository

You must extend the default class:

```javascript
class PersonHTTPRepository extends modelPersist.HTTPRepository
{
    findByFirstName(firstName) {
        return new Promise((resolve, reject) => {
            this._client.get(this._locator.getUrl(`/by-first-name/${firstName}`)).then((response) => {
                const ArrayModel = new modelPersist.Model.Array(this._modelClass);
                resolve(ArrayModel(this._manager.createInputTransformer().transform(response.data)));
            }).catch((e) => {
                reject(e);
            });
        });
    }
}
```

Now just change the type of repository in `Locator`:

```javascript
class PersonLocator extends modelPersist.HTTPLocatorAbstract {
    /**
     * @inheritdoc
     */
    get basePath() {
        return '/person';
    }

    getRepositoryClass() {
        return PersonHTTPRepository;
    }
}
```

Example of use:

```javascript
const repository = modelPersist.httpFactory.createRepository(Person, new PersonLocator());

repository.findByFirstName('Dolores').then((persons) => {
    console.log(persons); // all persons who have the name Dolores
});
```

## Configuring HTTP Client

You can change the global client settings, by setter `modelPersist.http.config.options`.

```javascript
modelPersist.http.config.options = {
    headers: {
        'X-API-Key': 'secret'
    }
};
```
