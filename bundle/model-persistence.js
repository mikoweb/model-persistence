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
            if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) !== 'object' || !model.hasOwnProperty(this.getIdPropName())) {
                new Error('Model has no property ' + this.getIdPropName());
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

        var _this = possibleConstructorReturn(this, (HTTPModelManager.__proto__ || Object.getPrototypeOf(HTTPModelManager)).call(this));

        _this._locator = locator;
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
                    resolve(new modelClass(response.data));
                }).catch(function (e) {
                    return function () {
                        reject(e);
                    };
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
                var request = void 0;
                var requestOptions = _this3._getRequestOptions({
                    data: {
                        // TODO get data from model
                    }
                });

                if (_this3._locator.isEmptyModelId(model)) {
                    request = _this3._client.post(_this3._locator.locate(model), requestOptions);
                } else {
                    request = _this3._client.put(_this3._locator.locate(model), requestOptions);
                }

                request.then(function () {
                    resolve(true);
                }).catch(function (e) {
                    return function () {
                        reject(e);
                    };
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
                    return function () {
                        reject(e);
                    };
                });
            });
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
     */

  }, {
    key: 'getModelManagerClass',
    value: function getModelManagerClass() {
      return HTTPModelManager;
    }

    /**
     * @inheritdoc
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
     * @return {string|null}
     */
    get: function get$$1() {
      return null;
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

/**
 * @param {HTTPLocatorAbstract} locator
 * @return {AxiosInstance}
 */
var createClient = function createClient(locator) {
    return axios.create({
        baseURL: locator.getBaseURL(),
        headers: locator.headers
    });
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
            return new HTTPModelManager(locator, createClient(locator));
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
            var manager = this.createManager(locator);

            return new HTTPRepository(modelClass, locator, manager, createClient(locator));
        }
    }]);
    return HTTPFactory;
}();

var factory = new HTTPFactory();

var index = {
    Model: Model,
    LocatorInterface: LocatorInterface,
    ModelManagerInterface: ModelManagerInterface,
    RepositoryInterface: RepositoryInterface,
    HTTPLocatorAbstract: HTTPLocatorAbstract,
    HTTPModelManager: HTTPModelManager,
    HTTPRepository: HTTPRepository,
    httpFactory: factory,
    http: {
        createClient: createClient
    }
};

return index;

})));
//# sourceMappingURL=model-persistence.js.map
