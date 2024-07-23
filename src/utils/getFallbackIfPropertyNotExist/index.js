/**
 * Retrieves the value of the specified key from the object.
 * If the key does not exist, returns the fallback value.
 * Supports nested keys using dot notation.
 * @param {Object} object
 * @param {string} key
 * @param {any} fallback
 * @returns {any}
 */
const getFallbackIfPropertyNotExist = (object, key, fallback) => {
	return key.split('.').reduce((accumulator, currentValue) => (accumulator && accumulator[currentValue]) || null, object) ?? fallback;
};

export default getFallbackIfPropertyNotExist;
