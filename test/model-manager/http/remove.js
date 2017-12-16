describe('model-manager.HTTPModelManager', () => {
    const factory = modelPersist.httpFactory;

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('remove model', () => {
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

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();

            expect('/article/100').to.equal(request.url);
            expect('delete').to.equal(request.config.method);

            request.respondWith({
                status: 200,
                response: {
                    errors: [],
                }
            });
        });

        return manager.remove(model).then((data) => {
            expect(data).to.be.an('object');
            expect({errors: []}).to.deep.equal(data);
        });
    });
});
