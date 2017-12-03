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
            let data = object;

            transformers.forEach((transformer) => {
                data = transformer.transform(data);
            });

            return data;
        }
    };
};

export default mergeTransformers;
