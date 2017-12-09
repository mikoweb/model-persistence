describe('model-manager.HTTPModelManager', () => {
    const factory = modelPersist.httpFactory;

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('save exists model', () => {
        class Locator extends modelPersist.HTTPLocatorAbstract {
            get basePath() {
                return '/article';
            }
        }

        const locator = new Locator();
        const manager = factory.createManager(locator);
        const Model = new modelPersist.Model({
            id: Number,
            title: String,
            content: String
        });

        const model = new Model({
            id: 100,
            title: 'Lorem Ipsum',
            content: '<p>Lorem Ipsum</p>'
        });

        model.fake = 'fake';

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            const transformer = new (locator.getOutputTransformerClass());

            expect('/article/100').to.equal(request.url);
            expect('put').to.equal(request.config.method);
            const data = transformer.transform(model);
            expect(data).to.not.have.property('fake');

            expect(JSON.stringify({
                data
            })).to.equal(request.config.data);

            request.respondWith({
                status: 200
            });
        });

        return manager.save(model).then((saved) => {
            expect(saved).to.be.true;
        });
    });
});
