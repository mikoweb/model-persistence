import axios from 'axios';

/**
 * @param {HTTPLocatorAbstract} locator
 * @return {AxiosInstance}
 */
const createClient = (locator) => {
    return axios.create({
        baseURL: locator.getBaseURL(),
        headers: locator.headers
    });
};

export default createClient;
