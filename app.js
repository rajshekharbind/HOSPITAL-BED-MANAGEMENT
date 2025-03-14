const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const rootDir = require('./utils/pathUtil');
const mongoose = require("mongoose");

// Import routers
const homeRouter = require('./routes/homeRouter');
const aboutRouter = require('./routes/aboutRouter');
 const hospitalRouter = require('./routes/hospitalRouter');
 const serviceRouter = require('./routes/serviceRouter');
const docterRouter = require('./routes/docterRouter');
const detailsRouter = require('./routes/detailsRouter');
const loginRouter = require('./routes/loginRouter');
const signinRouter = require('./routes/signinRouter');
const { signupRouter } = require('./routes/signupRouter');
const otpRouter = require('./routes/otpRouter');
const notificationRouter = require('./routes/notificationRouter');
// const resetRouter = require('./routes/resetRouter'); // Uncomment if needed
const hospitalPartRouter = require('./routes/hospitalpartRouter');
const appointmentRouter = require('./routes/appoimentRouter');
const productsRouter = require('./routes/productsRouter'); 
const contactusRouter= require('./routes/contactusRouter');
const languageRouter = require("./routes/languageRouter");



const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(upload.fields([
    { name: 'co-existing' },
    { name: 'drugs-consumed' },
    { name: 'drug-allergies' },
])); 

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
// Middleware to parse form data
//app.use(bodyParser.urlencoded({ extended: false })); // Parses `application/x-www-form-urlencoded`

app.use(bodyParser.json()); 
//app.use(bodyParser.json());
// Serve static files

app.use(express.static(path.join(rootDir, 'public')));

// Use routers
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
 app.use('/haspit', hospitalRouter);
 app.use('/service', serviceRouter);
app.use('/docter', docterRouter);
app.use('/details', detailsRouter);
app.use('/login', loginRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/otp', otpRouter);
app.use('/notification', notificationRouter);
// app.use('/reset', resetRouter); // Uncomment if needed
app.use('/hospitalpart', hospitalPartRouter);
app.use('/appoiment', appointmentRouter);
app.use('/products', productsRouter);
app.use('/contactus',contactusRouter);
app.use("/api/language", languageRouter);
// Fallback for 404
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Ensure the `views` directory exists and contains your templates
mongoose.connect("mongodb://localhost:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.error("MongoDB Connection Failed:", err);
});





// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



