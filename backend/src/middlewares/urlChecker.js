const validator = require("validator");

const verifyURL = (req, res, next) => {
  try {
    const { url} = req.body;
    const errors = [];
    if (!url) {
      errors.push("URL is required.");
    } else if (typeof url !== "string") {
      errors.push("URL must be a string.");
    } else if (
      !validator.isURL(url, {
        protocols: ["http", "https"],
        require_protocol: true,
        // require_tld: false // Allow URLs without TLDs like 'localhost'
      })
    ) {
      errors.push("Invalid URL format.");
    }

    let {n} = req.body;

    if (n !== "" && n!==undefined) {
      const nStr = String(n);
      if (!validator.isInt(nStr, { min: 0, max: 1000 })) {
        errors.push("n must be an integer between 1 and 1000.");
      } else {
        n = parseInt(nStr, 10);
      }
    }
    

    if (errors.length > 0) {
      return res.status(400).json({ errors:  errors });
    }
    validator.trim(url);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.message });
  }
};

module.exports = {
  verifyURL,
};
