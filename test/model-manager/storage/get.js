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

    it('get', () => {
        manager.saveSync(new Model({
            id: 333,
            title: 'Test',
            content: 'test'
        }));

        return manager.get(333, Model).then((model) => {
            expect(333).to.equal(model.id);
            expect('Test').to.equal(model.title);
            expect('test').to.equal(model.content);
        });
    });

    it('getSync', () => {
        manager.saveSync(new Model({
            id: 333,
            title: 'Test',
            content: 'test'
        }));

        const model = manager.getSync(333, Model);
        expect(333).to.equal(model.id);
        expect('Test').to.equal(model.title);
        expect('test').to.equal(model.content);
    });
});
