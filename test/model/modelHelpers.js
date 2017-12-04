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
});
