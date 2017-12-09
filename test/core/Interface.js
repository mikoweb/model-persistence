describe('core.Interface', () => {
    it('throw when call defineInterfaceMethod', () => {
        const obj = new modelPersist.Interface();
        expect(() => obj.defineInterfaceMethod()).to.throw();
    });
});
