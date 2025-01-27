
const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const reqValidator = (validator) => {
  return async function (req, res, next) {
    try {
      if (["GET", "DELETE"].includes(req.method)) {
        req.query = await validator.validateAsync(req.query, options);
      } else if (["POST", "PUT", "PATCH"].includes(req.method)) {
        req.body = await validator.validateAsync(req.body, options);
      }
      next();
    } catch (error) {
      res.status(400).json({message : error.message});
    }
  };
};


