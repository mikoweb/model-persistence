import Interface from '../core/Interface';

/**
 * Data persistence layer.
 */
export default class ModelManagerInterface extends Interface {
    /**
     * Get model by id from storage.
     *
     * @async
     * @param id
     * @param {Model.prototype} modelClass
     * @param {Object} [options]
     * @return {Promise.<Model>}
     */
    get(id, modelClass, options = {}) {
        this.defineInterfaceMethod();
    }

    /**
     * Save model to storage.
     *
     * @async
     * @param {Model} model
     * @param {Object} [options]
     * @return {Promise.<Boolean>}
     */
    save(model, options = {}) {
        this.defineInterfaceMethod();
    }

    /**
     * Remove model from storage.
     *
     * @async
     * @param {Model} model
     * @param {Object} [options]
     * @return {Promise.<Boolean>}
     */
    remove(model, options = {}) {
        this.defineInterfaceMethod();
    }
}
