import axios from 'axios';
import config from './clientConfig';

/**
 * @param {HTTPLocatorAbstract} locator
 * @return {AxiosInstance}
 */
const createClient = (locator) => {
    return axios.create(Object.assign({}, config.options, {
        baseURL: locator.getBaseURL(),
        headers: locator.headers
    }));
};

export default createClient;
