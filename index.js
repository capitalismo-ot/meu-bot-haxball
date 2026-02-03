const HaxballJS = require('haxball.js');
const http = require('http');

// Servidor para o Render não derrubar o bot
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Capitalismo Online');
}).listen(port);

async function startBot() {
    try {
        console.log("Iniciando motor...");
        const Haxball = await HaxballJS;
        const HBInit = Haxball.default || Haxball; 
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 16,
            public: true,
            token: process.env.HAXBALL_TOKEN, // Certifique-se que a variável existe no Render!
            noPlayer: true
        });

        room.onRoomLink = (link) => {
            console.log("--------------------------------------");
            console.log("SALA ONLINE: " + link);
            console.log("--------------------------------------");
        };

        console.log("Solicitação enviada. Aguardando link...");

    } catch (error) {
        console.error("Erro no bot:", error);
    }
}

startBot();
