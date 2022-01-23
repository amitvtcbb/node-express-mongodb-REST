const express = require("express");

// “CORS” stands for Cross-Origin Resource Sharing. It allows you to make requests from one website to another website in the browser, which is normally prohibited by another browser policy called the Same-Origin Policy (SOP).

const cors = require("cors");
const { application } = require("express");

const app = express();

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the databse!");
    }).catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    })
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse request of content-type application/json
app.use(express.json());

//Parse request of content-type application / x-www-form-urlencoded.

app.use(express.urlencoded({ extended: true }));

// Include routes.
require("./app/routes/tutorial.routes")(app);

//Simple route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Amit Application:" })
});

//set Port, listern for request.

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`)
});

// Till then What we do are:
// – import express and cors modules:

// Express is for building the Rest apis

// cors provides Express middleware to enable CORS with various options.

// – create an Express app, then add body-parser (json and urlencoded) and cors middlewares using app.use() method. Notice that we set origin: http://localhost:8081.
// – define a GET route which is simple for test.
// – listen on port 8080 for incoming requests.

// Now let’s run the app with command: node server.js.
// // Open your browser with url http://localhost:8080/, you will see:


