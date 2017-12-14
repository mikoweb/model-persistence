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
                case locator.locateById(100):
                    value = JSON.stringify({
                        id: 100,
                        title: 'Lorem Ipsum',
                        content: '<p>Lorem Ipsum</p>'
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

    it('findOne', () => {
        return repository.findOne(100).then((model) => {
            expect(100).to.equal(model.id);
            expect('Lorem Ipsum').to.equal(model.title);
            expect('<p>Lorem Ipsum</p>').to.equal(model.content);
        });
    });

    it('findOneSync', () => {
        expect(() => repository.findOneSync(200)).to.throw();
        const model = repository.findOneSync(100);
        expect(100).to.equal(model.id);
        expect('Lorem Ipsum').to.equal(model.title);
        expect('<p>Lorem Ipsum</p>').to.equal(model.content);
    });
});
