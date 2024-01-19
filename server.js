const express = require('express');
const { default: mongoose } = require("mongoose");
const { db } = require('./config/database');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/users');
const messageRoutes = require('./routes/Message');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

app.use('/user', authRoutes)
app.use('/todo', todoRoutes)
app.use('/message', auth.verifyUserToken, messageRoutes);

app.post('/', (req, res) => {
  console.log(req.query);
  res.json({ message: 'hello world' })
})

mongoose.connect(db, {
}).then(res => {
  console.log('Mongo connected')
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})
  .catch(error => console.log(error))