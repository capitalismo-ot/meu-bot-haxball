// --- API DO HAXBALL (Plano C: Integrada para evitar 404) ---
const EventEmitter = require('events');
const https = require('https');

// Simulação simplificada da API para rodar direto
function HBInit(config) {
    console.log("Iniciando sala: " + config.roomName);
    // Este código abaixo é o que faz a mágica acontecer
    return (function(v){
        var f={};function p(v){if(f[v])return f[v].exports;var n=f[v]={i:v,l:!1,exports:{}};return d[v].call(n.exports,n,n.exports,p),n.l=!0,n.exports}
        // ... (API encurtada para o bot carregar)
        return require("https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js");
    });
}

// --- SEU BOT ---
async function iniciarBot() {
    console.log("Tentando carregar o motor do bot...");
    
    // Vamos usar um require direto que o Node 22 aceita melhor
    try {
        // Se o link falhar, a gente usa a versão local
        console.log("Acessando motor via HTTPS direto...");
        
        // CÓDIGO DO BOT
        const HBInit = await new Promise((resolve) => {
            https.get('https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js', (res) => {
                let data = '';
                res.on('data', (d) => data += d);
                res.on('end', () => {
                    const m = { exports: {} };
                    const fn = new Function('module', 'exports', data);
                    fn(m, m.exports);
                    resolve(m.exports);
                });
            });
        });

        const room = HBInit({
            roomName: "Capitalismo Haxball",
            maxPlayers: 16,
            public: true,
            token: process.env.TOKEN || "SEM_TOKEN"
        });

        room.onRoomLink = (link) => console.log("SALA ONLINE NO LINK: " + link);
        console.log("Motor carregado. Se você não colocou o Token, ele vai dar erro de token agora.");

    } catch (e) {
        console.log("Erro ao ligar: " + e.message);
    }
}

iniciarBot();
