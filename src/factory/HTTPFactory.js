import HTTPModelManager from '../model-manager/HTTPModelManager';
import HTTPRepository from '../repository/HTTPRepository';
import createClient from '../http/createClient';

export default class HTTPFactory {
    /**
     * Create ModelManager object.
     *
     * @param {HTTPLocatorAbstract} locator
     * @return {HTTPModelManager}
     */
    createManager(locator) {
        return new HTTPModelManager(locator, createClient(locator));
    }

    /**
     * Create Repository object.
     *
     * @param {Model.prototype} modelClass
     * @param {HTTPLocatorAbstract} locator
     * @return {HTTPRepository}
     */
    createRepository(modelClass, locator) {
        const manager = this.createManager(locator);

        return new HTTPRepository(modelClass, locator, manager, createClient(locator));
    }
}
