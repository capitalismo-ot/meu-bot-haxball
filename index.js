const HaxballJS = require('haxball.js');
const http = require('http');

const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Capitalismo Ativo');
}).listen(port);

async function startBot() {
    try {
        console.log("Iniciando motor...");
        const Haxball = await HaxballJS;
        const HBInit = Haxball.default || Haxball; 
        
        // Pequeno delay de 3 segundos antes de pedir o link
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log("Enviando solicitação ao Haxball...");
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 16,
            public: true,
            token: process.env.HAXBALL_TOKEN,
            noPlayer: true
        });

        room.onRoomLink = (link) => {
            console.log("--------------------------------------");
            console.log("LINK DA SALA: " + link);
            console.log("--------------------------------------");
        };

    } catch (error) {
        console.error("Erro fatal:", error);
    }
}

startBot();
