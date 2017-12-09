describe('repository.HTTPRepository', () => {
    const factory = modelPersist.httpFactory;

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('findOne', () => {
        class Locator extends modelPersist.HTTPLocatorAbstract {
            get basePath() {
                return '/article';
            }
        }

        const Model = new modelPersist.Model({
            id: Number,
            title: String,
            content: String
        });

        const locator = new Locator();
        const repository = factory.createRepository(Model, locator);

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();

            expect('/article/100').to.equal(request.url);
            expect('get').to.equal(request.config.method);

            request.respondWith({
                status: 200,
                response: {
                    id: 100,
                    title: 'Lorem Ipsum',
                    content: '<p>Lorem Ipsum</p>'
                }
            });
        });

        return repository.findOne(100).then((model) => {
            expect(100).to.equal(model.id);
            expect('Lorem Ipsum').to.equal(model.title);
            expect('<p>Lorem Ipsum</p>').to.equal(model.content);
        });
    });
});
