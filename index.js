const HaxballJS = require("haxball.js");

// Servidor para o Render não desligar
const http = require('http');
http.createServer((req, res) => {
    res.write('Sala Capitalismo Online');
    res.end();
}).listen(10000);

console.log("--- INICIANDO SALA CAPITALISMO ---");

HaxballJS.then((HBInit) => {
  const room = HBInit({
    roomName: "Capitalismo",
    maxPlayers: 15,
    public: true,
    token: process.env.TOKEN.trim()
  });

  room.onRoomLink = (link) => {
    console.log("=========================================");
    console.log("LINK DA SALA GERADO COM SUCESSO:");
    console.log(link);
    console.log("=========================================");
  };

  room.onPlayerJoin = (player) => {
    room.sendAnnouncement("Bem-vindo ao Capitalismo, " + player.name + "! Aqui o mérito é quem manda.");
  };
});
