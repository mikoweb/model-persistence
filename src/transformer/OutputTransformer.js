import TransformerInterface from './TransformerInterface';
import modelHelpers from '../model/modelHelpers';
import DynamicModel from '../model/DynamicModel';

/**
 * Default output transformer.
 * Used as "middleware" between Model and data storage (e.g. HTTP Request).
 */
export default class OutputTransformer extends TransformerInterface {
    /**
     * Only properties from model schema.
     *
     * @inheritdoc
     */
    transform(object) {
        let data = {};

        if (modelHelpers.isModel(object)) {
            data = modelHelpers.getData(object);
        } else if (object instanceof DynamicModel || modelHelpers.isRawObject(object)) {
            data = object;
        }

        return data;
    }
}
