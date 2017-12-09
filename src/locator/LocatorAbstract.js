import LocatorInterface from './LocatorInterface';
import InputTransformer from '../transformer/InputTransformer';
import OutputTransformer from '../transformer/OutputTransformer';

/**
 * Abstract Locator with common methods.
 */
export default class LocatorAbstract extends LocatorInterface {
    /**
     * @inheritdoc
     */
    getIdPropName() {
        return 'id';
    }

    /**
     * @inheritdoc
     */
    getModelId(model) {
        if (model === null || typeof model !== 'object') {
            throw new Error('argument is not Object');
        }

        return model[this.getIdPropName()];
    }

    /**
     * @inheritdoc
     */
    isEmptyModelId(model) {
        const id = this.getModelId(model);

        return id === null || typeof id === 'undefined' || (typeof id === 'string' && id.length === 0);
    }

    /**
     * @inheritdoc
     */
    getInputTransformerClass() {
        return InputTransformer;
    }

    /**
     * @inheritdoc
     */
    getOutputTransformerClass() {
        return OutputTransformer;
    }
}
