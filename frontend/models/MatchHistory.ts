import mongoose, { Schema } from "mongoose";

const MatchHistorySchema = new Schema(
  {
    game: {
      type: Schema.Types.ObjectId,
      ref: "SaveGame",
      required: true,
    },

    player1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    player2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    winner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    loser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    result: {
      type: String,
      enum: ["player1", "player2", "draw"],
      required: true,
    },


    score: {
      type: Number,
      default: 0,
    },

    playedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MatchHistory ||
  mongoose.model("MatchHistory", MatchHistorySchema);