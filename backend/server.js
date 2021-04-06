const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 8000;
const fs = require("fs");
app.use(express.json());
// app.use('/form', express.static('../frontend/public'));

//READ DATA JSON
let userDataRead = "";
fs.readFile("data/data.json", (err, data) => {
  if (err) throw err;
  userDataRead = JSON.parse(data);
});

// default options
app.use(fileUpload());

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  let userData;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send("Input fields are not filled properly");
    return;
  }
  console.log(req.body);
  // console.log('req.files >>>', req.files); // eslint-disable-line
  userData = req.body.userdata;
  sampleFile = req.files.userfile;

  //PUSH NEW DATA TO DATA ARRAY
  userDataRead.push(JSON.parse(userData));

  fs.writeFile("Data/data.json", JSON.stringify(userDataRead, null, 2), function (err) {
    if (err) return console.log(err);
    console.log("JSON UPDATED");
  });

  uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded to " + uploadPath);
  });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
