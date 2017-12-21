describe('model.modelHelpers', () => {
    const modelHelpers = modelPersist.modelHelpers;
    const Model = modelPersist.Model;
    const DynamiModel = modelPersist.DynamicModel;

    describe('isModel results', () => {
        it('model extend', () => {
            const Order = Model({
                id: Number
            });

            const model = new Order({id: 1});

            expect(modelHelpers.isModel(model)).to.be.true;
        });

        it('model extend with new operator', () => {
            const Order = new Model({
                id: Number
            });

            const model = new Order({id: 1});

            expect(modelHelpers.isModel(model)).to.be.true;
        });

        it('model nesting extend', () => {
            const Order = Model({
                id: Number
            });

            const NewOrder = Order.extend({
                name: String
            });

            const model = new NewOrder({id: 1, name: 'test'});

            expect(modelHelpers.isModel(model)).to.be.true;
        });

        it('new Model is not Model, because it\'s constructor', () => {
            const model = new Model({});
            expect(modelHelpers.isModel(model)).to.be.false;
        });

        it('calling out Model it\'s constructor too', () => {
            const model = Model({});
            expect(modelHelpers.isModel(model)).to.be.false;
        });

        it('new (new Model) is valid model', () => {
            const model = new(new Model({}));
            expect(modelHelpers.isModel(model)).to.be.true;
        });

        it('es6 class model', () => {
            class Character extends Model({ lastName: String, firstName: String }){
                get fullName(){
                    return `${this.firstName} ${this.lastName}`;
                }
            }

            const model = new Character({ lastName: "Sanchez", firstName: "Rick" });

            expect(modelHelpers.isModel(model)).to.be.true;
        });

        it('Object Literal is not Model', () => {
            expect(modelHelpers.isModel({id: 'test'})).to.be.false;
        });

        it('DynamicModel is not Model', () => {
            expect(modelHelpers.isModel(new DynamiModel({id: 'test'}))).to.be.false;
        });

        it('Date object is not Model', () => {
            expect(modelHelpers.isModel(new Date())).to.be.false;
        });

        it('string is not Model', () => {
            expect(modelHelpers.isModel('test')).to.be.false;
        });

        it('null is not Model', () => {
            expect(modelHelpers.isModel(null)).to.be.false;
        });
    });

    describe('isRawObject results', () => {
        it('valid literal object', () => {
            expect(modelHelpers.isRawObject({'test': 'test'})).to.be.true;
        });

        it('new Object is valid', () => {
            expect(modelHelpers.isRawObject(new Object())).to.be.true;
        });

        it('Object is valid', () => {
            expect(modelHelpers.isRawObject(Object())).to.be.true;
        });

        it('Date object is invalid', () => {
            expect(modelHelpers.isRawObject(new Date())).to.be.false;
        });

        it('extends object is invalid', () => {
            class NewObject extends Object {}
            expect(modelHelpers.isRawObject(new NewObject())).to.be.false;
        });
    });

    describe('getData results', () => {
        it('check model data', () => {
            class Order extends Model({
                product: {
                    name: String,
                    quantity: Number,
                },
                orderDate: Date
            }) {
                get FranekKimono() {
                    return 'karate mistrz';
                }
            }

            class SuperOrder extends Order.extend({
                newField: [String],
                subOrder: [Order]
            }) {
            }

            const date = new Date();
            const model = new SuperOrder({
                product: {name: "Apple Pie", quantity: 1},
                orderDate: date,
                dupa: 'pl',
                newField: 'jest',
                subOrder: new Order({
                    product: {name: "Dupa", quantity: 2},
                    orderDate: date,
                })
            });

            model.foo = 'ok';

            expect({
                product: {
                    name: 'Apple Pie',
                    quantity: 1
                },
                orderDate: date,
                newField: 'jest',
                subOrder: {
                    product: {
                        name: 'Dupa',
                        quantity: 2
                    },
                    orderDate: date
                }
            }).to.deep.equal(modelHelpers.getData(model));
        });

        it('check data from literal object', () => {
            expect({
                foo: 'ok',
                bar: 'ok',
                deep: {
                    ok: 'ok',
                    moreDeep: {
                        foo: 'bar'
                    }
                }
            }).to.deep.equal(modelHelpers.getData({
                foo: 'ok',
                bar: 'ok',
                deep: {
                    ok: 'ok',
                    moreDeep: {
                        foo: 'bar'
                    }
                }
            }, true));
        });

        it('model with array', () => {
            const Item = Model({
                name: String
            });

            const Collection = Model({
                description: String,
                items: Model.Array(Item)
            });

            const model = new Collection({
                description: 'Test',
                items: [
                    {name: 'Item 1'},
                    {name: 'Item 2'}
                ]
            });

            expect({
                description: 'Test',
                items: [
                    {name: 'Item 1'},
                    {name: 'Item 2'}
                ]
            }).to.deep.equal(modelHelpers.getData(model));
        });
    });
});
