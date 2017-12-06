describe('transformer.OutputTransformer', () => {
    const mergeTransformers = modelPersist.transformer.mergeTransformers;
    const CustomTransformer = modelPersist.transformer.CustomTransformer;

    class TestTransformer extends CustomTransformer {
        transform(object) {
            void(0);
        }
    }

    const testTranformer = new TestTransformer();

    beforeEach(() => {
        sinon.spy(testTranformer, 'transform');
    });

    afterEach(() => {
        testTranformer.transform.restore();
    });

    it('merge two tranformers should be two times call transform', () => {
        const tranformer = new (mergeTransformers([
            testTranformer,
            testTranformer
        ]));

        tranformer.transform({});

        expect(testTranformer.transform).to.have.been.callCount(2);
    });
});
