class ClientConfig {
    constructor() {
        this.options = {};
    }

    /**
     * @return {Object}
     */
    get options() {
        return Object.assign({}, this._options);
    }

    /**
     * @param {Object} options
     */
    set options(options) {
        this._options = Object.assign({}, options);
    }
}

const options = new ClientConfig();

export default options;
