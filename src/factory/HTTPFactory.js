import FactoryInterface from './FactoryInterface';
import createClient from '../http/createClient';

export default class HTTPFactory extends FactoryInterface {
    /**
     * @inheritdoc
     *
     * @param {HTTPLocatorAbstract} locator
     * @return {HTTPModelManager}
     */
    createManager(locator) {
        const Manager = locator.getModelManagerClass();

        return new Manager(locator, createClient(locator));
    }

    /**
     * @inheritdoc
     *
     * @param {Model.prototype} modelClass
     * @param {HTTPLocatorAbstract} locator
     * @return {HTTPRepository}
     */
    createRepository(modelClass, locator) {
        const Repository = locator.getRepositoryClass();
        const manager = this.createManager(locator);

        return new Repository(modelClass, locator, manager, createClient(locator));
    }
}
