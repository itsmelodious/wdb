const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function fetchData(date, res) {
  let url =
    "https://api.nasa.gov/planetary/apod?api_key=6sbdh6DpP66fVrbKLZHTCdhYxSvYkkaO3gZvFVgj&hd=True&date=" +
    date;

  axios
    .get(url)
    .then((response) => {
      let resp = {
        Title: response.data.title,
        url: response.data.url,
        date: date,
        copyright: response.data.copyright,
      };

      let data = JSON.stringify(resp, null, 2);

      fs.appendFile("apod.txt", data.substring(1, data.length - 1), (err) => {
        if (err) res.send(err);
      });
    })
    .catch((error) => {
      res.send(error);
    });
}

app.get("/", (req, res) => {
  fetchData("2020-10-28", res);
  fetchData("2020-01-09", res);
  fetchData("2018-03-27", res);
  fetchData("2017-08-15", res);
  fetchData("2016-05-28", res);
  res.send({
    message: "File created!",
  });
});
