module.exports = {
  validation: (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  }
}