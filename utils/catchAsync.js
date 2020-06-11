/**
 * Handles async try catch block and global error
 * @param {*} function
 * @returns {*}  async function
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
