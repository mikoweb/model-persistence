describe('locator.HTTPLocatorAbstract', () => {
    const Locator = modelPersist.HTTPLocatorAbstract;

    const model = new (new modelPersist.Model({id: Number}))({id: 120});
    const emptyModel = new (new modelPersist.Model({}));
    const nullModel = new (new modelPersist.Model({id: [Number, null]}))({id: null});

    describe('implement basePath', () => {
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

        it('test headers result', () => {
            const locator = new Locator();
            expect({}).to.deep.equal(locator.headers);
        });

        it('test basePath result', () => {
            const locator = new Locator();
            expect('/foo').to.equal(locator.basePath);
        });

        it('test getBaseURL result', () => {
            const locator = new Locator();
            expect('/foo').to.equal(locator.getBaseURL());
        });

        it('test getUrl result', () => {
            const locator = new Locator();
            expect('/foo/lorem').to.equal(locator.getUrl('/lorem'));
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

        it('locate with null', () => {
            const locator = new Locator();
            expect('/foo').to.equal(locator.locate(nullModel));
        });

        it('locate with emptyModel', () => {
            const locator = new Locator();
            expect('/foo').to.equal(locator.locate(emptyModel));
        });

        it('test getModelManagerClass result', () => {
            const locator = new Locator();
            expect(modelPersist.HTTPModelManager).to.equal(locator.getModelManagerClass());
        });

        it('test getRepositoryClass result', () => {
            const locator = new Locator();
            expect(modelPersist.HTTPRepository).to.equal(locator.getRepositoryClass());
        });

        it('test getInputTransformerClass result', () => {
            const locator = new Locator();
            expect(modelPersist.transformer.InputTransformer).to.equal(locator.getInputTransformerClass());
        });

        it('test getOutputTransformerClass result', () => {
            const locator = new Locator();
            expect(modelPersist.transformer.OutputTransformer).to.equal(locator.getOutputTransformerClass());
        });
    });

    describe('implement basePath and hostPath', () => {
        const stubs = [];

        beforeEach(() => {
            stubs.push(sinon.stub(Locator.prototype, 'basePath').get(() => {
                return '/bar';
            }));

            stubs.push(sinon.stub(Locator.prototype, 'hostPath').get(() => {
                return 'https://google.com';
            }));
        });

        afterEach(() => {
            stubs.forEach((stub) => {
                stub.restore();
            });
        });

        it('test basePath result', () => {
            const locator = new Locator();
            expect('/bar').to.equal(locator.basePath);
        });

        it('test hostPath result', () => {
            const locator = new Locator();
            expect('https://google.com').to.equal(locator.hostPath);
        });

        it('test getBaseURL result', () => {
            const locator = new Locator();
            expect('https://google.com/bar').to.equal(locator.getBaseURL());
        });

        it('test getUrl result', () => {
            const locator = new Locator();
            expect('https://google.com/bar/lorem').to.equal(locator.getUrl('/lorem'));
        });

        it('test locateById result', () => {
            const locator = new Locator();
            expect('https://google.com/bar/1').to.equal(locator.locateById(1));
        });

        it('locate with valid id', () => {
            const locator = new Locator();
            expect(`https://google.com/bar/${model.id}`).to.equal(locator.locate(model));
        });

        it('locate with null', () => {
            const locator = new Locator();
            expect('https://google.com/bar').to.equal(locator.locate(nullModel));
        });

        it('locate with emptyModel', () => {
            const locator = new Locator();
            expect('https://google.com/bar').to.equal(locator.locate(emptyModel));
        });
    });
});
