//jshint esversion: 6

// Requiring the node modules to be used and declaring port number for local usage
const express = require("express");
const port = 3000;

// Configuring the express app
const app = express();
// const router = express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


// Declaring variables to hold the values of the money raised, backers, editions left etc.
let moneyRaised = 89914;
let totalBackers = 5007;
let bambooStandsLeft = 101;
let blackEditionsLeft = 64;
let mahoganyEditionsLeft = 0;


app.get("/", function (req, res) {
    res.render("index", {
        moneyRaised: moneyRaised.toLocaleString(),
        totalBackers: totalBackers.toLocaleString(), 
        bambooStandsLeft: bambooStandsLeft,
        blackEditionsLeft: blackEditionsLeft,
        mahoganyEditionsLeft: mahoganyEditionsLeft,
        successMode: req.query.success
    });
});

app.post("/", function (req, res) {
    if (req.body.pledgeValue1 !== "") {
        const moneyDonated = Number(req.body.pledgeValue1);
        moneyRaised += moneyDonated;
        totalBackers += 1;
        bambooStandsLeft -=1;
        
        res.redirect("/?success="+encodeURIComponent("true"));

    } else if (req.body.pledgeValue2 !== "") {
        const moneyDonated = Number(req.body.pledgeValue2);
        moneyRaised += moneyDonated;
        totalBackers += 1;
        blackEditionsLeft -=1;
        
        res.redirect("/?success="+encodeURIComponent("true"));
    }
});


app.listen(process.env.PORT || port, function () {
    console.log("Server up and running on port "+port);
});