import TransformerInterface from './TransformerInterface';

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
        // TODO only properties from model schema (if object is Model)
        return object;
    }
}
