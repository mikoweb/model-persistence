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

    it('getAll', () => {
        const length = 10;

        for (let i = 1; i <= length; i++) {
            manager.saveSync(new Model({
                id: i,
                title: `Article ${i}`,
                content: `Content ${i}`
            }));
        }

        const articles = manager.getAll(Model);
        expect(articles).to.have.lengthOf(length);

        for (let i = 0; i < length; i++) {
            const model = articles[i];
            const number = i+1;
            expect(number).to.equal(model.id);
            expect(`Article ${number}`).to.equal(model.title);
            expect(`Content ${number}`).to.equal(model.content);
        }
    });
});
