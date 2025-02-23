/**
 * @typedef {Object} SEARCH_USER
 * @property {string} email
 */

/**
 * @typedef {Object} IMAGE
 * @property {string} id
 * @property {string} url
 */

/**
 * @typedef {Object} SEARCH_RECIPES
 * @property {SEARCH_USER[]} user
 * @property {string} note
 * @property {string} description
 * @property {string} title
 * @property {string} ingredients
 * @property {IMAGE} image
 */

/**
 * @typedef {Object} SEARCH_RECIPES_RESPONSE
 * @property {string} user
 * @property {string} note
 * @property {string} description
 * @property {string} title
 * @property {string} ingredients
 * @property {IMAGE} image
 */
