describe('transformer.OutputTransformer', () => {
    const Model = modelPersist.Model;
    const Transformer = modelPersist.transformer.OutputTransformer;
    const modelHelpers = modelPersist.modelHelpers;

    beforeEach(() => {
        sinon.spy(modelHelpers, 'getData');
    });

    afterEach(() => {
        modelHelpers.getData.restore();
    });

    it('test transform Model', () => {
        const transformer = new Transformer();
        class Order extends Model({
            product: {
                name: String,
                quantity: Number,
            },
            orderDate: Date
        }) {
        }

        const date = new Date();
        const model = new Order({
            product: {name: "Apple Pie", quantity: 1},
            orderDate: date,
        });

        model.fake = 'test';

        expect({
            product: {name: "Apple Pie", quantity: 1},
            orderDate: date,
        }).to.deep.equal(transformer.transform(model));

        expect(modelHelpers.getData).to.have.been.called;
    });

    it('test transform literal object', () => {
        const transformer = new Transformer();

        const data = {
            foo: 'ok',
            bar: 'ok',
            deep: {
                ok: 'ok',
                moreDeep: {
                    foo: 'bar'
                }
            }
        };

        expect(data).to.deep.equal(transformer.transform(data));
        expect(modelHelpers.getData).to.have.been.callCount(0);
    });

    it('test transform DynamicModel', () => {
        const transformer = new Transformer();

        const data = new modelPersist.DynamicModel({
            foo: 'ok',
            bar: 'ok',
            deep: {
                ok: 'ok',
                moreDeep: {
                    foo: 'bar'
                }
            }
        });

        expect(data).to.deep.equal(transformer.transform(data));
        expect(modelHelpers.getData).to.have.been.callCount(0);
    });
});
