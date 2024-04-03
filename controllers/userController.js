// controllers/userController.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const SalarySlip = require("../models/SalarySlip")
const JWT_SECRET = "xyzkjydfiowehurfikndvfkjhgdkrgndfjvhdlgihlkjkchvkdjff";

exports.registerUser = async (req, res) => {
    const { name, email, mobile, password, userType, empid, profession, company } = req.body;

    try {
        const oldUser = await User.findOne({ email: email });

        if (oldUser) {
            return res.send({ data: "User already exists!!" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            email: email,
            mobile,
            password: encryptedPassword,
            userType,
            empid,
            profession,
            company
        });

        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email: email });

        if (!oldUser) {
            return res.send({ data: "User doesn't exist!!" });
        }

        if (await bcrypt.compare(password, oldUser.password)) {
            const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

            return res.send({
                status: "ok",
                data: token,
                userType: oldUser.userType,
            });
        } else {
            return res.send({ error: "Invalid Password" });
        }
    } catch (error) {
        return res.send({ error: error });
    }
};

exports.getUserData = async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;

        User.findOne({ email: useremail }).then((data) => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error) {
        return res.send({ error: error });
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, mobile, image, gender, degree, blod } = req.body;

    try {
        await User.updateOne(
            { email: email },
            {
                $set: {

                    mobile,
                    image,
                    gender,

                    degree,
                    blod
                },
            }
        );

        res.send({ status: "Ok", data: "Updated" });
    } catch (error) {
        return res.send({ error: error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const data = await User.find({});
        res.send({ status: "Ok", data: data });
    } catch (error) {
        return res.send({ error: error });
    }
};

// exports.deleteUser = async (req, res) => {
//     const { id } = req.body;

//     try {
//         await User.deleteOne({ _id: id });
//         res.send({ status: "Ok", data: "User Deleted" });
//     } catch (error) {
//         return res.send({ error: error });
//     }
// };

exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Extract ID from URL parameter

    try {
        await User.deleteOne({ _id: id });
        res.send({ status: "Ok", data: "User Deleted" });
    } catch (error) {
        return res.send({ error: error });
    }
};


//   salary slip 
exports.addSalarySlip = async (req, res) => {
    const { userEmail, month, year, amount, method, bankname, holdername, account } = req.body;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const salarySlip = new SalarySlip({
            userEmail,
            month,
            year,
            amount,
            method,
            bankname,
            holdername,
            account

        });

        await salarySlip.save();
        res.status(201).send({ status: "Ok", data: salarySlip });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSalarySlipsByEmail = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Assuming the token is passed in the Authorization header

        // Verify and decode the token using the JWT secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        const userEmail = decoded.email; // Extract user email from the decoded token

        const salarySlips = await SalarySlip.find({ userEmail });
        res.status(200).send({ status: "Ok", data: salarySlips });
    } catch (error) {
        console.error('Error fetching salary slips:', error);
        res.status(500).send({ error: error.message }); // Send the error message for debugging
    }
};

//  get all salary slip
exports.getAllSalarySlip = async (req, res) => {
    try {
        const data = await SalarySlip.find({});
        res.send({ status: "Ok", data: data });
    } catch (error) {
        return res.send({ error: error });
    }
};


//  for delete salary slip

exports.deleteSalrySlip = async (req, res) => {
    const { id } = req.params; // Extract ID from URL parameter

    try {
        await SalarySlip.deleteOne({ _id: id });
        res.send({ status: "Ok", data: "User Deleted" });
    } catch (error) {
        return res.send({ error: error });
    }
};