// ProductTypes.js

/**
 * @typedef {object} ProductType
 * @property {number} product_id 
 * @property {string} product_name 
 * @property {number} product_price
 * @property {number} product_quantity
 * @property {string} product_details
 * @property {string} product_featured_image_url
 * @property {number} category_id 
 * @property {string} category_name
 * @property {string} formatted_product_price 
 */

/**
 * Creates a new ProductType object with validation and default values.
 * @param {object} rawData - The raw data to create the product from.
 * @param {number} rawData.product_id
 * @param {string} rawData.product_name
 * @param {number} rawData.product_price
 * @param {number} [rawData.product_quantity=0]
 * @param {string} [rawData.product_details='']
 * @param {string} [rawData.product_featured_image_url='']
 * @param {number} rawData.category_id
 * @param {string} rawData.category_name
 * @returns {ProductType} The validated and structured product object.
 * @throws {Error} If required properties are missing or have wrong types.
 */
export function createProduct(rawData) {
  if (typeof rawData.product_id !== 'number') {
    throw new Error('product_id must be a number.');
  }
  if (typeof rawData.product_name !== 'string' || rawData.product_name.trim() === '') {
    throw new Error('product_name must be a non-empty string.');
  }
  if (typeof rawData.product_price !== 'number' || rawData.product_price < 0) {
    throw new Error('product_price must be a non-negative number.');
  }


  return {
    product_id: rawData.product_id,
    product_name: rawData.product_name,
    product_price: rawData.product_price,
    product_quantity: rawData.product_quantity ?? 0, // Default to 0 if undefined/null
    product_details: rawData.product_details ?? '',
    product_featured_image_url: rawData.product_featured_image_url ?? '',
    category_id: rawData.category_id,
    category_name: rawData.category_name,
    // Derive formatted_product_price
    formatted_product_price: `$${rawData.product_price.toFixed(2)}`,
  };
}

export default {};