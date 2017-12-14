import Interface from '../core/Interface';

export default class FactoryInterface extends Interface {
    /**
     * Create ModelManager object.
     *
     * @param {LocatorInterface} locator
     * @return {ModelManagerInterface}
     */
    createManager(locator) {
        this.defineInterfaceMethod();
    }

    /**
     * Create Repository object.
     *
     * @param {Model.prototype} modelClass
     * @param {LocatorInterface} locator
     * @return {RepositoryInterface}
     */
    createRepository(modelClass, locator) {
        this.defineInterfaceMethod();
    }
}
