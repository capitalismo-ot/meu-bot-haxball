const https = require('https');

function carregarAPI() {
    return new Promise((resolve, reject) => {
        // Link ultra-específico para não dar 404
        https.get('https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (data.includes("404")) {
                    reject("Erro: Link da API retornou 404. Verifique o URL.");
                    return;
                }
                const m = { exports: {} };
                new Function('module', 'exports', data)(m, m.exports);
                resolve(m.exports);
            });
        }).on('error', reject);
    });
}

carregarAPI().then(HBInit => {
    console.log("API carregada com sucesso!");

    const room = HBInit({
        roomName: "Capitalismo Haxball",
        maxPlayers: 16,
        public: true,
        token: process.env.TOKEN 
    });

    room.onRoomLink = (link) => console.log("SALA ONLINE: " + link);
    console.log("Aguardando link...");
}).catch(err => {
    console.error("Erro fatal:", err);
});
