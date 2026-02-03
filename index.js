const http = require('http');
const https = require('https');

// 1. SERVIDOR PARA O RENDER NÃO DORMIR
http.createServer((req, res) => {
    res.write('Bot Haxball Ativo');
    res.end();
}).listen(10000);

console.log("--- INICIANDO PROCESSO ---");

// USANDO LINK DA CDN (MAIS ESTÁVEL QUE O GITHUB BRUTO)
const API_URL = 'https://cdn.jsdelivr.net/gh/haxball/haxball-headless-api@master/src/index.js';

https.get(API_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            // Se o que baixou for um erro, nós paramos aqui antes de travar
            if (data.includes("404") || data.length < 500) {
                console.log("ERRO: O link da API falhou. Tentando alternativa...");
                return;
            }

            const m = { exports: {} };
            const fn = new Function('module', 'exports', data);
            fn(m, m.exports);
            const HBInit = m.exports;

            console.log("Motor carregado! Validando Token...");

            const room = HBInit({
                roomName: "Capitalismo Haxball 24h",
                maxPlayers: 16,
                public: true,
                token: process.env.TOKEN 
            });

            room.onRoomLink = (link) => {
                console.log("=========================================");
                console.log("SUCESSO! O LINK DA SALA É:");
                console.log(link);
                console.log("=========================================");
            };

        } catch (err) {
            console.log("ERRO DE SINTAXE: Verifique se o código da API está íntegro.");
        }
    });
}).on('error', (e) => console.log("Erro de conexão: " + e.message));
