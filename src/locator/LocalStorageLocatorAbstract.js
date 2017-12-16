import StorageLocatorAbstract from './StorageLocatorAbstract';

/**
 * Locator to localStorage.
 * @url https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
export default class LocalStorageLocatorAbstract extends StorageLocatorAbstract {
    /**
     * @inheritdoc
     */
    get storage() {
        return localStorage;
    }
}
