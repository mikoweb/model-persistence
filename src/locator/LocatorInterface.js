import Interface from '../core/Interface';

/**
 * Data locator.
 */
export default class LocatorInterface extends Interface {
    /**
     * Locate place where model is storage.
     *
     * @param {Model} model
     * @param {Object} [options]
     * @return {string}
     */
    locate(model, options = {}) {
        this.defineInterfaceMethod();
    }

    /**
     * Name of id property.
     *
     * @return {string}
     */
    getIdPropName() {
        this.defineInterfaceMethod();
    }

    /**
     * ModelManagerClass related to this locator.
     *
     * @return {ModelManagerInterface.prototype}
     */
    getModelManagerClass() {
        this.defineInterfaceMethod();
    }

    /**
     * RepositoryClass related to this locator.
     *
     * @return {RepositoryInterface.prototype}
     */
    getRepositoryClass() {
        this.defineInterfaceMethod();
    }
}
