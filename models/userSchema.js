import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  firstname: String,
  password: String,
  confirmPassword: String,
  email: String,

  username: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["mail", "femail"],
  },
  profilePhoto:{
    type:String,
    default:""
  },
}, {timestamps:true});

export let User = mongoose.model("User", userSchema)