//app create
const express = require("express");

const app = express();

//port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middle ware
app.use(express.json());
app.use(cors());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//db se connect
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route
const user = require("./routes/routes");
app.use('/api/v1', user);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})