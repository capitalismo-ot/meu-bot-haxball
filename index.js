const HaxballJS = require("haxball.js");
const http = require('http');

// Servidor para manter o Render vivo
http.createServer((req, res) => {
    res.write('SALA CAPITALISMO ATIVA');
    res.end();
}).listen(10000);

async function start() {
    const tokenNovo = process.env.TOKEN ? process.env.TOKEN.trim() : null;
    if (!tokenNovo) return console.log("ERRO: Configure o TOKEN no Render!");

    try {
        const motor = await HaxballJS;
        
        // TESTE DE TODAS AS POSSIBILIDADES (O "Pulo do Gato")
        let HBInit;
        if (typeof motor === 'function') {
            HBInit = motor;
        } else if (motor.HBInit && typeof motor.HBInit === 'function') {
            HBInit = motor.HBInit;
        } else if (motor.default && typeof motor.default === 'function') {
            HBInit = motor.default;
        } else if (motor.default && motor.default.HBInit) {
            HBInit = motor.default.HBInit;
        }

        if (!HBInit) {
            console.log("ERRO: Não foi possível encontrar a função HBInit no motor carregado.");
            return;
        }

        console.log("Motor identificado com sucesso! Abrindo a sala...");

        const room = HBInit({
            roomName: "Capitalismo",
            maxPlayers: 15,
            public: true,
            token: tokenNovo
        });

        room.onRoomLink = (link) => {
            console.log("=========================================");
            console.log("FINALMENTE! O LINK DA SALA É:");
            console.log(link);
            console.log("=========================================");
        };

        room.onPlayerJoin = (player) => {
            room.sendAnnouncement("Bem-vindo ao Capitalismo!", player.id);
        };

    } catch (err) {
        console.log("Erro ao iniciar: " + err.message);
    }
}

start();
