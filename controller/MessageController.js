const Message = require('../model/Message');



const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const { id: senderId } = req.user;

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;



  let messages = await Message.find({ sender: senderId, receiver: receiverId }).skip((page - 1) * limit).limit(limit).sort({ 'createdAt': -1 }).exec();
  return res.json({ messages });
}


const store = async (req, res) => {
  let { message, receiver } = req.body;
  if (!message || !receiver) return res.status(422).json({ message: 'fill in all the fields' });
  try {
    let newMessage = await Message.create({ message, receiver, sender: req.user.id });
    return res.json({ message: newMessage });
  } catch (e) {
    return res.status(400).json({ message: 'Message sent failed' });
  }
}

module.exports = {
  store, getMessages,
}