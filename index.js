const HaxballJS = require("haxball.js");
const http = require('http');

http.createServer((req, res) => {
    res.write('SALA CAPITALISMO ATIVA');
    res.end();
}).listen(10000);

async function start() {
    const tokenNovo = process.env.TOKEN ? process.env.TOKEN.trim() : null;
    if (!tokenNovo) return console.log("ERRO: Cade o TOKEN?");

    try {
        // Esse é o jeito certo de carregar o motor dessa biblioteca
        const HBInit = await HaxballJS;
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 15,
            public: true,
            token: tokenNovo
        });

        room.onRoomLink = (link) => {
            console.log("=========================================");
            console.log("LINK DA SALA GERADO:");
            console.log(link);
            console.log("=========================================");
        };
    } catch (err) {
        console.log("Erro: " + err.message);
    }
}

start();
