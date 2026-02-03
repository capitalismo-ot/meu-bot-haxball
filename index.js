// ==========================================
// API INTEGRADA (PARA NÃO DEPENDER DE LINKS)
// ==========================================
const https = require('https');

// Função que inicia a sala
function iniciarSala(HBInit) {
    console.log("Motor carregado! Iniciando sala...");
    
    const room = HBInit({
        roomName: "Capitalismo Haxball",
        maxPlayers: 16,
        public: true,
        token: process.env.TOKEN || "SEM_TOKEN"
    });

    room.onRoomLink = (link) => {
        console.log("-----------------------------------------");
        console.log("SALA ONLINE! LINK: " + link);
        console.log("-----------------------------------------");
    };

    room.onPlayerJoin = (player) => {
        room.sendAnnouncement("Salve " + player.name + "!", player.id);
    };
}

// BUSCA A API DE UM JEITO QUE FUNCIONA (LINK CORRIGIDO)
const url = 'https://raw.githubusercontent.com/haxball/haxball-headless-api/main/src/index.js';

https.get(url, (res) => {
    let data = '';
    res.on('data', (d) => data += d);
    res.on('end', () => {
        try {
            const m = { exports: {} };
            const fn = new Function('module', 'exports', data);
            fn(m, m.exports);
            iniciarSala(m.exports);
        } catch (e) {
            console.log("Erro ao processar API. Verifique se o TOKEN está no Environment do Render.");
        }
    });
}).on('error', (e) => console.error(e));
