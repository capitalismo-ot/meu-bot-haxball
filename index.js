const HaxballJS = require('haxball.js');
const http = require('http');

// Servidor obrigatório para o Render
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
        
        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 16,
            public: true,
            token: process.env.HAXBALL_TOKEN,
            noPlayer: true
        });

        // Evento disparado quando o link é gerado
        room.onRoomLink = (link) => {
            console.log("--------------------------------------");
            console.log("SUCESSO! LINK: " + link);
            console.log("--------------------------------------");
        };

        // Forçar um log se a sala demorar mais de 30 segundos
        setTimeout(() => {
            console.log("Verificação: O Haxball ainda não enviou o link. Verifique o TOKEN!");
        }, 30000);

    } catch (error) {
        console.error("Erro no motor:", error);
    }
}

startBot();
