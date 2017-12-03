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
import TransformerInterface from './transformer/TransformerInterface';
import InputTransformer from './transformer/InputTransformer';
import OutputTransformer from './transformer/OutputTransformer';
import CustomTransformer from './transformer/CustomTransformer';
import modelHelpers from './model/modelHelpers';

export default {
    Model,
    modelHelpers,
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
    },
    transformer: {
        TransformerInterface,
        InputTransformer,
        OutputTransformer,
        CustomTransformer
    }
};
