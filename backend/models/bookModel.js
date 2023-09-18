import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Corrected the placement of timestamps option
});

export const Book = mongoose.model("Book", bookSchema); // Changed "Cat" to "Book" for the model name
