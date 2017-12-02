import LocatorAbstract from './LocatorAbstract';
import HTTPModelManager from '../model-manager/HTTPModelManager';
import HTTPRepository from '../repository/HTTPRepository';

/**
 * Locator which locates data by HTTP protocol.
 */
export default class HTTPLocatorAbstract extends LocatorAbstract {
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
     * @inheritdoc
     */
    locate(model, options = {}) {
        return this.isEmptyModelId(model)
            ? this.getBaseURL()
            : this.locateById(this.getModelId(model), options);
    }

    /**
     * @inheritdoc
     */
    locateById(id, options = {}) {
        return this.getUrl(`/${id}`);
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
