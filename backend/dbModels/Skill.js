import mongoose from "mongoose";

const skillSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            maxLength: 25,
            required: true,
        },
        description: {
            type: String,
            maxLength: 500,
            required: true
        },
        focus: {
            type: String,
            enum: ["Tech", "Art", "Wellness", "Sports"],
            required: true,
        }
    }
);

export const Skill = mongoose.model("Skill", skillSchema);