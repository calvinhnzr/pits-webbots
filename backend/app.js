const express = require("express");
const app = express();

const isBot = require('./middleware/isBot')


app.use(express.static(__dirname));

app.get("/", (req, res) => {
  console.log(req.botInfo);
  alert(req.botInfo);
  res.sendFile(__dirname + "/index.html");
  
});

app.get("/concert", (req, res) => {
  res.sendFile(__dirname + "/concert.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
