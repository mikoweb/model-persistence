describe('http.clientConfig', () => {
    const config = modelPersist.http.config;

    afterEach(() => {
        config.options = {};
    });

    it('default no options', () => {
        expect({}).to.deep.equal(config.options);
    });

    it('set new options', () => {
        config.options = {foo: 'ok'};
        expect({foo: 'ok'}).to.deep.equal(config.options);
    });
});
