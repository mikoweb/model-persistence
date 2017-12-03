/**
 * It's shit model type like object literal. No schema, no strong typing, no validation, no nothing.
 */
export default class DynamicModel {
    /**
     * @param {Object} object
     */
    constructor(object) {
        if (object === null || typeof object !== 'object') {
            throw new TypeError('expecting object literal');
        }

        for (const prop in object) {
            if (object.hasOwnProperty(prop)) {
                this[prop] = object[prop];
            }
        }
    }

    /**
     * @return {string}
     */
    toJSON() {
        return JSON.stringify(this);
    }
}
