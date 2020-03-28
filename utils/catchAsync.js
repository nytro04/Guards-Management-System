/**
 * Handles async try catch block and global error
 * @param {*} fn
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
