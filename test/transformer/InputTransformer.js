describe('transformer.InputTransformer', () => {
    const Model = modelPersist.Model;
    const Transformer = modelPersist.transformer.InputTransformer;

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

        expect({
            product: {name: "Apple Pie", quantity: 1},
            orderDate: date,
        }).to.deep.equal(transformer.transform(model));
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
    });
});
