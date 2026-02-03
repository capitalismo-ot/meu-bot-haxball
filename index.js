const https = require('https');

// Função para carregar a API sem precisar de npm install
function carregarAPI() {
    return new Promise((resolve, reject) => {
        https.get('https://raw.githubusercontent.com/haxball/haxball-headless-api/master/index.js', (res) => {
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
    // SEU CÓDIGO DO BOT COMEÇA AQUI
    const room = HBInit({
        roomName: "Capitalismo Haxball",
        maxPlayers: 16,
        public: true,
        token: "SEU_TOKEN_AQUI" // <--- COLOQUE SEU TOKEN AQUI
    });

    room.onRoomLink = (link) => console.log("Sala aberta em: " + link);
    
    room.onPlayerJoin = (player) => {
        room.sendAnnouncement("Bem-vindo ao Capitalismo, " + player.name + "!", player.id);
    };

    console.log("Bot iniciado com sucesso!");
}).catch(err => {
    console.error("Erro ao carregar a API do Haxball:", err);
});
