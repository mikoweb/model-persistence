import StorageLocatorAbstract from './StorageLocatorAbstract';

/**
 * Locator to sessionStorage.
 * @url https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
export default class SessionStorageLocatorAbstract extends StorageLocatorAbstract {
    /**
     * @inheritdoc
     */
    get storage() {
        return sessionStorage;
    }
}
