# Model Persistence Library

## First conception

It's live.

### Model creation

[DOCS](http://objectmodel.js.org/docs/v2/)

Defining a class:

```javascript
class Person extends Model({
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

### Data Locator

Override `basePath` to specify where is endpoint for persons.

```javascript
class PersonLocator extends HTTPLocatorAbstract {
    /**
     * @inheritdoc
     */
    get basePath() {
        return '/person';
    }
}
```

### Data access (HTTP)

Create a `ModelManager` by `httpFactory`.

```javascript
const manager = httpFactory.createManager(new PersonLocator());
```

Save model object.

```javascript
const rick = new Person({lastName: "Sanchez", firstName: "Rick"});

manager.save(rick).then(() => {
    // You saved the model on the storage.
});
```

Analogously, you can get and remove data.

### Repository

You can create repository objects. You can also defining own repository type.

Create a `Repository` by `httpFactory`.

```javascript
const repository = httpFactory.createRepository(Person, new PersonLocator());
```

Default repository class (HTTPRepository) have `findOne` method. Example of use:

```javascript
repository.findOne(id).then((person) => {
    console.log(person); // personal data
});
```
