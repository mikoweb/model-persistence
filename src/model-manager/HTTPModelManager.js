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
            this._client.get().then((response) => {
                resolve(new modelClass());
            }).catch((e) => () => {
                reject(e);
            });
        });
    }

    /**
     * @inheritdoc
     */
    save(model) {
        return new Promise((resolve, reject) => {
            let request;

            if (this._locator.isEmptyModelId(model)) {
                // TODO
                request = this._client.post();
            } else {
                // TODO
                request = this._client.put();
            }

            request.then(() => {
                resolve(true);
            }).catch((e) => () => {
                reject(e);
            });
        });
    }

    /**
     * @inheritdoc
     */
    remove(model) {
        return new Promise((resolve, reject) => {
            // TODO
            this._client.delete().then(() => {
                resolve(true);
            }).catch((e) => () => {
                reject(e);
            });
        });
    }
}
