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
        if (typeof model !== 'object' || !model.hasOwnProperty(this.getIdPropName())) {
            new Error('Model has no property ' + this.getIdPropName());
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
