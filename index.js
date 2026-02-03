const HaxballJS = require("haxball.js");
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Servidor Online!"));
app.listen(process.env.PORT || 3000);

HaxballJS.then(HBInit => {
  HBInit({
    roomName: "SALA 24H - TESTE",
    public: true,
    token: process.env.TOKEN 
  });
});
