const User = require('../model/User');

const getUsers = async (req, res) => {

  let users = await User.find().exec();

  return res.json({ users })
}

module.exports = { getUsers };