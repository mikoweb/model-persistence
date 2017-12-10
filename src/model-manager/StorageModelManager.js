import ModelManagerAbstract from './ModelManagerAbstract';
import Model from 'objectmodel';

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
     * Get all stored Models.
     *
     * @param {Model.prototype} modelClass
     *
     * @return {Model.Array}
     */
    getAll(modelClass) {
        const ArrayModel = new Model.Array(modelClass);
        const items = [];

        this.getKeys().forEach((id) => {
            items.push(this.getSync(id, modelClass));
        });

        return ArrayModel(items);
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

        this._persistId(this._locator.getModelId(model));
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
        this._removeId(this._locator.getModelId(model));
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

    /**
     * Return Array with all stored models ids.
     */
    getKeys() {
        const ids = [];
        const item = this._locator.storage.getItem(this._getIdsKey());

        if (item !== null) {
            let data;

            try {
                data = JSON.parse(item);
            } catch (e) {
                data = [];
            }

            if (Array.isArray(data)) {
                data.forEach((id) => {
                    if (id !== null && this.has(id) && typeof id.toString === 'function'
                        && ids.indexOf(id.toString()) === -1
                    ) {
                        ids.push(id.toString());
                    }
                });
            }
        }

        return ids;
    }

    /**
     * The key that gives access to Models Ids.
     *
     * @return {string}
     *
     * @protected
     */
    _getIdsKey() {
        return '__ids__' + this._locator.basePath;
    }

    /**
     * Persist Model Id.
     *
     * @param id
     *
     * @protected
     */
    _persistId(id) {
        if (id !== null && this.has(id) && typeof id.toString === 'function') {
            const ids = this.getKeys();

            if (ids.indexOf(id.toString()) === -1) {
                ids.push(id.toString());
                this._locator.storage.setItem(this._getIdsKey(), JSON.stringify(ids));
            }
        }
    }

    /**
     * Remove Model Id.
     *
     * @param id
     *
     * @protected
     */
    _removeId(id) {
        const ids = this.getKeys().filter(el => el.toString() !== id.toString());
        this._locator.storage.setItem(this._getIdsKey(), JSON.stringify(ids));
    }
}
