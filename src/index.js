import Model from 'objectmodel'; // http://objectmodel.js.org/docs/v2/
import LocatorInterface from './locator/LocatorInterface';
import ModelManagerInterface from './model-manager/ModelManagerInterface';
import RepositoryInterface from './repository/RepositoryInterface';
import HTTPLocatorAbstract from './locator/HTTPLocatorAbstract';
import HTTPModelManager from './model-manager/HTTPModelManager';
import HTTPRepository from './repository/HTTPRepository';
import httpFactory from './factory/http';
import createHTTPClient from './http/createClient';
import httpClientConfig from './http/clientConfig';

export default {
    Model,
    LocatorInterface,
    ModelManagerInterface,
    RepositoryInterface,
    HTTPLocatorAbstract,
    HTTPModelManager,
    HTTPRepository,
    httpFactory,
    http: {
        createClient: createHTTPClient,
        config: httpClientConfig
    }
};
