const http = require('http');
const https = require('https');

// 1. SERVIDOR PARA O RENDER NÃO DESLIGAR O BOT
http.createServer((req, res) => {
    res.write('Bot Haxball Ativo e Online');
    res.end();
}).listen(10000);

console.log("--- INICIANDO PROCESSO ---");

// URL da API oficial
const API_URL = 'https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js';

// 2. BAIXAR E EXECUTAR O MOTOR DO HAXBALL
https.get(API_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            console.log("Motor baixado com sucesso. A validar Token...");
            
            const m = { exports: {} };
            const fn = new Function('module', 'exports', data);
            fn(m, m.exports);
            const HBInit = m.exports;

            // 3. CONFIGURAÇÃO DA SALA
            const room = HBInit({
                roomName: "Capitalismo Haxball 24h",
                maxPlayers: 16,
                public: true,
                token: process.env.TOKEN 
            });

            // ESTA PARTE GERA O LINK QUE TU PRECISAS
            room.onRoomLink = (link) => {
                console.log("=========================================");
                console.log("SUCESSO! COPIA O LINK ABAIXO:");
                console.log(link);
                console.log("=========================================");
            };

            // Caso o token falhe
            setTimeout(() => {
                if (!room.getRoomLink()) {
                    console.log("AVISO: O link ainda não apareceu. Verifica se o TOKEN no Render está correto e é novo.");
                }
            }, 8000);

        } catch (err) {
            console.log("ERRO AO EXECUTAR MOTOR: " + err.message);
        }
    });
}).on('error', (e) => {
    console.log("ERRO DE CONEXÃO: " + e.message);
});
