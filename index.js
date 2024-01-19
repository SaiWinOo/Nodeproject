require('dotenv').config();
const express = require('express');
const { default: mongoose } = require("mongoose");
const { db } = require('./config/database');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/users');
const messageRoutes = require('./routes/Message');
const auth = require('./middleware/auth');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',
}))
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  return res.json({ message: 'hello world' })
})

app.use('/user', authRoutes)
app.use('/todo', todoRoutes)
app.use('/message', auth.verifyUserToken, messageRoutes);



mongoose.connect(db, {
}).then(res => {
  console.log('Mongo connected')
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})
  .catch(error => console.log(error))