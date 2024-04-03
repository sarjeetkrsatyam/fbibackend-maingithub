// models/SalarySlip.js
const mongoose = require("mongoose");

const salarySlipSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    bankname: {
        type: String,
        required: true,
    },
    holdername: {
        type: String,
        required: true,
    },
    account: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        required: false, // Field is now optional
    },

    //   date: {
    //     type: Date,
    //     default: () => new Date().toISOString().split('T')[0] // Default value is the current date
    //   }
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
    // Add more fields as needed
});

module.exports = mongoose.model("SalarySlip", salarySlipSchema);

