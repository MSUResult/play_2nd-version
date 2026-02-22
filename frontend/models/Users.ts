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
      default: null,
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
      default: null,
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
