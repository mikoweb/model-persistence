import ModelManagerAbstract from './ModelManagerAbstract';

/**
 * Data persistence by Web Storage API.
 * @url https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export default class StorageModelManager extends ModelManagerAbstract {
    /**
     * @param {StorageLocatorAbstract} locator
     */
    constructor(locator) {
        super();
        /** @protected */
        this._locator = locator;
    }

    /**
     * @inheritdoc
     *
     * @return {Promise.<Model>}
     */
    get(id, modelClass, options = {}) {
        let model;

        try {
            model = this.getSync(id, modelClass, options);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(model);
    }

    /**
     * Synchronous version of the `get` method.
     *
     * @param id
     * @param {Model.prototype} modelClass
     * @param {Object} [options]
     *
     * @return {Model}
     */
    getSync(id, modelClass, options = {}) {
        const item = this._locator.storage.getItem(this._locator.locateById(id));

        if (item === null) {
            throw new TypeError('expecting getItem() to be String, got null');
        }

        return new modelClass(this.createInputTransformer().transform(JSON.parse(item)));
    }

    /**
     * @inheritdoc
     */
    save(model, options = {}) {
        try {
            this.saveSync(model, options);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(true);
    }

    /**
     * Synchronous version of the `save` method.
     *
     * @param {Model} model
     * @param {Object} [options]
     */
    saveSync(model, options = {}) {
        this._locator.storage.setItem(this._locator.locate(model),
            JSON.stringify(this.createOutputTransformer().transform(model)));
    }

    /**
     * @inheritdoc
     */
    remove(model, options = {}) {
        try {
            this.removeSync(model, options);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(true);
    }

    /**
     * Synchronous version of the `remove` method.
     *
     * @param {Model} model
     * @param {Object} [options]
     */
    removeSync(model, options = {}) {
        this._locator.storage.removeItem(this._locator.locate(model));
    }

    /**
     * Does exists an item with given id?
     *
     * @param id
     *
     * @return {boolean}
     */
    has(id) {
        return this._locator.storage.getItem(this._locator.locateById(id)) !== null;
    }
}
