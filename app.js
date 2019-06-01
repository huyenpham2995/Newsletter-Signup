//jshint esversion: 6
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
    url: 'https://us20.api.mailchimp.com/3.0/lists/112198ec44',
    method: "POST",
    headers: {
      "Authorization": "huyen 6334ed308c2d5123ff5f2f1d6e9e0454-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});


//API key: 6334ed308c2d5123ff5f2f1d6e9e0454-us20, last 4 digit is data server
//Audience id; 112198ec44
