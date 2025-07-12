const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT || 4000
database.connect();
// add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connect
console.log(
  "Cloudinary configured. Cloud name:",
  cloudinary.config().cloud_name
);

//routes
app.use("/api/v1/auth" , userRoutes);


// defRoute
app.get("/", (req,res)=>{
 return res.json({
    success:true,
    message:"server is up and running",
 });
});

// activate the server
app.listen(PORT , ()=>{
    console.log(`App is Successfully runnning at ${PORT} port`);
})
