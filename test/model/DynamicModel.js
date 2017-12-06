describe('model.DynamicModel', () => {
    const DynamicModel = modelPersist.DynamicModel;

    it('invalid argument in contructor', () => {
        expect(() => new DynamicModel()).to.throw();
        expect(() => new DynamicModel(null)).to.throw();
    });

    it('empty model', () => {
        const model = new DynamicModel({});
        expect(0).to.equal(Object.keys(model).length);
    });

    it('not empty model', () => {
        const model = new DynamicModel({foo: 'ok'});
        expect(1).to.equal(Object.keys(model).length);
    });

    it('check value', () => {
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

        const model = new DynamicModel(data);
        expect(data).to.deep.equal(model);
    });
});
