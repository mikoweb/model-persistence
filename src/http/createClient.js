import axios from 'axios';
import config from './clientConfig';

/**
 * @param {HTTPLocatorAbstract} locator
 * @return {AxiosInstance}
 */
const createClient = (locator) => {
    const options = {};

    if (locator !== null && typeof locator === 'object' && Object.keys(locator.headers).length > 0) {
        options.headers = Object.assign({}, locator.headers);
    }

    return axios.create(Object.assign({}, config.options, options));
};

export default createClient;
