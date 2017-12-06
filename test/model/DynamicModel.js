describe('model.DynamiModel', () => {
    const DynamiModel = modelPersist.DynamicModel;

    it('invalid argument in contructor', () => {
        expect(() => new DynamiModel()).to.throw();
        expect(() => new DynamiModel(null)).to.throw();
    });

    it('empty model', () => {
        const model = new DynamiModel({});
        expect(0).to.equal(Object.keys(model).length);
    });

    it('not empty model', () => {
        const model = new DynamiModel({foo: 'ok'});
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

        const model = new DynamiModel(data);
        expect(data).to.deep.equal(model);
    });
});
