import TransformerInterface from './TransformerInterface';

/**
 * Default input transformer.
 * Used as "middleware" between data source (e.g. HTTP Response) and Model constructor.
 */
export default class InputTransformer extends TransformerInterface {
    /**
     * By default, nothing changes.
     *
     * @inheritdoc
     */
    transform(object) {
        return object;
    }
}
