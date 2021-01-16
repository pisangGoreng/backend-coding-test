module.exports = {
  validation: (errors) => ({
    message: 'Validation errors',
    error: true,
    code: 422,
    errors,
  }),
};
