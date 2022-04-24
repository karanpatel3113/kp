var express = require('express');
var app = express();
var dotenv = require('dotenv');

require('dotenv').config();

app.use(function middleware(req, res, next) {
    // Do something
    var string = req.method + " " + req.path + " - " + req.ip;
    // Call the next function in line:
    console.log(string);
    next();
  });

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

app.get("/:word/echo", function(req, res) {
    res.json({'echo': req.params.word});
});

app.route('/name')
    .get((res,req)=>
        res.json({name:req.query.first +
             ' ' + req.query.last}));


app.get('/json', function(req, res) {
    const message = {'message': 'Hello json'} 
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        return res.json({'message': 'HELLO JSON'});
    }
    else {
        return res.json(message);
    }
});


app.get("/now",
    (req, res, next) => {
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      res.send({
        time: req.time
      });
    }
  );

 module.exports = app;