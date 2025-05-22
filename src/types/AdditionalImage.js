// AdditionalImage.js   

/**
 * @typedef {object} AdditionalImage
 * @property {number} product_image_id  
 * @property {number} product_id  
 * @property {string} product_image_url  
 * @property {string} created_at  
 */ 

/**
 * Create new AdditionalImage object
 * @param {number} product_image_id  
 * @param {number} product_id  
 * @param {string} product_image_url  
 * @param {string} created_at  
 * @returns {AdditionalImage}
 */
function createNewAdditionalImage(product_image_id, product_id, product_image_url, created_at) {
    return {
        product_image_id,
        product_id,
        product_image_url,
        created_at
    }
}

export default {}