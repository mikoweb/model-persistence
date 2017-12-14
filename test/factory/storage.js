describe('factory.http', () => {
    const factory = modelPersist.storageFactory;

    class Locator extends modelPersist.LocalStorageLocatorAbstract {
        get basePath() {
            return '/foo';
        }
    }

    it('test createManager', () => {
        const locator = new Locator();
        const manager = factory.createManager(locator);

        expect(manager).to.be.an.instanceof(locator.getModelManagerClass());
        expect(manager).to.be.an.instanceof(modelPersist.StorageModelManager);
        expect(locator).to.equal(manager._locator);
        expect(manager.createInputTransformer()).to.be.an.instanceof(locator.getInputTransformerClass());
        expect(manager.createInputTransformer()).to.be.an.instanceof(modelPersist.transformer.InputTransformer);
        expect(manager.createOutputTransformer()).to.be.an.instanceof(locator.getOutputTransformerClass());
        expect(manager.createOutputTransformer()).to.be.an.instanceof(modelPersist.transformer.OutputTransformer);
    });

    it('test createRepository', () => {
        const locator = new Locator();
        const Model = new modelPersist.Model({id: Number});
        const repository = factory.createRepository(Model, locator);

        expect(repository).to.be.an.instanceof(locator.getRepositoryClass());
        expect(repository).to.be.an.instanceof(modelPersist.StorageRepository);
        expect(locator).to.equal(repository._locator);
    });
});
