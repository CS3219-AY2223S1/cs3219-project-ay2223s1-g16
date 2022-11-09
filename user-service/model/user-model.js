import mongoose from "mongoose";
var Schema = mongoose.Schema;

let QuestionModelSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

let UserModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: {
    type: [QuestionModelSchema],
  },
});

export default mongoose.model("UserModel", UserModelSchema);
