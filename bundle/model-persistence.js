(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('objectmodel'), require('axios')) :
	typeof define === 'function' && define.amd ? define(['objectmodel', 'axios'], factory) :
	(global.modelPersist = factory(global.Model,global.axios));
}(this, (function (Model,axios) { 'use strict';

Model = Model && Model.hasOwnProperty('default') ? Model['default'] : Model;
axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * It's shit model type like object literal. No schema, no strong typing, no validation, no nothing.
 */
var DynamicModel = function () {
    /**
     * @param {Object} object
     */
    function DynamicModel(object) {
        classCallCheck(this, DynamicModel);

        if (object === null || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
            throw new TypeError('expecting object literal');
        }

        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                this[prop] = object[prop];
            }
        }
    }

    /**
     * @return {string}
     */


    createClass(DynamicModel, [{
        key: 'toJSON',
        value: function toJSON() {
            return JSON.stringify(this);
        }
    }]);
    return DynamicModel;
}();

var Interface = function () {
    function Interface() {
        classCallCheck(this, Interface);
    }

    createClass(Interface, [{
        key: 'defineInterfaceMethod',
        value: function defineInterfaceMethod() {
            throw new Error('Class should implement this method');
        }
    }]);
    return Interface;
}();

/**
 * Data locator.
 */

var LocatorInterface = function (_Interface) {
  inherits(LocatorInterface, _Interface);

  function LocatorInterface() {
    classCallCheck(this, LocatorInterface);
    return possibleConstructorReturn(this, (LocatorInterface.__proto__ || Object.getPrototypeOf(LocatorInterface)).apply(this, arguments));
  }

  createClass(LocatorInterface, [{
    key: 'locate',

    /**
     * Locate place where model is storage.
     *
     * @param {Model} model
     * @param {Object} [options]
     * @return {string}
     */
    value: function locate(model) {
      this.defineInterfaceMethod();
    }

    /**
     * Locate place by id.
     *
     * @param id
     * @param {Object} [options]
     * @return {string}
     */

  }, {
    key: 'locateById',
    value: function locateById(id) {
      this.defineInterfaceMethod();
    }

    /**
     * Name of id property.
     *
     * @return {string}
     */

  }, {
    key: 'getIdPropName',
    value: function getIdPropName() {
      this.defineInterfaceMethod();
    }

    /**
     * Get id from model.
     *
     * @param {Model} model
     * @return {*}
     */

  }, {
    key: 'getModelId',
    value: function getModelId(model) {
      this.defineInterfaceMethod();
    }

    /**
     * Is empty model id?
     *
     * @param {Model} model
     * @return {boolean}
     */

  }, {
    key: 'isEmptyModelId',
    value: function isEmptyModelId(model) {
      this.defineInterfaceMethod();
    }

    /**
     * ModelManagerClass related to this locator.
     *
     * @return {ModelManagerInterface.prototype}
     */

  }, {
    key: 'getModelManagerClass',
    value: function getModelManagerClass() {
      this.defineInterfaceMethod();
    }

    /**
     * RepositoryClass related to this locator.
     *
     * @return {RepositoryInterface.prototype}
     */

  }, {
    key: 'getRepositoryClass',
    value: function getRepositoryClass() {
      this.defineInterfaceMethod();
    }

    /**
     * Input Transformer class related to this locator.
     *
     * @return {TransformerInterface.prototype}
     */

  }, {
    key: 'getInputTransformerClass',
    value: function getInputTransformerClass() {
      this.defineInterfaceMethod();
    }

    /**
     * Input Transformer class related to this locator.
     *
     * @return {TransformerInterface.prototype}
     */

  }, {
    key: 'getOutputTransformerClass',
    value: function getOutputTransformerClass() {
      this.defineInterfaceMethod();
    }
  }]);
  return LocatorInterface;
}(Interface);

/**
 * Data persistence layer.
 */

var ModelManagerInterface = function (_Interface) {
  inherits(ModelManagerInterface, _Interface);

  function ModelManagerInterface() {
    classCallCheck(this, ModelManagerInterface);
    return possibleConstructorReturn(this, (ModelManagerInterface.__proto__ || Object.getPrototypeOf(ModelManagerInterface)).apply(this, arguments));
  }

  createClass(ModelManagerInterface, [{
    key: 'get',

    /**
     * Get model by id from storage.
     *
     * @async
     * @param id
     * @param {Model.prototype} modelClass
     * @param {Object} [options]
     * @return {Promise.<Model>}
     */
    value: function get$$1(id, modelClass) {
      this.defineInterfaceMethod();
    }

    /**
     * Save model to storage.
     *
     * @async
     * @param {Model} model
     * @param {Object} [options]
     * @return {Promise.<Boolean>}
     */

  }, {
    key: 'save',
    value: function save(model) {
      this.defineInterfaceMethod();
    }

    /**
     * Remove model from storage.
     *
     * @async
     * @param {Model} model
     * @param {Object} [options]
     * @return {Promise.<Boolean>}
     */

  }, {
    key: 'remove',
    value: function remove(model) {
      this.defineInterfaceMethod();
    }
  }]);
  return ModelManagerInterface;
}(Interface);

/**
 * Repository pattern - data collection.
 */

var RepositoryInterface = function (_Interface) {
  inherits(RepositoryInterface, _Interface);

  function RepositoryInterface() {
    classCallCheck(this, RepositoryInterface);
    return possibleConstructorReturn(this, (RepositoryInterface.__proto__ || Object.getPrototypeOf(RepositoryInterface)).apply(this, arguments));
  }

  createClass(RepositoryInterface, [{
    key: 'findOne',

    /**
     * Find one model by id from storage.
     *
     * @async
     * @param id
     * @return {Promise.<Model>}
     */
    value: function findOne(id) {
      this.defineInterfaceMethod();
    }
  }]);
  return RepositoryInterface;
}(Interface);

/**
 * Data Transformer.
 */

var TransformerInterface = function (_Interface) {
  inherits(TransformerInterface, _Interface);

  function TransformerInterface() {
    classCallCheck(this, TransformerInterface);
    return possibleConstructorReturn(this, (TransformerInterface.__proto__ || Object.getPrototypeOf(TransformerInterface)).apply(this, arguments));
  }

  createClass(TransformerInterface, [{
    key: 'transform',

    /**
     * Transform data.
     *
     * @async
     * @param {Object} object
     * @return {Object}
     */
    value: function transform(object) {
      this.defineInterfaceMethod();
    }
  }]);
  return TransformerInterface;
}(Interface);

/**
 * Default input transformer.
 * Used as "middleware" between data source (e.g. HTTP Response) and Model constructor.
 */

var InputTransformer = function (_TransformerInterface) {
  inherits(InputTransformer, _TransformerInterface);

  function InputTransformer() {
    classCallCheck(this, InputTransformer);
    return possibleConstructorReturn(this, (InputTransformer.__proto__ || Object.getPrototypeOf(InputTransformer)).apply(this, arguments));
  }

  createClass(InputTransformer, [{
    key: 'transform',

    /**
     * By default, nothing changes.
     *
     * @inheritdoc
     */
    value: function transform(object) {
      return object;
    }
  }]);
  return InputTransformer;
}(TransformerInterface);

var ModelHelpers = function () {
    function ModelHelpers() {
        classCallCheck(this, ModelHelpers);
    }

    createClass(ModelHelpers, [{
        key: 'getData',

        /**
         * Get raw object data from model.
         *
         * @param {Model} model
         * @param {boolean} isRaw
         * @return {Object}
         */
        value: function getData(model) {
            var isRaw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!isRaw && !this.isModel(model)) {
                throw new TypeError('expecting model to be Model, got ' + (typeof model === 'undefined' ? 'undefined' : _typeof(model)));
            }

            var data = {};

            if (this.isModel(model)) {
                // This work's with ObjectModel 2.x version.
                // For 3.x major must be changed to Object.keys()
                for (var prop in model) {
                    if (model.hasOwnProperty(prop)) {
                        var descriptor = Object.getOwnPropertyDescriptor(model, prop);

                        if (typeof descriptor.get === 'function' && typeof model[prop] !== 'undefined') {
                            data[prop] = this._getObjectValue(model, prop);
                        }
                    }
                }
            } else if (this.isRawObject(model)) {
                for (var _prop in model) {
                    if (model.hasOwnProperty(_prop)) {
                        data[_prop] = this._getObjectValue(model, _prop);
                    }
                }
            }

            return data;
        }

        /**
         * Is model?
         *
         * @param {Object} object
         */

    }, {
        key: 'isModel',
        value: function isModel(object) {
            return object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && (object instanceof Model || typeof object.constructor === 'function' && object.constructor instanceof Model);
        }

        /**
         * Is raw model?
         *
         * @param {Object} object
         */

    }, {
        key: 'isRawObject',
        value: function isRawObject(object) {
            return object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Object;
        }

        /**
         * @param {Model|Object} model
         * @param {string} prop
         * @return {*}
         * @private
         */

    }, {
        key: '_getObjectValue',
        value: function _getObjectValue(model, prop) {
            var value = model[prop];

            return this.isRawObject(value) || this.isModel(value) ? this.getData(value, true) : value;
        }
    }]);
    return ModelHelpers;
}();

