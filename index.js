const HaxballJS = require("haxball-headless-api");
const http = require('http');

// Servidor para o Render não dormir
http.createServer((req, res) => {
    res.write('SALA CAPITALISMO ATIVA');
    res.end();
}).listen(10000);

console.log("--- INICIANDO SISTEMA PROFISSIONAL ---");

async function start() {
    // Pega o token das variáveis de ambiente do Render
    const tokenNovo = process.env.TOKEN ? process.env.TOKEN.trim() : null;

    if (!tokenNovo) {
        console.log("ERRO: Cade o TOKEN no Environment do Render?");
        return;
    }

    try {
        const HBInit = await HaxballJS;
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 15,
            public: true,
            token: tokenNovo
        });

        room.onRoomLink = (link) => {
            console.log("=========================================");
            console.log("SUCESSO! LINK DA SALA:");
            console.log(link);
            console.log("=========================================");
        };

        room.onPlayerJoin = (player) => {
            room.sendAnnouncement("Bem-vindo ao Capitalismo, " + player.name + "!");
        };

    } catch (err) {
        console.log("Erro ao abrir a sala: " + err.message);
    }
}

start();
