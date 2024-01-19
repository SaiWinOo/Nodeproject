const { getUsers } = require("../controller/UserController");

const router = require('express').Router();


router.get('/', getUsers);

module.exports = router;
