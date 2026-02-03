const https = require('https');

function carregarAPI() {
    return new Promise((resolve, reject) => {
        // LINK CORRIGIDO ABAIXO:
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
    const room = HBInit({
        roomName: "Capitalismo Haxball",
        maxPlayers: 16,
        public: true,
        token: "COLE_SEU_TOKEN_AQUI" 
    });

    room.onRoomLink = (link) => console.log("SALA ABERTA! LINK: " + link);
    console.log("Aguardando link da sala...");
}).catch(err => {
    console.error("Erro ao carregar a API:", err);
});
