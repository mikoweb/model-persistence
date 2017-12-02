import LocatorInterface from './LocatorInterface';
import HTTPModelManager from '../model-manager/HTTPModelManager';
import HTTPRepository from '../repository/HTTPRepository';

/**
 * Locator which locates data by HTTP protocol.
 */
export default class HTTPLocatorAbstract extends LocatorInterface {
    /**
     * Host path like https://google.com. It's optionally.
     *
     * @return {string|null}
     */
    get hostPath() {
        return null;
    }

    /**
     * Base path in URL.
     *
     * @return {string}
     */
    get basePath() {
        throw new Error('basePath should be defined in HTTPLocator');
    }

    /**
     * Additional headers e.g. api key.
     *
     * @return {Object}
     */
    get headers() {
        return {};
    }

    /**
     * @inheritdoc
     */
    getIdPropName() {
        return 'id';
    }

    /**
     * Get base URL.
     *
     * @return {string}
     */
    getBaseURL() {
        return `${this.hostPath}${this.basePath}`;
    }

    /**
     * Get custom URL.
     *
     * @param {string} path
     * @return {string}
     */
    getUrl(path) {
        return `${this.getBaseURL()}${path}`;
    }

    /**
     * Get id from model.
     *
     * @param {Model} model
     * @return {*}
     */
    getModelId(model) {
        if (typeof model !== 'object' || !model.hasOwnProperty(this.getIdPropName())) {
            new Error('Model has no property ' + this.getIdPropName());
        }

        return model[this.getIdPropName()];
    }

    /**
     * Is empty model id?
     * @param {Model} model
     * @return {boolean}
     */
    isEmptyModelId(model) {
        const id = this.getModelId(model);

        return id === null || typeof id === 'undefined' || (typeof id === 'string' && id.length === 0);
    }

    /**
     * @inheritdoc
     */
    locate(model, options = {}) {
        const id = this.getModelId(model);

        return this.getUrl(this.isEmptyModelId(model) ? '' : `/${id}`);
    }

    /**
     * @inheritdoc
     */
    getModelManagerClass() {
        return HTTPModelManager;
    }

    /**
     * @inheritdoc
     */
    getRepositoryClass() {
        return HTTPRepository;
    }
}
