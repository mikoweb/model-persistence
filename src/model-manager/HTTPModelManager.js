import ModelManagerInterface from './ModelManagerInterface';

/**
 * Data persistence by HTTP protocol.
 */
export default class HTTPModelManager extends ModelManagerInterface {
    /**
     * @param {HTTPLocatorAbstract} locator
     * @param {AxiosInstance} httpClient
     */
    constructor(locator, httpClient) {
        super();
        this._locator = locator;
        this._client = httpClient;
    }

    /**
     * @inheritdoc
     */
    get(id, modelClass) {
        return new Promise((resolve, reject) => {
            // TODO
        });
    }

    /**
     * @inheritdoc
     */
    save(model) {
        return new Promise((resolve, reject) => {
            // TODO
        });
    }

    /**
     * @inheritdoc
     */
    remove(model) {
        return new Promise((resolve, reject) => {
            // TODO
        });
    }
}
