import TransformerInterface from './TransformerInterface';

/**
 * CustomTransformer for dynamic method definition.
 */
export default class CustomTransformer extends TransformerInterface {
}

// EXAMPLE
// Code inside Locator class.
//getOutputTransformerClass() {
    //return class extends CustomTransformer {
        //transform(object) {
            //return {
                //newPropertyName: object.oldPropertyName,
                // ...
            //};
        //}
    //};
//}
