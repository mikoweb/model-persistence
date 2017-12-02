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
     * @return {Promise.<Model>}
     */
    get(id, modelClass) {
        this.defineInterfaceMethod();
    }

    /**
     * Save model to storage.
     *
     * @async
     * @param {Model} model
     * @return {Promise.<Boolean>}
     */
    save(model) {
        this.defineInterfaceMethod();
    }

    /**
     * Remove model from storage.
     *
     * @async
     * @param {Model} model
     * @return {Promise.<Boolean>}
     */
    remove(model) {
        this.defineInterfaceMethod();
    }
}
