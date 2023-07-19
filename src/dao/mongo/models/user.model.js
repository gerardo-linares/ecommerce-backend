import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "cart",
  },

  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;
