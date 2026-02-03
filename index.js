const https = require('https');
const http = require('http');

// Cria um servidorzinho para o Render não matar o bot
http.createServer((req, res) => {
    res.write('Bot Vivo!');
    res.end();
}).listen(10000);

const url = 'https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js';

console.log("Baixando motor do Haxball...");

https.get(url, (res) => {
    let data = '';
    res.on('data', (d) => data += d);
    res.on('end', () => {
        try {
            const m = { exports: {} };
            const fn = new Function('module', 'exports', data);
            fn(m, m.exports);
            const HBInit = m.exports;

            console.log("Motor carregado! Iniciando sala...");

            const room = HBInit({
                roomName: "Capitalismo Haxball",
                maxPlayers: 16,
                public: true,
                token: process.env.TOKEN 
            });

            room.onRoomLink = (link) => {
                console.log("-----------------------------------------");
                console.log("SUCESSO! LINK: " + link);
                console.log("-----------------------------------------");
            };

            room.onPlayerJoin = (p) => console.log(p.name + " entrou!");

        } catch (e) {
            console.log("ERRO REAL DO HAXBALL: " + e.message);
        }
    });
}).on('error', (e) => console.log("Erro de rede: " + e.message));
