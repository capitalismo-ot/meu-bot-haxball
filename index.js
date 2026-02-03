const HaxballJS = require("haxball.js");
const http = require('http');

http.createServer((req, res) => {
    res.write('Servidor Capitalismo Ativo');
    res.end();
}).listen(10000);

console.log("--- INICIANDO SISTEMA ---");

async function iniciarSala() {
    try {
        const tokenNovo = process.env.TOKEN ? process.env.TOKEN.trim() : null;

        if (!tokenNovo) {
            console.log("ERRO: Configure a variável TOKEN no Render!");
            return;
        }

        // Tenta detectar qual o formato que a biblioteca carregou
        const motor = await HaxballJS;
        const HBInit = motor.HBInit || motor; // Se motor.HBInit existir, usa. Se não, usa o motor direto.

        if (typeof HBInit !== "function") {
            console.log("ERRO: O motor não carregou como uma função!");
            return;
        }

        console.log("Motor carregado. Tentando abrir a sala...");

        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 15,
            public: true,
            token: tokenNovo
        });

        room.onRoomLink = (link) => {
            console.log("=========================================");
            console.log("BOOOOORA! O LINK É:");
            console.log(link);
            console.log("=========================================");
        };

        room.onPlayerJoin = (player) => {
            room.sendAnnouncement("Bem-vindo ao Capitalismo, " + player.name + "!");
        };

    } catch (error) {
        console.log("Erro no processo: " + error.message);
    }
}

iniciarSala();
