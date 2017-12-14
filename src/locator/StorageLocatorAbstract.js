import LocatorAbstract from './LocatorAbstract';
import StorageModelManager from '../model-manager/StorageModelManager';
import StorageRepository from '../repository/StorageRepository';

/**
 * Locator to Storage API.
 * @url https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export default class StorageLocatorAbstract extends LocatorAbstract {
    /**
     * Web Storage API.
     *
     * @return {Storage}
     */
    get storage() {
        throw new Error('storage should be defined in StorageLocator');
    }

    /**
     * Base path in URL.
     *
     * @return {string}
     */
    get basePath() {
        throw new Error('basePath should be defined in StorageLocator');
    }

    /**
     * @inheritdoc
     */
    locate(model, options = {}) {
        if (this.isEmptyModelId(model)) {
            throw new Error('Model Id cannot be empty in StorageLocator');
        }

        return this.locateById(this.getModelId(model), options);
    }

    /**
     * @inheritdoc
     */
    locateById(id, options = {}) {
        return `${this.basePath}/${id}`;
    }

    /**
     * @inheritdoc
     *
     * @return {StorageModelManager.prototype}
     */
    getModelManagerClass() {
        return StorageModelManager;
    }

    /**
     * @inheritdoc
     *
     * @return {StorageRepository.prototype}
     */
    getRepositoryClass() {
        return StorageRepository;
    }
}
