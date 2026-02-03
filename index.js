const https = require('https');

// Função mística para carregar a API sem depender do NPM
function carregarAPI() {
    return new Promise((resolve, reject) => {
        // Link oficial direto da fonte (src/index.js)
        https.get('https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const m = { exports: {} };
                new Function('module', 'exports', data)(m, m.exports);
                resolve(m.exports);
            });
        }).on('error', reject);
    });
}

carregarAPI().then(HBInit => {
    console.log("API carregada! Tentando ligar a sala...");

    const room = HBInit({
        roomName: "Capitalismo Haxball 24h",
        maxPlayers: 16,
        public: true,
        token: "COLE_SEU_TOKEN_AQUI" // <--- PEGA O TOKEN NO SITE E COLA AQUI
    });

    room.onRoomLink = (link) => {
        console.log("-----------------------------------------");
        console.log("SALA ONLINE! LINK: " + link);
        console.log("-----------------------------------------");
    };

    room.onPlayerJoin = (player) => {
        room.sendAnnouncement("Salve " + player.name + "! Bem-vindo ao Capitalismo.", player.id);
    };

    console.log("Aguardando resposta do Haxball...");
}).catch(err => {
    console.error("Erro fatal ao carregar a API:", err);
});
