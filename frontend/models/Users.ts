import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      
      unique:true,
       sparse: true
    },

    age: {
      type: Number,
      default: null,
    },

    state: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    currency: {
      type: Number,
      default: 0,
    },

    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
