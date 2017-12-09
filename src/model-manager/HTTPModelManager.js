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
        /** @protected */
        this._locator = locator;
        /** @protected */
        this._client = httpClient;
    }

    /**
     * @inheritdoc
     */
    get(id, modelClass, options = {}) {
        return new Promise((resolve, reject) => {
            this._client.get(this._locator.locateById(id), this._getRequestOptions()).then((response) => {
                resolve(new modelClass(this.createInputTransformer().transform(response.data)));
            }).catch((e) => {
                reject(e);
            });
        });
    }

    /**
     * @inheritdoc
     */
    save(model, options = {}) {
        return new Promise((resolve, reject) => {
            const requestOptions = this._getRequestOptions({
                data: this.createOutputTransformer().transform(model)
            });

            const method = this._locator.isEmptyModelId(model) ? this._client.post : this._client.put;
            method(this._locator.locate(model), requestOptions).then(() => {
                resolve(true);
            }).catch((e) => {
                reject(e);
            });
        });
    }

    /**
     * @inheritdoc
     */
    remove(model, options = {}) {
        return new Promise((resolve, reject) => {
            this._client.delete(this._locator.locate(model), this._getRequestOptions()).then(() => {
                resolve(true);
            }).catch((e) => {
                reject(e);
            });
        });
    }

    /**
     * Create input transformer object.
     *
     * @return {TransformerInterface}
     */
    createInputTransformer() {
        const Transformer = this._locator.getInputTransformerClass();

        return new Transformer();
    }

    /**
     * Create output transformer object.
     *
     * @return {TransformerInterface}
     */
    createOutputTransformer() {
        const Transformer = this._locator.getOutputTransformerClass();

        return new Transformer();
    }

    /**
     * Common request options.
     * This method is for overwriting.
     *
     * @protected
     */
    _getRequestOptions(additional = {}) {
        return additional;
    }
}
