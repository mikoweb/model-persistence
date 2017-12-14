describe('locator.StorageLocatorAbstract', () => {
    const Locator = modelPersist.StorageLocatorAbstract;
    const model = new (new modelPersist.Model({id: Number}))({id: 120});
    const emptyModel = new (new modelPersist.Model({}));
    const nullModel = new (new modelPersist.Model({id: [Number, null]}))({id: null});
    const stubs = [];

    beforeEach(() => {
        stubs.push(sinon.stub(Locator.prototype, 'basePath').get(() => {
            return '/foo';
        }));
    });

    afterEach(() => {
        stubs.forEach((stub) => {
            stub.restore();
        });
    });

    it('test basePath result', () => {
        const locator = new Locator();
        expect('/foo').to.equal(locator.basePath);
    });

    it('test locateById result', () => {
        const locator = new Locator();
        expect('/foo/1').to.equal(locator.locateById(1));
    });

    it('test getIdPropName result', () => {
        const locator = new Locator();
        expect('id').to.equal(locator.getIdPropName());
    });

    it('getModelId with valid id', () => {
        const locator = new Locator();
        expect(model.id).to.equal(locator.getModelId(model));
    });

    it('getModelId with null', () => {
        const locator = new Locator();
        expect(null).to.equal(locator.getModelId(nullModel));
    });

    it('getModelId with emptyModel', () => {
        const locator = new Locator();
        expect(locator.getModelId(emptyModel)).to.be.a('undefined');
    });

    it('isEmptyModelId with valid id', () => {
        const locator = new Locator();
        expect(locator.isEmptyModelId(model)).to.be.false;
    });

    it('isEmptyModelId with null', () => {
        const locator = new Locator();
        expect(locator.isEmptyModelId(nullModel)).to.be.true;
    });

    it('isEmptyModelId with emptyModel', () => {
        const locator = new Locator();
        expect(locator.isEmptyModelId(emptyModel)).to.be.true;
    });

    it('locate with valid id', () => {
        const locator = new Locator();
        expect(`/foo/${model.id}`).to.equal(locator.locate(model));
    });

    it('test getModelManagerClass result', () => {
        const locator = new Locator();
        expect(modelPersist.StorageModelManager).to.equal(locator.getModelManagerClass());
    });

    it('test getRepositoryClass result', () => {
        const locator = new Locator();
        expect(modelPersist.StorageRepository).to.equal(locator.getRepositoryClass());
    });

    it('test getInputTransformerClass result', () => {
        const locator = new Locator();
        expect(modelPersist.transformer.InputTransformer).to.equal(locator.getInputTransformerClass());
    });

    it('test getOutputTransformerClass result', () => {
        const locator = new Locator();
        expect(modelPersist.transformer.OutputTransformer).to.equal(locator.getOutputTransformerClass());
    });

    it('test storage propery in SessionStorageLocatorAbstract', () => {
        const locator = new modelPersist.SessionStorageLocatorAbstract();
        expect(locator.storage).to.equal(sessionStorage);
    });

    it('test storage propery in LocalStorageLocatorAbstract.js', () => {
        const locator = new modelPersist.LocalStorageLocatorAbstract();
        expect(locator.storage).to.equal(localStorage);
    });
});
