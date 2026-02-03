const HaxballJS = require('haxball.js');
const http = require('http');
const dns = require('node:dns');

dns.setDefaultResultOrder('ipv4first');

const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Capitalismo Online\n');
}).listen(port);

async function startBot() {
    try {
        console.log("Iniciando motor do Haxball...");
        
        // CORREÇÃO AQUI: Pegando a função correta de dentro do objeto
        const Haxball = await HaxballJS;
        const HBInit = Haxball.default || Haxball; 
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 16,
            public: true,
            token: process.env.HAXBALL_TOKEN,
            noPlayer: true
        });

        room.onRoomLink = (link) => {
            console.log("--------------------------------------");
            console.log("SALA ONLINE: " + link);
            console.log("--------------------------------------");
        };

        console.log("Motor carregado. Enviando solicitação ao Haxball...");

    } catch (error) {
        console.error("Erro ao iniciar o bot:", error);
    }
}

startBot();
