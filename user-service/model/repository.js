import UserModel from "./user-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI_PROD
    : process.env.DB_CLOUD_URI_DEV;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) {
  return new UserModel(params);
}

export async function isUserExist(username) {
  return UserModel.exists({ username: username });
}

export async function getUser(username) {
  return UserModel.findOne({ username: username });
}

export async function deleteUser(username) {
  return UserModel.deleteOne({ username: username });
}

export async function changePassword(username, password) {
  return UserModel.updateOne({ username: username }, { password: password });
}

export async function addToHistory(userId, question) {
  const user = await UserModel.findById(userId);
  user.history.push(question);
  await user.save();
  return user;
}
