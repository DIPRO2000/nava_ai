import express from "express";
import Chat from "../models/Chat.js";
import dotenv from "dotenv";
import { authenticateUser } from "../middleware/auth.js";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuidv4 } from "uuid"; // Generate unique session IDs

const router = express.Router();
dotenv.config();

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware for authentication
router.use(authenticateUser);

/**
 * 📌 Route: Send a message and get AI response
 * ✅ Fixes: Ensures messages stay in the same session
 */
router.post("/send", async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("🔵 User message:", message);

        // Step 1️⃣: Find or create a session
        let session = sessionId;
        if (!sessionId) {
            const lastChat = await Chat.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
            session = lastChat ? lastChat.sessionId : uuidv4(); // Use last session or create new
        }

        // Step 2️⃣: Get AI response from Gemini
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: message }] }],
        });

        console.log("🟢 Gemini API Response:", response);

        const aiResponse =
            response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response received";

        // Step 3️⃣: Find existing chat session or create a new one
        let chat = await Chat.findOne({ sessionId: session });

        if (!chat) {
            chat = new Chat({ userId: req.user.id, sessionId: session, messages: [] });
        }

        // Step 4️⃣: Store user & AI messages
        chat.messages.push({ role: "user", text: message });
        chat.messages.push({ role: "assistant", text: aiResponse });

        await chat.save();

        // Step 5️⃣: Send response with sessionId
        res.json({ reply: aiResponse, sessionId: session });

    } catch (error) {
        console.error("🔴 Gemini API Error:", error);
        res.status(500).json({ error: "Failed to fetch response from Gemini API" });
    }
});

/**
 * 📌 Route: Fetch chat history for the user
 */
router.get("/history", async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.user.id })
            .sort({ createdAt: -1 }) // Show newest first
            .select("sessionId createdAt messages");

        res.json({ chats });

    } catch (error) {
        console.error("🔴 Fetching Chat History Error:", error);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});

export default router;
