const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
// const hostname = "127.0.0.1";
// const port = 3000;

app.use(express.static("public"));
app.use(express.static("helper"));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app
  .route("/rank")
  .get((req, res) => {
    const data = require("./public/data/ranking.json");
    console.log(data);
    res.setHeader("Content-Type", "application/json");
    return res.send(data);
  })
  .post((req, res) => {
    console.log("post rank");
    const data = req.body;
    console.log(data);
    fs.writeFile(
      "./public/data/ranking.json",
      JSON.stringify(data),
      "utf8",
      (err) => err && console.log(err)
    );
    res.status(200);
    return res.send({ response: "랭킹이 등록되었습니다." });
  });
app.get("/credit", (req, res) => {
  const data = require("./public/data/credit.json");
  res.setHeader("Content-Type", "application/json");
  return res.send(data);
});

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// module.exports = app;
