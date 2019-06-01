//jshint esversion: 6
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//enable local design to be cooperated because we are using bootstrap
//store all local design/image use in a folder call public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      "merge_fields": {
        "FNAME": firstName,
        "LNAME": lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/' + process.env.AUDIENCE_ID,
    method: "POST",
    headers: {
      "Authorization": "huyen " + process.env.API_KEY
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.send("Error occurs");
    } else {
      console.log(response.statusCode);
      if(response.statusCode===200) {
        res.send("Success!");
      } else {
        res.send("Error");
      }

    }
  });
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
