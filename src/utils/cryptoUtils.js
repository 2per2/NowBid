const crypto = require("crypto");

/**
 * Generates a SHA-256 hash of the given input.
 * @param {string} input - The input string to hash.
 * @returns {string} The SHA-256 hash of the input.
 */
exports.generateSHA256Hash = (input) => {
    return crypto.createHash('sha256')
        .update(input, 'utf8')  // Update hash with the input string
        .digest('hex')          // Get the hash as a hexadecimal string
        .slice(0, 10);          // Get 10 characters from string
}

/**
 * Generates an HMAC-SHA256 hash of the given input using the specified key.
 * @param {string} key - The secret key used for HMAC.
 * @param {string} input - The input string to hash.
 * @returns {string} The HMAC-SHA256 hash of the input.
 */
exports.generateHMACSHA256 = (key, input) => {
    return crypto.createHmac('sha256', key)
        .update(input, 'utf8')  // Update HMAC with the input string
        .digest('hex');        // Get the HMAC as a hexadecimal string
}