var helpers = new ModelHelpers();

/**
 * Default output transformer.
 * Used as "middleware" between Model and data storage (e.g. HTTP Request).
 */

var OutputTransformer = function (_TransformerInterface) {
    inherits(OutputTransformer, _TransformerInterface);

    function OutputTransformer() {
        classCallCheck(this, OutputTransformer);
        return possibleConstructorReturn(this, (OutputTransformer.__proto__ || Object.getPrototypeOf(OutputTransformer)).apply(this, arguments));
    }

    createClass(OutputTransformer, [{
        key: 'transform',

        /**
         * Only properties from model schema.
         *
         * @inheritdoc
         */
        value: function transform(object) {
            var data = {};

            if (helpers.isModel(object)) {
                data = helpers.getData(object);
            } else if (object instanceof DynamicModel || helpers.isRawObject(object)) {
                data = object;
            }

            return data;
        }
    }]);
    return OutputTransformer;
}(TransformerInterface);

/**
 * Abstract Locator with common methods.
 */

var LocatorAbstract = function (_LocatorInterface) {
    inherits(LocatorAbstract, _LocatorInterface);

    function LocatorAbstract() {
        classCallCheck(this, LocatorAbstract);
        return possibleConstructorReturn(this, (LocatorAbstract.__proto__ || Object.getPrototypeOf(LocatorAbstract)).apply(this, arguments));
    }

    createClass(LocatorAbstract, [{
        key: 'getIdPropName',

        /**
         * @inheritdoc
         */
        value: function getIdPropName() {
            return 'id';
        }

        /**
         * @inheritdoc
         */

    }, {
        key: 'getModelId',
        value: function getModelId(model) {
            if (model === null || (typeof model === 'undefined' ? 'undefined' : _typeof(model)) !== 'object') {
                throw new Error('argument is not Object');
            }

            return model[this.getIdPropName()];
        }

        /**
         * @inheritdoc
         */

    }, {
        key: 'isEmptyModelId',
        value: function isEmptyModelId(model) {
            var id = this.getModelId(model);

            return id === null || typeof id === 'undefined' || typeof id === 'string' && id.length === 0;
        }

        /**
         * @inheritdoc
         */

    }, {
        key: 'getInputTransformerClass',
        value: function getInputTransformerClass() {
            return InputTransformer;
        }

        /**
         * @inheritdoc
         */

    }, {
        key: 'getOutputTransformerClass',
        value: function getOutputTransformerClass() {
            return OutputTransformer;
        }
    }]);
    return LocatorAbstract;
}(LocatorInterface);

