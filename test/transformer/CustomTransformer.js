describe('transformer.CustomTransformer', () => {
    it('test Result', () => {
        const Transformer = class extends modelPersist.transformer.CustomTransformer {
            transform(object) {
                return {
                    newPropertyName: object.oldPropertyName,
                };
            }
        };

        const transformer = new Transformer();

        expect({newPropertyName: 'test'}).to.deep.equal(transformer.transform({oldPropertyName: 'test'}));
    });
});
