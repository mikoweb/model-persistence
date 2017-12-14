describe('repository.StorageRepository', () => {
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
    const repository = factory.createRepository(Model, locator);
    const stubs = [];

    beforeEach(() => {
        stubs.push(sinon.stub(locator.storage, 'getItem').callsFake((keyName) => {
            let value;

            switch (keyName) {
                case '__ids__' + locator.basePath:
                    value = JSON.stringify([1, 2, 3]);
                    break;
                case locator.locateById(1):
                    value = JSON.stringify({
                        id: 1,
                        title: 'First Article',
                        content: 'First'
                    });
                    break;
                case locator.locateById(2):
                    value = JSON.stringify({
                        id: 2,
                        title: 'Second Article',
                        content: 'Second'
                    });
                    break;
                case locator.locateById(3):
                    value = JSON.stringify({
                        id: 3,
                        title: 'Third Article',
                        content: 'Third'
                    });
                    break;
                default:
                    value = null;
            }

            return value;
        }));
    });

    afterEach(() => {
        stubs.forEach((stub) => {
            stub.restore();
        });

        locator.storage.clear();
    });

    it('getAll', () => {
        const articles = repository.getAll();

        expect(articles).to.have.lengthOf(3);
        const model = articles[1];
        expect(2).to.equal(model.id);
        expect('Second Article').to.equal(model.title);
        expect('Second').to.equal(model.content);
    });
});
