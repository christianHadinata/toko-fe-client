/**
 * @typedef {object} ProfileType
 * @property {string} username 
 * @property {string} phone_number 
 * @property {string} email 
 */ 


/**
 * @param {object} rawData
 * @param {string} rawData.username
 * @param {string} rawData.phone_number
 * @param {string} rawData.email
 * @returns {ProfileType}
 */
function createProfileType(rawData){
    return {
        username : rawData.username,
        phone_number : rawData.phone_number,
        email : rawData.email
    };
}