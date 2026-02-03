const HaxballJS = require("haxball.js");
const http = require('http');

http.createServer((req, res) => {
    res.write('SALA CAPITALISMO ATIVA');
    res.end();
}).listen(10000);

async function start() {
    const tokenNovo = process.env.TOKEN ? process.env.TOKEN.trim() : null;
    if (!tokenNovo) return console.log("ERRO: Configure o TOKEN no Render!");

    try {
        const motor = await HaxballJS;
        let HBInit = motor.HBInit || (typeof motor === 'function' ? motor : motor.default);

        if (!HBInit) {
            console.log("ERRO: Motor não encontrado.");
            return;
        }

        console.log("Motor carregado. Enviando solicitação ao Haxball...");

        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 15,
            public: true,
            token: tokenNovo,
            noPlayer: true // Ajuda a abrir mais rápido em servidores
        });

        // Se em 15 segundos não abrir, ele vai avisar
        const timeout = setTimeout(() => {
            console.log("AVISO: O Haxball está demorando para responder. Verifique se o TOKEN é novo!");
        }, 15000);

        room.onRoomLink = (link) => {
            clearTimeout(timeout);
            console.log("=========================================");
            console.log("SUCESSO! LINK DA SALA:");
            console.log(link);
            console.log("=========================================");
        };

        // Captura se a sala fechar ou der erro logo de cara
        room.onProxyAuthFailure = () => console.log("ERRO: Falha de autenticação (Token inválido)");

    } catch (err) {
        console.log("Erro crítico: " + err.message);
    }
}

start();
