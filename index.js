var modernVersion = 4;

module.exports = isModern;

/**
 * Checks if node's major version
 * is equal or above threshold
 *
 * @param   {number} [threshold=4] - major version "modern" threshold
 * @returns {boolean} - `true` if current node version equals or above provided threshold, `false` otherwise
 */
function isModern(threshold)
{
  threshold = parseInt(threshold, 10) || modernVersion;
  return parseInt(process.versions.node, 10) >= threshold;
}
