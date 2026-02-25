
import mongoose, { Schema } from "mongoose";

const GameSchema = new Schema({
  player1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  player2: { type: Schema.Types.ObjectId, ref: "User", required: true },
player1Move: [{ 
  type: String, 
  enum: ['rock', 'paper', 'scissors'], 
  default: null 
}],

player2Moves: [{ type: String, enum: ['ROCK', 'PAPER', 'SCISSOR', 'NONE'], default: [] }],
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  isLive: { type: Boolean, default: false }, // Helps you distinguish live vs async
  createdAt: { type: Date, default: Date.now, expires: 86400 } // Auto-delete after 24h if no one plays

}) 

const SaveGame =
  mongoose.models.SaveGame ||
  mongoose.model("SaveGame", GameSchema);

export default SaveGame;