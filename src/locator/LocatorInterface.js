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
     * Locate place by id.
     *
     * @param id
     * @param {Object} [options]
     * @return {string}
     */
    locateById(id, options = {}) {
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
     * Get id from model.
     *
     * @param {Model} model
     * @return {*}
     */
    getModelId(model) {
        this.defineInterfaceMethod();
    }

    /**
     * Is empty model id?
     *
     * @param {Model} model
     * @return {boolean}
     */
    isEmptyModelId(model) {
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

    /**
     * Input Transformer class related to this locator.
     *
     * @return {TransformerInterface.prototype}
     */
    getInputTransformerClass() {
        this.defineInterfaceMethod();
    }

    /**
     * Input Transformer class related to this locator.
     *
     * @return {TransformerInterface.prototype}
     */
    getOutputTransformerClass() {
        this.defineInterfaceMethod();
    }
}
