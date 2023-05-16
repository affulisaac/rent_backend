const filter = (req, res, next) => {
  const searchParams = req.query;
  const searchObject = {client_id: req?.user?.client_id};
  for (const key in searchParams) {
    if (searchParams.hasOwnProperty(key)) {
      searchObject[key] = searchParams[key];
    }
  }
  req.filterObj = searchObject;
  next();
};

module.exports = { filter };
