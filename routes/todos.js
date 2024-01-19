const { store } = require("../controller/TodoController");

const router = require('express').Router();

router.get('/', store)


module.exports = router;