module.exports = {
  validation: (errors) => ({
    message: 'Validation errors',
    error: true,
    code: 422,
    errors,
  }),

  error: (message, statusCode) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    let selectedStatusCode = 200;

    const findCode = codes.find((code) => code === statusCode);

    if (!findCode) selectedStatusCode = 500;
    else selectedStatusCode = findCode;

    return {
      message: String(message),
      code: selectedStatusCode,
      error: true,
    };
  },

  success: (message, results, statusCode) => ({
    message,
    error: false,
    code: statusCode,
    results,
  }),
};
