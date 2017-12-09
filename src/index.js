import namespace from './core/namespace';
import Model from 'objectmodel'; // http://objectmodel.js.org/docs/v2/
import DynamicModel from './model/DynamicModel';
import Interface from './core/Interface';
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
import mergeTransformers from './transformer/mergeTransformers';
import modelHelpers from './model/modelHelpers';

const modelPersist = {
    Interface,
    Model,
    DynamicModel,
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
        CustomTransformer,
        mergeTransformers
    }
};

namespace(modelPersist);

export default modelPersist;
