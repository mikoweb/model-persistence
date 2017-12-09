import ModelManagerInterface from './ModelManagerInterface';

/**
 * Data persistence layer - common.
 */
export default class ModelManagerAbstract extends ModelManagerInterface {
    /**
     * Create input transformer object.
     *
     * @return {TransformerInterface}
     */
    createInputTransformer() {
        const Transformer = this._locator.getInputTransformerClass();

        return new Transformer();
    }

    /**
     * Create output transformer object.
     *
     * @return {TransformerInterface}
     */
    createOutputTransformer() {
        const Transformer = this._locator.getOutputTransformerClass();

        return new Transformer();
    }
}
