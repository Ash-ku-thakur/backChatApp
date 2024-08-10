import mongoose from "mongoose";

let massageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    massage: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export let Massage = mongoose.model("Massage", massageSchema);
