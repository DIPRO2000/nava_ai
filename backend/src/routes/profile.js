import express from "express";
import axios from "axios";
import crypto from "crypto";

const router = express.Router(); 
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // 🔹 Replace with your actual API key

// Function to generate Gravatar URL
const getGravatarUrl = (email) => {
    const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

// API to get profile picture
router.get("/profile-pic", async (req, res) => {
    const { email } = req.query;

    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
        // 🔹 Fetch Google profile picture
        const response = await axios.get(
            `https://people.googleapis.com/v1/people/${email}?personFields=photos&key=${GOOGLE_API_KEY}`
        );

        const googleProfilePic = response.data.photos?.[0]?.url;
        if (googleProfilePic) {
            return res.json({ profilePic: googleProfilePic });
        }
    } catch (error) {
        console.log("Google profile fetch failed, using Gravatar:", error.message);
    }

    // 🔹 If Google fails, return Gravatar
    return res.json({ profilePic: getGravatarUrl(email) });
});

export default router;
