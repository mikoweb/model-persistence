describe('http.createClient', () => {
    const config = modelPersist.http.config;
    const createClient = modelPersist.http.createClient;
    const Locator = modelPersist.HTTPLocatorAbstract;

    beforeEach(() => {
        config.options = {};
    });

    afterEach(() => {
        config.options = {};
    });

    it('check client instance', () => {
        class SampleLocator extends Locator {
            get basePath() {
                return '/lorem-ipsum';
            }
        }

        const locator = new SampleLocator();
        const client = createClient(locator);

        expect(client).to.have.property('request');
        expect(client).to.have.property('get');
        expect(client).to.have.property('post');
        expect(client).to.have.property('put');
        expect(client).to.have.property('delete');
        expect(client).to.have.property('head');
        expect(client).to.have.property('patch');
        expect(client).to.have.property('options');
    });

    it('client with headers from locator', () => {
        class SampleLocator extends Locator {
            get basePath() {
                return '/lorem-ipsum';
            }
            get headers() {
                return {'X-Api-Key': 'from-locator'};
            }
        }

        config.options = {headers: {'X-Api-Key': 'from-options'}};
        const locator = new SampleLocator();
        const client = createClient(locator);

        expect('from-locator').to.equal(client.defaults.headers['X-Api-Key']);
    });


    it('client with headers from options', () => {
        class SampleLocator extends Locator {
            get basePath() {
                return '/lorem-ipsum';
            }
        }

        config.options = {headers: {'X-Api-Key': 'from-options'}};
        const locator = new SampleLocator();
        const client = createClient(locator);

        expect('from-options').to.equal(client.defaults.headers['X-Api-Key']);
    });
});