/**
 * Data persistence by HTTP protocol.
 */

var HTTPModelManager = function (_ModelManagerInterfac) {
    inherits(HTTPModelManager, _ModelManagerInterfac);

    /**
     * @param {HTTPLocatorAbstract} locator
     * @param {AxiosInstance} httpClient
     */
    function HTTPModelManager(locator, httpClient) {
        classCallCheck(this, HTTPModelManager);

        /** @protected */
        var _this = possibleConstructorReturn(this, (HTTPModelManager.__proto__ || Object.getPrototypeOf(HTTPModelManager)).call(this));

        _this._locator = locator;
        /** @protected */
        _this._client = httpClient;
        return _this;
    }

    /**
     * @inheritdoc
     */


    createClass(HTTPModelManager, [{
        key: 'get',
        value: function get$$1(id, modelClass) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._client.get(_this2._locator.locateById(id), _this2._getRequestOptions()).then(function (response) {
                    resolve(new modelClass(_this2.createInputTransformer().transform(response.data)));
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * @inheritdoc
         */

    }, {
        key: 'save',
        value: function save(model) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var requestOptions = _this3._getRequestOptions({
                    data: _this3.createOutputTransformer().transform(model)
                });

                var method = _this3._locator.isEmptyModelId(model) ? _this3._client.post : _this3._client.put;
                method(_this3._locator.locate(model), requestOptions).then(function () {
                    resolve(true);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * @inheritdoc
         */

    }, {
        key: 'remove',
        value: function remove(model) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4._client.delete(_this4._locator.locate(model), _this4._getRequestOptions()).then(function () {
                    resolve(true);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        /**
         * Create input transformer object.
         *
         * @return {TransformerInterface}
         */

    }, {
        key: 'createInputTransformer',
        value: function createInputTransformer() {
            var Transformer = this._locator.getInputTransformerClass();

            return new Transformer();
        }

        /**
         * Create output transformer object.
         *
         * @return {TransformerInterface}
         */

    }, {
        key: 'createOutputTransformer',
        value: function createOutputTransformer() {
            var Transformer = this._locator.getOutputTransformerClass();

            return new Transformer();
        }

        /**
         * Common request options.
         * This method is for overwriting.
         *
         * @protected
         */

    }, {
        key: '_getRequestOptions',
        value: function _getRequestOptions() {
            var additional = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return additional;
        }
    }]);
    return HTTPModelManager;
}(ModelManagerInterface);

/**
 * Data collection from HTTP protocol.
 */

var HTTPRepository = function (_RepositoryInterface) {
    inherits(HTTPRepository, _RepositoryInterface);

    /**
     * @param {Model.prototype} modelClass
     * @param {HTTPLocatorAbstract} locator
     * @param {HTTPModelManager} manager
     * @param {AxiosInstance} httpClient
     */
    function HTTPRepository(modelClass, locator, manager, httpClient) {
        classCallCheck(this, HTTPRepository);

        /** @protected */
        var _this = possibleConstructorReturn(this, (HTTPRepository.__proto__ || Object.getPrototypeOf(HTTPRepository)).call(this));

        _this._modelClass = modelClass;
        /** @protected */
        _this._locator = locator;
        /** @protected */
        _this._manager = manager;
        /** @protected */
        _this._client = httpClient;
        return _this;
    }

    /**
     * @inheritdoc
     */


    createClass(HTTPRepository, [{
        key: 'findOne',
        value: function findOne(id) {
            return this._manager.get(id, this._modelClass);
        }
    }]);
    return HTTPRepository;
}(RepositoryInterface);

/**
 * Locator which locates data by HTTP protocol.
 */

var HTTPLocatorAbstract = function (_LocatorAbstract) {
  inherits(HTTPLocatorAbstract, _LocatorAbstract);

  function HTTPLocatorAbstract() {
    classCallCheck(this, HTTPLocatorAbstract);
    return possibleConstructorReturn(this, (HTTPLocatorAbstract.__proto__ || Object.getPrototypeOf(HTTPLocatorAbstract)).apply(this, arguments));
  }

  createClass(HTTPLocatorAbstract, [{
    key: 'getBaseURL',


    /**
     * Get base URL.
     *
     * @return {string}
     */
    value: function getBaseURL() {
      return '' + this.hostPath + this.basePath;
    }

    /**
     * Get custom URL.
     *
     * @param {string} path
     * @return {string}
     */

  }, {
    key: 'getUrl',
    value: function getUrl(path) {
      return '' + this.getBaseURL() + path;
    }

    /**
     * @inheritdoc
     */

  }, {
    key: 'locate',
    value: function locate(model) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.isEmptyModelId(model) ? this.getBaseURL() : this.locateById(this.getModelId(model), options);
    }

    /**
     * @inheritdoc
     */

  }, {
    key: 'locateById',
    value: function locateById(id) {
      return this.getUrl('/' + id);
    }

    /**
     * @inheritdoc
     *
     * @return {HTTPModelManager.prototype}
     */

  }, {
    key: 'getModelManagerClass',
    value: function getModelManagerClass() {
      return HTTPModelManager;
    }

    /**
     * @inheritdoc
     *
     * @return {HTTPRepository.prototype}
     */

  }, {
    key: 'getRepositoryClass',
    value: function getRepositoryClass() {
      return HTTPRepository;
    }
  }, {
    key: 'hostPath',

    /**
     * Host path like https://google.com. It's optionally.
     *
     * @return {string}
     */
    get: function get$$1() {
      return '';
    }

    /**
     * Base path in URL.
     *
     * @return {string}
     */

  }, {
    key: 'basePath',
    get: function get$$1() {
      throw new Error('basePath should be defined in HTTPLocator');
    }

    /**
     * Additional headers e.g. api key.
     *
     * @return {Object}
     */

  }, {
    key: 'headers',
    get: function get$$1() {
      return {};
    }
  }]);
  return HTTPLocatorAbstract;
}(LocatorAbstract);

var ClientConfig = function () {
    function ClientConfig() {
        classCallCheck(this, ClientConfig);

        this.options = {};
    }

    /**
     * @return {Object}
     */


    createClass(ClientConfig, [{
        key: "options",
        get: function get$$1() {
            return Object.assign({}, this._options);
        }

        /**
         * @param {Object} options
         */
        ,
        set: function set$$1(options) {
            this._options = Object.assign({}, options);
        }
    }]);
    return ClientConfig;
}();

var options = new ClientConfig();

/**
 * @param {HTTPLocatorAbstract} locator
 * @return {AxiosInstance}
 */
var createClient = function createClient(locator) {
    var options$$1 = {};

    if (locator !== null && (typeof locator === 'undefined' ? 'undefined' : _typeof(locator)) === 'object' && Object.keys(locator.headers).length > 0) {
        options$$1.headers = Object.assign({}, locator.headers);
    }

    return axios.create(Object.assign({}, options.options, options$$1));
};

var HTTPFactory = function () {
    function HTTPFactory() {
        classCallCheck(this, HTTPFactory);
    }

    createClass(HTTPFactory, [{
        key: 'createManager',

        /**
         * Create ModelManager object.
         *
         * @param {HTTPLocatorAbstract} locator
         * @return {HTTPModelManager}
         */
        value: function createManager(locator) {
            var Manager = locator.getModelManagerClass();

            return new Manager(locator, createClient(locator));
        }

        /**
         * Create Repository object.
         *
         * @param {Model.prototype} modelClass
         * @param {HTTPLocatorAbstract} locator
         * @return {HTTPRepository}
         */

    }, {
        key: 'createRepository',
        value: function createRepository(modelClass, locator) {
            var Repository = locator.getRepositoryClass();
            var manager = this.createManager(locator);

            return new Repository(modelClass, locator, manager, createClient(locator));
        }
    }]);
    return HTTPFactory;
}();

var factory = new HTTPFactory();

/**
 * CustomTransformer for dynamic method definition.
 */

var CustomTransformer = function (_TransformerInterface) {
    inherits(CustomTransformer, _TransformerInterface);

    function CustomTransformer() {
        classCallCheck(this, CustomTransformer);
        return possibleConstructorReturn(this, (CustomTransformer.__proto__ || Object.getPrototypeOf(CustomTransformer)).apply(this, arguments));
    }

    return CustomTransformer;
}(TransformerInterface);

/**
 * @param {Array.<TransformerInterface>} transformers
 */
var mergeTransformers = function mergeTransformers(transformers) {
    return function (_TransformerInterface) {
        inherits(_class, _TransformerInterface);

        function _class() {
            classCallCheck(this, _class);
            return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        createClass(_class, [{
            key: 'transform',

            /**
             * @inheritdoc
             */
            value: function transform(object) {
                var data = object;

                transformers.forEach(function (transformer) {
                    data = transformer.transform(data);
                });

                return data;
            }
        }]);
        return _class;
    }(TransformerInterface);
};

var index = {
    Model: Model,
    DynamicModel: DynamicModel,
    modelHelpers: helpers,
    LocatorInterface: LocatorInterface,
    ModelManagerInterface: ModelManagerInterface,
    RepositoryInterface: RepositoryInterface,
    HTTPLocatorAbstract: HTTPLocatorAbstract,
    HTTPModelManager: HTTPModelManager,
    HTTPRepository: HTTPRepository,
    httpFactory: factory,
    http: {
        createClient: createClient,
        config: options
    },
    transformer: {
        TransformerInterface: TransformerInterface,
        InputTransformer: InputTransformer,
        OutputTransformer: OutputTransformer,
        CustomTransformer: CustomTransformer,
        mergeTransformers: mergeTransformers
    }
};

return index;

})));
//# sourceMappingURL=model-persistence.js.map
