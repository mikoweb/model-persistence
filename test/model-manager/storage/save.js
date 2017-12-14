describe('model-manager.StorageModelManager', () => {
    const factory = modelPersist.storageFactory;
    class Locator extends modelPersist.StorageLocatorAbstract {
        get basePath() {
            return '/article';
        }
        get storage() {
            return fakeLocalStorage;
        }
    }

    const Model = new modelPersist.Model({
        id: Number,
        title: String,
        content: String
    });

    const locator = new Locator();
    const manager = factory.createManager(locator);

    afterEach(() => {
        locator.storage.clear();
    });

    it('save', () => {
        return manager.save(new Model({
            id: 1,
            title: 'Lorem Ipsum',
            content: '<p>Lorem Ipsum</p>'
        })).then((saved) => {
            expect(saved).to.be.true;
            const foundModel = manager.getSync(1, Model);
            expect(1).to.equal(foundModel.id);
            expect('Lorem Ipsum').to.equal(foundModel.title);
            expect('<p>Lorem Ipsum</p>').to.equal(foundModel.content);
        });
    });

    it('saveSync', () => {
        manager.saveSync(new Model({
            id: 1,
            title: 'Lorem Ipsum',
            content: '<p>Lorem Ipsum</p>'
        }));

        manager.saveSync(new Model({
            id: 1,
            title: 'New Lorem Ipsum',
            content: '<p>New Lorem Ipsum</p>'
        }));

        let model = manager.getSync(1, Model);
        expect(1).to.equal(model.id);
        expect('New Lorem Ipsum').to.equal(model.title);
        expect('<p>New Lorem Ipsum</p>').to.equal(model.content);

        expect(['1']).to.deep.equal(manager.getKeys());

        let articles = manager.getAll(Model);
        expect(articles).to.have.lengthOf(1);
        model = articles[0];
        expect(1).to.equal(model.id);
        expect('New Lorem Ipsum').to.equal(model.title);
        expect('<p>New Lorem Ipsum</p>').to.equal(model.content);

        manager.saveSync(new Model({
            id: 2,
            title: 'Foo',
            content: 'foo'
        }));

        model = manager.getSync(2, Model);
        expect(2).to.equal(model.id);
        expect('Foo').to.equal(model.title);
        expect('foo').to.equal(model.content);

        expect(['1', '2']).to.deep.equal(manager.getKeys());

        articles = manager.getAll(Model);
        expect(articles).to.have.lengthOf(2);
        model = articles[1];
        expect(2).to.equal(model.id);
        expect('Foo').to.equal(model.title);
        expect('foo').to.equal(model.content);
    });
});
