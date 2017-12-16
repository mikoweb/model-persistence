import FactoryInterface from './FactoryInterface';

export default class StorageFactory extends FactoryInterface {
    /**
     * @inheritdoc
     *
     * @param {StorageLocatorAbstract} locator
     * @return {StorageModelManager}
     */
    createManager(locator) {
        const Manager = locator.getModelManagerClass();

        return new Manager(locator);
    }

    /**
     * @inheritdoc
     *
     * @param {Model.prototype} modelClass
     * @param {StorageLocatorAbstract} locator
     * @return {StorageRepository}
     */
    createRepository(modelClass, locator) {
        const Repository = locator.getRepositoryClass();
        const manager = this.createManager(locator);

        return new Repository(modelClass, locator, manager);
    }
}
