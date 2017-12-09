describe('model.ArrayModel', () => {
    it('Load array of models from array of literals', () => {
        const Model = new modelPersist.Model({
            id: Number,
            title: String,
            content: String
        });

        const ArrayModel = new modelPersist.Model.Array(Model);

        const array = ArrayModel([{
            id: 100,
            title: 'Lorem Ipsum',
            content: '<p>Lorem Ipsum</p>'
        }]);

        expect(array[0]).to.be.an.instanceof(Model);
        expect(100).to.equal(array[0].id);
        expect('Lorem Ipsum').to.equal(array[0].title);
        expect('<p>Lorem Ipsum</p>').to.equal(array[0].content);
    });
});
