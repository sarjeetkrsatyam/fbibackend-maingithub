// // app.js
// const express = require("express");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");

// // Connect to MongoDB
// const mongoUrl = "mongodb://localhost:27017/Epmdata";
// mongoose.connect(mongoUrl)
//   .then(() => {
//     console.log("Database Connected successfully");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// // Import and use the User model
// require("./models/User");

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api", userRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Node.js server started on port ${PORT}`);
// });
// app.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require('body-parser');
const SalarySlip = require("./models/SalarySlip");
const cors = require('cors');

const app = express();
// const mongoUrl = "mongodb://localhost:27017/Epmdata";
const mongoUrl = "mongodb+srv://empdata:empdata@cluster0.jhvuqfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Enable CORS for all routes
app.use(cors());

//  bodyparser
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));


mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Node.js server started on port ${PORT}`);
});


