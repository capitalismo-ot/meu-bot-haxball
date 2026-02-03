const HaxballJS = require('haxball.js');
const http = require('http');
const dns = require('node:dns');

// 1. Forçar IPv4 para o Haxball não travar
dns.setDefaultResultOrder('ipv4first');

// 2. Servidor para o Render não derrubar o bot
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Capitalismo Online\n');
}).listen(port);

// 3. Função Principal
async function startBot() {
    try {
        console.log("Iniciando motor do Haxball...");
        
        // Aguarda a inicialização do motor
        const HBInit = await HaxballJS;
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 16,
            public: true,
            token: process.env.HAXBALL_TOKEN, // Puxando da variável que você criou
            noPlayer: true
        });

        room.onRoomLink = (link) => {
            console.log("--------------------------------------");
            console.log("SALA ONLINE: " + link);
            console.log("--------------------------------------");
        };

        room.onPlayerJoin = (player) => {
            room.sendAnnouncement(`Bem-vindo ao Capitalismo, ${player.name}!`, null, 0x00FF00);
        };

        console.log("Motor carregado. Enviando solicitação ao Haxball...");

    } catch (error) {
        console.error("Erro ao iniciar o bot:", error);
    }
}

// Executa o bot
startBot();
