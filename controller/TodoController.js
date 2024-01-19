let Todos = require('../model/Todo');


const store = async (req, res) => {

  let newTodo = new Todos(req.body);
  newTodo = await newTodo.save();
  res.json({ todo: newTodo });
}



module.exports = {
  store,
}