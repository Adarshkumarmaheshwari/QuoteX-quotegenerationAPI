const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  fs.readFile(`${__dirname}/quotes/Quote.db`, (err, data) => {
    var dd = JSON.parse(data);
    var highestNumber = 1870;
    var lowestNumber = 0;
    var random = Math.floor(
      Math.random() * (highestNumber - lowestNumber) + lowestNumber
    );
    console.log(random);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, HEAD, DELETE, OPTIONS, POST"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.send(dd[random]);
  });
});

app.post("/", (req, res) => {
  console.log(req.body.post);
  res.json(req.body.post);
});

const port =process.env.PORT ||  5000;

app.listen(port, () => {
  console.log(
    `Server is running :  ${process.env.NODE_ENV} mode on port ${port}`
  );
});
