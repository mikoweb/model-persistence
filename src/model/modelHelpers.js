import Model from 'objectmodel';

class ModelHelpers {
    /**
     * Get raw object data from model.
     *
     * @param {Model} model
     * @param {boolean} isRaw
     * @return {Object}
     */
    getData(model, isRaw = false) {
        if (!isRaw && !this.isModel(model)) {
            throw new TypeError(`expecting model to be Model, got ${typeof model}`);
        }

        const data = {};

        // This work's with ObjectModel 2.x version.
        // For 3.x major must be changed to Object.keys()
        for (const prop in model) {
            if (model.hasOwnProperty(prop)) {
                const descriptor = Object.getOwnPropertyDescriptor(model, prop);

                if (typeof descriptor.get === 'function' && typeof model[prop] !== 'undefined') {
                    const value = model[prop];

                    data[prop] = this.isRawObject(value) || this.isModel(value) ? this.getData(value, true) : value;
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
    isModel(object) {
        return object !== null && typeof object === 'object' && (object instanceof Model ||
            (typeof object.constructor === 'function' && object.constructor instanceof Model));
    }

    /**
     * Is raw model?
     *
     * @param {Object} object
     */
    isRawObject(object) {
        return object !== null && typeof object === 'object' && object.constructor === Object
    }
}

const helpers = new ModelHelpers();

export default helpers;
