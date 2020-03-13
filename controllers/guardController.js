/**
 * Guards Routes Handler Functions or Controllers
 * handles routes to the various guards endpoints
 *
 * exports.funcName allows you to export a single function
 *
 * @param {object} req
 * @param {object} res
 *
 */

exports.getAllGuards = (req, res) => {
    res.status(200).json({
      status: success,
      length,
      data: {
        guard
      }
    });
  };

  exports.getGuard = (req, res) => {
    res.status(200).json({
      status: success,
      data: {
        guard
      }
    });
  };

  exports.createGuard = (req, res) => {
    res.status(201).json({
      status: success,
      data: {
        guard
      }
    });
  };

  exports.updateGuard = (req, res) => {
    res.status(200).json({
      status: success,
      data: {
        guard
      }
    });
  };

  exports.deleteGuard = (req, res) => {
    res.status(204).json({
      status: success,
      data: null
    });
  };
