import Interface from '../core/Interface';

/**
 * Repository pattern - data collection.
 */
export default class RepositoryInterface extends Interface {
    /**
     * Find one model by id from storage.
     *
     * @async
     * @param id
     * @return {Promise.<Model>}
     */
    findOne(id) {
        this.defineInterfaceMethod();
    }
}
