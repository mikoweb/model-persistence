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

    it('remove', () => {
        manager.saveSync(new Model({
            id: 1,
            title: 'New Lorem Ipsum',
            content: '<p>New Lorem Ipsum</p>'
        }));

        expect(manager.has(1)).to.be.true;

        return manager.remove(manager.getSync(1, Model)).then((removed) => {
            expect(removed).to.be.true;
            expect(manager.has(1)).to.be.false;
        });
    });

    it('removeSync', () => {
        expect([]).to.deep.equal(manager.getKeys());
        expect(manager.getAll(Model)).to.have.lengthOf(0);

        manager.saveSync(new Model({
            id: 1,
            title: 'New Lorem Ipsum',
            content: '<p>New Lorem Ipsum</p>'
        }));

        expect(['1']).to.deep.equal(manager.getKeys());
        expect(manager.getAll(Model)).to.have.lengthOf(1);

        expect(manager.has(1)).to.be.true;
        manager.removeSync(manager.getSync(1, Model));
        expect(manager.has(1)).to.be.false;

        expect([]).to.deep.equal(manager.getKeys());
        expect(manager.getAll(Model)).to.have.lengthOf(0);
    });
});
