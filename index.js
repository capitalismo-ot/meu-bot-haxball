const HaxballJS = require('haxball.js');
const http = require('http');

// 1. SOLUÇÃO PARA O NODE 18/22: Forçar IPv4 para evitar travamento no handshake
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

// 2. SERVIDOR DE APOIO: Impede que o Render dê "Status 1" por falta de porta aberta
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Capitalismo Online\n');
}).listen(port, () => {
    console.log(`Servidor de monitoramento rodando na porta ${port}`);
});

// 3. INICIALIZAÇÃO DO BOT
HaxballJS.then((HBInit) => {
    const room = HBInit({
        roomName: "Capitalismo", // Nome da sua sala
        maxPlayers: 16,
        public: true,
        // SUBSTITUA ABAIXO PELO SEU TOKEN NOVO DO SITE HAXBALL
        token: "COLOQUE_SEU_TOKEN_AQUI_DE_NOVO", 
        noPlayer: true
    });

    room.onRoomLink = (link) => {
        console.log("///////////////////////////////////////////////////////////");
        console.log("SALA ONLINE NO LINK: " + link);
        console.log("///////////////////////////////////////////////////////////");
    };

    room.onPlayerJoin = (player) => {
        room.sendAnnouncement(`Bem-vindo ao Capitalismo, ${player.name}!`, player.id, 0x00FF00, "bold");
    };

    // Adicione aqui o restante da sua lógica de jogo (comandos, economia, etc)

    console.log("Motor carregado. Enviando solicitação ao Haxball...");
});

// Tratamento de erro básico para evitar que o processo morra silenciosamente
process.on('unhandledRejection', (reason, promise) => {
    console.error('Erro não tratado:', reason);
});
