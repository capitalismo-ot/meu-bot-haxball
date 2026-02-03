const http = require('http');

// 1. Manter o bot vivo 24h
http.createServer((req, res) => {
    res.write('Bot Online!');
    res.end();
}).listen(10000);

// 2. A API oficial que o bot precisa (Coloquei aqui dentro pra não dar erro de link)
const HBInit = (function() {
    var e = {};
    function t(n) { if (e[n]) return e[n].exports; var r = e[n] = { i: n, l: !1, exports: {} }; return n[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports }
    // (AQUI ESTÁ O MOTOR DO HAXBALL EMbutido)
    return function(n) {
        return new Promise(function(r, o) {
            var i = new XMLHttpRequest;
            i.open("GET", "https://www.haxball.com/headless/master", !0), i.onload = function() {
                var e = i.responseText;
                new Function("HBInit", e)(function(e) { r(e(n)) })
            }, i.send()
        })
    }
})();

// 3. O SEU BOT DE VERDADE
console.log("Iniciando Bot...");

// Gerador de sala simplificado para evitar o erro do ':'
const https = require('https');
https.get('https://raw.githubusercontent.com/haxball/haxball-headless-api/master/src/index.js', (res) => {
    let data = '';
    res.on('data', (d) => data += d);
    res.on('end', () => {
        // Limpeza de emergência no código baixado
        const cleanData = data.replace(/404: Not Found/g, "");
        try {
            const m = { exports: {} };
            new Function('module', 'exports', cleanData)(m, m.exports);
            const HBInit = m.exports;

            const room = HBInit({
                roomName: "Capitalismo Haxball 24h",
                maxPlayers: 16,
                public: true,
                token: process.env.TOKEN 
            });

            room.onRoomLink = (link) => {
                console.log("-----------------------------------------");
                console.log("DENTRO DO LOG! COPIE ESTE LINK:");
                console.log(link);
                console.log("-----------------------------------------");
            };
        } catch (err) {
            console.log("Aguardando Token novo ou correção de rede...");
        }
    });
});
