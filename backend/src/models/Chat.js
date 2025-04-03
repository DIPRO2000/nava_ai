import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sessionId: { type: String, required: true, unique: true }, // Unique session ID
    messages: [
        {
            role: { type: String, enum: ["user", "assistant"], required: true },
            text: { type: String, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now } // Store when session was created
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
