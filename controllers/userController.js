const User = require("../models/User");
const Post = require("../models/Post");

const index = async () => {
  try {
    const user = await User.find({});
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const show = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const create = async (user = new User()) => {
  if (!(user instanceof User)) return Error("User object required.");
  try {
    return await User.create(user);
  } catch (error) {
    throw Error(error);
  }
};

const update = async (user = new User()) => {
  if (!(user instanceof User)) return Error("User object required.");
  try {
    return await User.replaceOne({ _id: user._id }, user);
  } catch (error) {
    throw Error(error);
  }
};

const destroy = async (id) => {
  try {
    await Post.deleteMany({ author: id });
    return await User.deleteOne({ _id: id });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
