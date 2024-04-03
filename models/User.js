// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
    },
    degree: {
        type: String,
    },
    blod: {
        type: String,
    },
    profession: {
        type: String,
    },
    empid: {
        type: String,
    },
    company: {
        type: String,
    },
    date: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because month indexes are zero-based
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

    }
});

module.exports = mongoose.model("User", userSchema);
