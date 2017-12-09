import RepositoryInterface from './RepositoryInterface';

/**
 * Data collection from Web Storage API.
 * @url https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export default class StorageRepository extends RepositoryInterface {
    /**
     * @param {Model.prototype} modelClass
     * @param {StorageLocatorAbstract} locator
     * @param {StorageModelManager} manager
     */
    constructor(modelClass, locator, manager) {
        super();
        /** @protected */
        this._modelClass = modelClass;
        /** @protected */
        this._locator = locator;
        /** @protected */
        this._manager = manager;
    }

    /**
     * @inheritdoc
     */
    findOne(id) {
        return this._manager.get(id, this._modelClass);
    }

    /**
     * Synchronous version of the `findOne` method.
     *
     * @param id
     *
     * @return {Model}
     */
    findOneSync(id) {
        return this._manager.getSync(id, this._modelClass);
    }
}
