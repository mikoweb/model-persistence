import TransformerInterface from './TransformerInterface';

/**
 * @param {Array.<TransformerInterface>} transformers
 */
const mergeTransformers = (transformers) => {
    return class extends TransformerInterface {
        /**
         * @inheritdoc
         */
        transform(object) {
            transformers.forEach((transformer) => {
                transformer.transform(object);
            });
        }
    };
};

export default mergeTransformers;
