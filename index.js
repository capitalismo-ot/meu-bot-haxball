const HaxballJS = require('haxball.js');
const http = require('http');
const dns = require('node:dns');

dns.setDefaultResultOrder('ipv4first');

// Servidor para o Render não dormir
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Capitalismo Online\n');
}).listen(port);

async function startBot() {
    try {
        console.log("1. Iniciando motor...");
        const Haxball = await HaxballJS;
        const HBInit = Haxball.default || Haxball; 
        
        console.log("2. Enviando solicitação com Token...");
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 16,
            public: true,
            token: process.env.HAXBALL_TOKEN,
            noPlayer: true,
            // Tenta forçar configurações de rede estáveis
            config: {
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            }
        });

        room.onRoomLink = (link) => {
            console.log("!!! SUCESSO !!!");
            console.log("LINK DA SALA: " + link);
        };

        // Log de erro interno do Haxball
        room.onProxyAuth = () => console.log("Erro: Falha na autenticação do Haxball.");

    } catch (error) {
        console.error("Erro fatal:", error);
    }
}

startBot();
