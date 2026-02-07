// Same as catchAsync but with the name you prefer
const errorAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default errorAsync;

