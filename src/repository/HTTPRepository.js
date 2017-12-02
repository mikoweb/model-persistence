import RepositoryInterface from './RepositoryInterface';

/**
 * Data collection from HTTP protocol.
 */
export default class HTTPRepository extends RepositoryInterface {
    /**
     * @param {Model.prototype} modelClass
     * @param {HTTPLocatorAbstract} locator
     * @param {HTTPModelManager} manager
     * @param {AxiosInstance} httpClient
     */
    constructor(modelClass, locator, manager, httpClient) {
        super();
        /** @protected */
        this._modelClass = modelClass;
        /** @protected */
        this._locator = locator;
        /** @protected */
        this._manager = manager;
        /** @protected */
        this._client = httpClient;
    }

    /**
     * @inheritdoc
     */
    findOne(id) {
        return this._manager.get(id, this._modelClass);
    }
}
