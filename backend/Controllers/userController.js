exports.getMe = async (req, res) => {
  res.json(req.user);
};
