let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

const { Parser } = require("json2csv");
let json2csvParser = new Parser();

let DataStore = require("nedb");
//storing map libs data
let db = new DataStore("maplibs.db");
db.loadDatabase();

// db.remove({}, { multi: true }, function (err, numRemoved) {});

//storing emails
let dbEmails = new DataStore("emails.db");
dbEmails.loadDatabase();

app.use("/", express.static("public"));

//this adds a route to the server that listens for POST requests from the client
app.post("/maplibs", (req, res) => {
  // console.log(req.body);

  //insert maplibs into the database
  db.insert(req.body);
  res.json({ status: "success" });
});

//route that gets all the logged map libs
app.get("/getmaplibs", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      res.json({ task: "task failed" });
    } else {
      // console.log(docs);
      let obj = { data: docs };
      // res.json(obj);

      let csv = json2csvParser.parse(docs);
      console.log(csv);

      let csvObj = { data: csv };
      res.json(csvObj);
    }
  });
});

//adding a route to listen to POST for emails
app.post("/emails", (req, res) => {
  console.log(req.body);

  //inserting emails into email database
  dbEmails.insert(req.body);
  res.json({ status: "email success" });
});

//route that gets the emails from database
app.get("/getemails", (req, res) => {
  dbEmails.find({}, (err, docs) => {
    if (err) {
      res.json({ task: "task failed" });
    } else {
      console.log(docs);
      let emailobj = { data: docs };
      res.json(emailobj);
    }
  });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening at ", port);
});
